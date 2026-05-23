/**
 * Base path from environment (GitHub Pages / production)
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Normalize path so it always works in:
 * - localhost (dev)
 * - GitHub Pages (production)
 */
const withBasePath = (path: string): string => {
  if (!basePath) return path;

  // prevent double prefix
  if (path.startsWith(basePath)) return path;

  return `${basePath}${path}`;
};

/**
 * Get image path
 */
export const getImgPath = (path: string): string => {
  return withBasePath(path);
};

/**
 * Get JSON / data path (for fetch)
 */
export const getDataPath = (path: string): string => {
  return withBasePath(path);
};