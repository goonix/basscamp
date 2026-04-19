/** Generates a RFC 4122-compliant UUID v4 using the Web Crypto API. */
export function generateId(): string {
  return crypto.randomUUID();
}
