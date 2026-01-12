import Database from "better-sqlite3";
import path from "path";

// Database path
const dbPath = path.join(process.cwd(), "dragonwinch_full.db");

// Singleton database connection
let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(dbPath, { readonly: true, fileMustExist: true });
  }
  return db;
}

// Product interface matching our CSV/DB structure
export interface Product {
  id: number;
  name: string;
  url: string;
  category_url: string;
  price_net: number;
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

// Aksesuar kategorileri - bunlar "Aksesuarlar" altında toplanacak
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

// Kategori slug'ının aksesuar olup olmadığını kontrol et
function isAccessoryCategory(slug: string): boolean {
  const normalizedSlug = slug.toLowerCase();
  return ACCESSORY_CATEGORIES.some(
    (acc) =>
      normalizedSlug.includes(acc) ||
      normalizedSlug.includes(acc.replace("-", " "))
  );
}

// Parse category URL to extract name and slug
function parseCategoryUrl(categoryUrl: string): { name: string; slug: string } {
  // Format: "dragon-winch-maverick,51,0.html"
  const parts = categoryUrl.split(",");
  const slug = parts[0] || "dragon-winch";

  // Convert slug to readable name
  const name = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return { name, slug };
}

// Get display category name - Aksesuarları grupla
function getDisplayCategoryName(categoryUrl: string): string {
  const { slug, name } = parseCategoryUrl(categoryUrl);

  if (isAccessoryCategory(slug)) {
    return "Aksesuarlar";
  }

  return name;
}

// Get display category slug - Aksesuarları grupla
function getDisplayCategorySlug(categoryUrl: string): string {
  const { slug } = parseCategoryUrl(categoryUrl);

  if (isAccessoryCategory(slug)) {
    return "aksesuarlar";
  }

  return slug;
}

// Generate product slug from name
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

// Parse a raw product into parsed format
export function parseProduct(product: Product): ParsedProduct {
  const categoryName = getDisplayCategoryName(product.category_url);
  const slug = generateProductSlug(product.name);

  let specs: Record<string, string> = {};
  let kitComponents: string[] = [];
  let gallery: string[] = [];
  let downloads: Array<{ text: string; link: string }> = [];

  try {
    specs = product.specs_json ? JSON.parse(product.specs_json) : {};
  } catch (e) {
    console.error("Error parsing specs_json:", e);
  }

  try {
    kitComponents = product.kit_components_json
      ? JSON.parse(product.kit_components_json)
      : [];
  } catch (e) {
    console.error("Error parsing kit_components_json:", e);
  }

  try {
    gallery = product.gallery_json ? JSON.parse(product.gallery_json) : [];
  } catch (e) {
    console.error("Error parsing gallery_json:", e);
  }

  try {
    downloads = product.downloads_json
      ? JSON.parse(product.downloads_json)
      : [];
  } catch (e) {
    console.error("Error parsing downloads_json:", e);
  }

  return {
    id: product.id,
    name: product.name,
    slug,
    url: product.url,
    category_url: product.category_url,
    category_name: categoryName,
    price_net: product.price_net,
    price_gross: product.price_gross,
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

// Get all products
export function getAllProducts(options?: {
  page?: number;
  perPage?: number;
  category?: string;
  search?: string;
}): { products: ParsedProduct[]; total: number; totalPages: number } {
  const db = getDb();
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
  const countStmt = db.prepare(
    `SELECT COUNT(*) as count FROM products${whereClause}`
  );
  const countResult = countStmt.get(...params) as { count: number };
  const total = countResult.count;
  const totalPages = Math.ceil(total / perPage);

  // Get products with pagination
  const stmt = db.prepare(
    `SELECT * FROM products${whereClause} ORDER BY id ASC LIMIT ? OFFSET ?`
  );
  const products = stmt.all(...params, perPage, offset) as Product[];

  return {
    products: products.map(parseProduct),
    total,
    totalPages,
  };
}

// Get a single product by ID
export function getProductById(id: number): ParsedProduct | null {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM products WHERE id = ?");
  const product = stmt.get(id) as Product | undefined;

  if (!product) return null;

  return parseProduct(product);
}

// Get a single product by slug
export function getProductBySlug(slug: string): ParsedProduct | null {
  const db = getDb();
  // First get all products and find by generated slug
  const stmt = db.prepare("SELECT * FROM products");
  const products = stmt.all() as Product[];

  for (const product of products) {
    const parsed = parseProduct(product);
    if (parsed.slug === slug) {
      return parsed;
    }
  }

  return null;
}

// Get all unique categories from products
export function getAllCategories(): Category[] {
  const db = getDb();
  const stmt = db.prepare(
    "SELECT category_url, COUNT(*) as count FROM products GROUP BY category_url"
  );
  const results = stmt.all() as Array<{ category_url: string; count: number }>;

  // Group accessory categories
  let accessoryCount = 0;
  const nonAccessoryCategories: Category[] = [];
  let index = 0;

  for (const row of results) {
    const { slug } = parseCategoryUrl(row.category_url);

    if (isAccessoryCategory(slug)) {
      accessoryCount += row.count;
    } else {
      nonAccessoryCategories.push({
        id: String(++index),
        name: parseCategoryUrl(row.category_url).name,
        slug,
        count: row.count,
      });
    }
  }

  // Add combined accessory category if there are any
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

// Get products by category slug
export function getProductsByCategory(
  categorySlug: string,
  options?: {
    page?: number;
    perPage?: number;
  }
): { products: ParsedProduct[]; total: number; totalPages: number } {
  const db = getDb();
  const page = options?.page || 1;
  const perPage = options?.perPage || 12;
  const offset = (page - 1) * perPage;

  // Handle combined accessories category
  if (categorySlug === "aksesuarlar") {
    // Build OR query for all accessory categories
    const placeholders = ACCESSORY_CATEGORIES.map(
      () => "category_url LIKE ?"
    ).join(" OR ");
    const params = ACCESSORY_CATEGORIES.map((cat) => `%${cat}%`);

    // Get total count
    const countStmt = db.prepare(
      `SELECT COUNT(*) as count FROM products WHERE ${placeholders}`
    );
    const countResult = countStmt.get(...params) as { count: number };
    const total = countResult.count;
    const totalPages = Math.ceil(total / perPage);

    // Get products
    const stmt = db.prepare(
      `SELECT * FROM products WHERE ${placeholders} ORDER BY id ASC LIMIT ? OFFSET ?`
    );
    const products = stmt.all(...params, perPage, offset) as Product[];

    return {
      products: products.map(parseProduct),
      total,
      totalPages,
    };
  }

  // Normal category query
  // Get total count
  const countStmt = db.prepare(
    "SELECT COUNT(*) as count FROM products WHERE category_url LIKE ?"
  );
  const countResult = countStmt.get(`%${categorySlug}%`) as { count: number };
  const total = countResult.count;
  const totalPages = Math.ceil(total / perPage);

  // Get products
  const stmt = db.prepare(
    "SELECT * FROM products WHERE category_url LIKE ? ORDER BY id ASC LIMIT ? OFFSET ?"
  );
  const products = stmt.all(`%${categorySlug}%`, perPage, offset) as Product[];

  return {
    products: products.map(parseProduct),
    total,
    totalPages,
  };
}

// Search products
export function searchProducts(
  query: string,
  options?: {
    page?: number;
    perPage?: number;
  }
): { products: ParsedProduct[]; total: number; totalPages: number } {
  const db = getDb();
  const page = options?.page || 1;
  const perPage = options?.perPage || 12;
  const offset = (page - 1) * perPage;
  const searchTerm = `%${query}%`;

  // Get total count
  const countStmt = db.prepare(`
    SELECT COUNT(*) as count FROM products 
    WHERE name LIKE ? OR specs_json LIKE ? OR performance_data LIKE ?
  `);
  const countResult = countStmt.get(searchTerm, searchTerm, searchTerm) as {
    count: number;
  };
  const total = countResult.count;
  const totalPages = Math.ceil(total / perPage);

  // Get products
  const stmt = db.prepare(`
    SELECT * FROM products 
    WHERE name LIKE ? OR specs_json LIKE ? OR performance_data LIKE ?
    ORDER BY id ASC LIMIT ? OFFSET ?
  `);
  const products = stmt.all(
    searchTerm,
    searchTerm,
    searchTerm,
    perPage,
    offset
  ) as Product[];

  return {
    products: products.map(parseProduct),
    total,
    totalPages,
  };
}

// Get featured products (one from each category)
export function getFeaturedProducts(): ParsedProduct[] {
  const db = getDb();
  const categories = getAllCategories();
  const featuredProducts: ParsedProduct[] = [];

  for (const category of categories.slice(0, 5)) {
    const stmt = db.prepare(
      "SELECT * FROM products WHERE category_url LIKE ? LIMIT 1"
    );
    const product = stmt.get(`${category.slug}%`) as Product | undefined;
    if (product) {
      featuredProducts.push(parseProduct(product));
    }
  }

  return featuredProducts;
}
