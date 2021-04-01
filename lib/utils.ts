import Cookies from "universal-cookie";

/**
 * Fetch with jwt header
 */
export const jwtFetch = async (url: string, options?: RequestInit) => {
  const cookies = new Cookies();
  const token = cookies.get("jwt_token");

  try {
    if (!token || token.length < 1) {
      return await fetch(url, options);
    } else {
      return await fetch(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        ...options,
      });
    }
  } catch (err) {
    throw err;
  }
};
