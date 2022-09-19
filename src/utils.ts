export function rgba(red: number, green: number, blue: number, alpha = 255) {
  return red + (green << 8) + (blue << 16) + (alpha << 24);
}
