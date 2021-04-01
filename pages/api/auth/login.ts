// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../../../lib/db";
import { User } from "../../../types/user";

const secret = process.env.JWT_SECRET;

interface NextApiRequestWithLogin extends NextApiRequest {
  body: {
    username: string;
    password: string;
  };
}

/**
 * log in the client with the username and pass
 * respons with a messeage, and jwt token on success
 */
export default async (
  { body: { username: username, password: password } }: NextApiRequestWithLogin,
  res: NextApiResponse
) => {
  try {
    const { rowCount: rowCount, rows: rows } = await pool.query(
      `SELECT * FROM public.authentication WHERE username LIKE '${username}';`
    );

    if (rowCount < 1) {
      // no user exist
      return res.status(400).json({ message: "user do not exist" });
    }

    // verify password
    const user = rows[0] as User;
    const pass_match = await bcrypt.compare(password, user.password);

    if (pass_match) {
      const token = jwt.sign(user, secret);

      res.status(200).json({
        message: "login succesful",
        data: {
          jwt_token: token,
        },
      });
    } else {
      res.status(400).json({ message: "incorrect password" });
    }
  } catch (err) {
    // console.error(err);
    res.status(500).json({ message: "database error" });
  }
};
