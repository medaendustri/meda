import { createClient } from "@libsql/client";

// Turso Bağlantısı
const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error("TURSO_DATABASE_URL environment variable is not defined");
}

export const db = createClient({
  url,
  authToken,
});

// Product interface matching our CSV/DB structure
export interface Product {
  id: number;
  name: string;
  url: string;
  category_url: string;
  price_net: number; // Turso'dan bazen string gelebilir, dikkat
  price_gross: number;
  currency: string;
  stock_status: string;
  main_image: string;
  specs_json: string;
  kit_components_json: string;
  gallery_json: string;
  downloads_json: string;
  performance_data: string;
  created_at: string;
}

// Parsed product with JSON fields converted
export interface ParsedProduct {
  id: number;
  name: string;
  slug: string;
  url: string;
  category_url: string;
  category_name: string;
  price_net: number;
  price_gross: number;
  currency: string;
  stock_status: string;
  main_image: string;
  specs: Record<string, string>;
  kit_components: string[];
  gallery: string[];
  downloads: Array<{ text: string; link: string }>;
  performance_data: string;
  created_at: string;
}

// Category extracted from products
export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

// Aksesuar kategorileri
const ACCESSORY_CATEGORIES = [
  "bags",
  "hooks-shackles-snatch-block",
  "mounting-plates",
  "power-switch",
  "quick-connector",
  "ropes-cables",
  "traps",
  "winch-cover",
  "farm-jack",
];

// --- HELPER FUNCTIONS (Değişmedi) ---

function isAccessoryCategory(slug: string): boolean {
  const normalizedSlug = slug.toLowerCase();
  return ACCESSORY_CATEGORIES.some(
    (acc) =>
      normalizedSlug.includes(acc) ||
      normalizedSlug.includes(acc.replace("-", " "))
  );
}

function parseCategoryUrl(categoryUrl: string): { name: string; slug: string } {
  const parts = categoryUrl.split(",");
  const slug = parts[0] || "dragon-winch";
  const name = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return { name, slug };
}

function getDisplayCategoryName(categoryUrl: string): string {
  const { slug, name } = parseCategoryUrl(categoryUrl);
  if (isAccessoryCategory(slug)) return "Aksesuarlar";
  return name;
}

