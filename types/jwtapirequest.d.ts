import { NextApiRequest } from "next";

export default interface JWTApiRequest extends NextApiRequest {
  headers: {
    authorization: string;
  };
}
