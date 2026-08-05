import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .max(1000)
  .refine(
    (value) =>
      !value ||
      value.startsWith("/") ||
      /^https?:\/\//i.test(value),
    "Geçerli bir URL girin.",
  );

export const productUpdateSchema = z.object({
  name: z.string().trim().min(2).max(160),
  url: optionalUrl.default(""),
  category_url: z.string().trim().min(2).max(300),
  stock_status: z.enum(["high", "medium", "low", "out"]).default("high"),
  main_image: optionalUrl.default(""),
  specs: z.record(z.string().trim().max(200), z.string().trim().max(500)).default({}),
  kit_components: z.array(z.string().trim().min(1).max(200)).max(100).default([]),
  gallery: z
    .array(
      z
        .string()
        .trim()
        .max(1000)
        .refine(
          (value) =>
            value.startsWith("/") || /^https?:\/\//i.test(value),
          "Geçerli bir görsel URL girin.",
        ),
    )
    .max(40)
    .default([]),
  downloads: z
    .array(
      z.object({
        text: z.string().trim().min(1).max(160),
        link: z.string().trim().min(1).max(1000),
      }),
    )
    .max(40)
    .default([]),
  performance_data: z.string().max(50_000).default(""),
});

export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;

export function validateProductUpdate(input: unknown) {
  return productUpdateSchema.safeParse(input);
}
