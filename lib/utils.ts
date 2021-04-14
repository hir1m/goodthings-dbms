/**
 * Fetch with jwt header
 */
export const jwtFetch = async (
  url: string,
  token: string,
  addHeaders?: HeadersInit,
  options?: RequestInit
) => {
  try {
    if (!token || token.length < 1) {
      return await fetch(url, options);
    } else {
      return await fetch(url, {
        headers: {
          authorization: `Bearer ${token}`,
          ...addHeaders,
        },
        ...options,
      });
    }
  } catch (err) {
    throw err;
  }
};

/**
 * Check if string is integer
 */
export const isInteger = (s: string): boolean => {
  return /^\d+$/.test(s);
};

/**
 * Check if string is float
 */
export const isFloat = (s: string): boolean => {
  let s_ = parseFloat(s);
  if (isNaN(s_)) return false;
  return true;
};
