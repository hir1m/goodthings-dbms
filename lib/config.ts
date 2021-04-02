const dev = process.env.NODE_ENV !== "production";

export const relative_path = dev
  ? "http://localhost:3000"
  : "https://goodthings-dbms.herokuapp.com";
