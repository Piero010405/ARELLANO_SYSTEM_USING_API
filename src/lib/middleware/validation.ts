// src/lib/middleware/validation.ts

export function validateFields<T extends object>(
  body: T,
  requiredFields: (keyof T)[]
): string[] {
  const missing: string[] = [];
  for (const field of requiredFields) {
    if (!body[field]) {
      missing.push(field as string);
    }
  }
  return missing;
}