function generateProductSlug(name: string): string {
  const turkishMap: Record<string, string> = {
    ç: "c",
    Ç: "C",
    ğ: "g",
    Ğ: "G",
    ı: "i",
    İ: "I",
    ö: "o",
    Ö: "O",
    ş: "s",
    Ş: "S",
    ü: "u",
    Ü: "U",
  };
  return name
    .toLowerCase()
    .split("")
    .map((char) => turkishMap[char] || char)
    .join("")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function parseProduct(product: Product): ParsedProduct {
  const categoryName = getDisplayCategoryName(product.category_url);
  const slug = generateProductSlug(product.name);

  let specs: Record<string, string> = {};
  let kitComponents: string[] = [];
  let gallery: string[] = [];
  let downloads: Array<{ text: string; link: string }> = [];

  try {
    specs = product.specs_json ? JSON.parse(product.specs_json) : {};
  } catch (e) {}
  try {
    kitComponents = product.kit_components_json
      ? JSON.parse(product.kit_components_json)
      : [];
  } catch (e) {}
  try {
    gallery = product.gallery_json ? JSON.parse(product.gallery_json) : [];
  } catch (e) {}
  try {
    downloads = product.downloads_json
      ? JSON.parse(product.downloads_json)
      : [];
  } catch (e) {}

  return {
    id: product.id,
    name: product.name,
    slug,
    url: product.url,
    category_url: product.category_url,
    category_name: categoryName,
    price_net: Number(product.price_net), // Turso bazen string döndürebilir, garanti olsun
    price_gross: Number(product.price_gross),
    currency: product.currency,
    stock_status: product.stock_status,
    main_image: product.main_image,
    specs,
    kit_components: kitComponents,
    gallery,
    downloads,
    performance_data: product.performance_data || "",
    created_at: product.created_at,
  };
}

// --- DB FUNCTIONS (Hepsi ASYNC oldu) ---

export async function getAllProducts(options?: {
  page?: number;
  perPage?: number;
  category?: string;
  search?: string;
}): Promise<{ products: ParsedProduct[]; total: number; totalPages: number }> {
  const page = options?.page || 1;
  const perPage = options?.perPage || 12;
  const offset = (page - 1) * perPage;

  let whereClause = "";
  const params: any[] = [];

  if (options?.category) {
    whereClause += " WHERE category_url LIKE ?";
    params.push(`%${options.category}%`);
  }

  if (options?.search) {
    whereClause += whereClause ? " AND" : " WHERE";
    whereClause += " (name LIKE ? OR specs_json LIKE ?)";
    params.push(`%${options.search}%`, `%${options.search}%`);
  }

  // Get total count
  const countResult = await db.execute({
    sql: `SELECT COUNT(*) as count FROM products${whereClause}`,
    args: params,
  });

  const total = Number(countResult.rows[0].count);
  const totalPages = Math.ceil(total / perPage);

  // Get products
  const productsResult = await db.execute({
    sql: `SELECT * FROM products${whereClause} ORDER BY id ASC LIMIT ? OFFSET ?`,
    args: [...params, perPage, offset],
  });

  const products = productsResult.rows as unknown as Product[];

  return {
    products: products.map(parseProduct),
    total,
    totalPages,
  };
}

export async function getProductById(
  id: number
): Promise<ParsedProduct | null> {
  const result = await db.execute({
    sql: "SELECT * FROM products WHERE id = ?",
    args: [id],
  });

  const product = result.rows[0] as unknown as Product | undefined;
  if (!product) return null;

  return parseProduct(product);
}

export async function getProductBySlug(
  slug: string
): Promise<ParsedProduct | null> {
  // Slug veritabanında olmadığı ve JS ile oluşturulduğu için tüm ürünleri çekip bulmak zorundayız.
  // Bu performanslı değil ama URL yapını bozmamak için böyle bırakıyorum.
  const result = await db.execute("SELECT * FROM products");
  const products = result.rows as unknown as Product[];

  for (const product of products) {
    const parsed = parseProduct(product);
    if (parsed.slug === slug) {
      return parsed;
    }
  }
  return null;
}

export async function getAllCategories(): Promise<Category[]> {
  const result = await db.execute(
    "SELECT category_url, COUNT(*) as count FROM products GROUP BY category_url"
  );

  const rows = result.rows as unknown as Array<{
    category_url: string;
    count: number;
  }>;

  let accessoryCount = 0;
  const nonAccessoryCategories: Category[] = [];
  let index = 0;

  for (const row of rows) {
    const { slug } = parseCategoryUrl(row.category_url);
    if (isAccessoryCategory(slug)) {
      accessoryCount += Number(row.count);
    } else {
      nonAccessoryCategories.push({
        id: String(++index),
        name: parseCategoryUrl(row.category_url).name,
        slug,
        count: Number(row.count),
      });
    }
  }

  if (accessoryCount > 0) {
    nonAccessoryCategories.push({
      id: String(++index),
      name: "Aksesuarlar",
      slug: "aksesuarlar",
      count: accessoryCount,
    });
  }

  return nonAccessoryCategories;
}

export async function getProductsByCategory(
  categorySlug: string,
  options?: { page?: number; perPage?: number }
): Promise<{ products: ParsedProduct[]; total: number; totalPages: number }> {
  const page = options?.page || 1;
  const perPage = options?.perPage || 12;
  const offset = (page - 1) * perPage;

  if (categorySlug === "aksesuarlar") {
    const placeholders = ACCESSORY_CATEGORIES.map(
      () => "category_url LIKE ?"
    ).join(" OR ");
    const params = ACCESSORY_CATEGORIES.map((cat) => `%${cat}%`);

    const countResult = await db.execute({
      sql: `SELECT COUNT(*) as count FROM products WHERE ${placeholders}`,
      args: params,
    });

    const total = Number(countResult.rows[0].count);
    const totalPages = Math.ceil(total / perPage);

    const productsResult = await db.execute({
      sql: `SELECT * FROM products WHERE ${placeholders} ORDER BY id ASC LIMIT ? OFFSET ?`,
      args: [...params, perPage, offset],
    });

    const products = productsResult.rows as unknown as Product[];

    return {
      products: products.map(parseProduct),
      total,
      totalPages,
    };
  }

  const countResult = await db.execute({
    sql: "SELECT COUNT(*) as count FROM products WHERE category_url LIKE ?",
    args: [`%${categorySlug}%`],
  });

  const total = Number(countResult.rows[0].count);
  const totalPages = Math.ceil(total / perPage);

  const productsResult = await db.execute({
    sql: "SELECT * FROM products WHERE category_url LIKE ? ORDER BY id ASC LIMIT ? OFFSET ?",
    args: [`%${categorySlug}%`, perPage, offset],
  });

  const products = productsResult.rows as unknown as Product[];

  return {
    products: products.map(parseProduct),
    total,
    totalPages,
  };
}

export async function searchProducts(
  query: string,
  options?: { page?: number; perPage?: number }
): Promise<{ products: ParsedProduct[]; total: number; totalPages: number }> {
  const page = options?.page || 1;
  const perPage = options?.perPage || 12;
  const offset = (page - 1) * perPage;
  const searchTerm = `%${query}%`;

  const countResult = await db.execute({
    sql: `SELECT COUNT(*) as count FROM products WHERE name LIKE ? OR specs_json LIKE ? OR performance_data LIKE ?`,
    args: [searchTerm, searchTerm, searchTerm],
  });

  const total = Number(countResult.rows[0].count);
  const totalPages = Math.ceil(total / perPage);

  const productsResult = await db.execute({
    sql: `SELECT * FROM products WHERE name LIKE ? OR specs_json LIKE ? OR performance_data LIKE ? ORDER BY id ASC LIMIT ? OFFSET ?`,
    args: [searchTerm, searchTerm, searchTerm, perPage, offset],
  });

  const products = productsResult.rows as unknown as Product[];

  return {
    products: products.map(parseProduct),
    total,
    totalPages,
  };
}

export async function getFeaturedProducts(): Promise<ParsedProduct[]> {
  const categories = await getAllCategories();
  const featuredProducts: ParsedProduct[] = [];

  // İlk 5 kategoriden birer ürün çek
  for (const category of categories.slice(0, 5)) {
    const result = await db.execute({
      sql: "SELECT * FROM products WHERE category_url LIKE ? LIMIT 1",
      args: [`${category.slug}%`],
    });

    const product = result.rows[0] as unknown as Product | undefined;
    if (product) {
      featuredProducts.push(parseProduct(product));
    }
  }

  return featuredProducts;
}
