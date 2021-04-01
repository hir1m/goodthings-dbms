import { NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { User, UserData } from "../../../types/user";
import JWTApiRequest from "../../../types/jwtapirequest";

const secret = process.env.JWT_SECRET;

/**
 * gets userdata of the logged in user
 * requires a jwt token in header
 */
export default async (
  { headers: { authorization: jwt_token } }: JWTApiRequest,
  res: NextApiResponse
) => {
  try {
    if (jwt_token == null) {
      return res.status(401).json({ message: "no user logged in" });
    }

    const token = jwt_token && jwt_token.split(" ")[1];
    if (token.length < 1) {
      return res.status(401).json({ message: "no user logged in" });
    }

    const user = (await jwt.verify(token, secret)) as User;
    const userdata = {
      username: user.username,
      level: user.level,
    } as UserData;

    res.status(200).json({
      message: "success",
      data: {
        userdata: userdata,
      },
    });
  } catch (err) {
    // console.error(err);
    res.status(401).json({ message: "invalid token" });
  }
};
