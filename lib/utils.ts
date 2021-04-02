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
