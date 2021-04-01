import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import pool from "../../../lib/db";
import { User } from "../../../types/user";

const hashRounds = parseInt(process.env.HASH_ROUNDS);

interface NextApiRequestWithUser extends NextApiRequest {
  body: User;
}

/**
 * create a new user with the supplied username, password, and level
 */
export default async (
  {
    body: { username: username, password: password, level: level },
  }: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  // res.json(user);
  const password_hash = await bcrypt.hash(password, hashRounds);

  // insert new user into auth db
  try {
    await pool.query(
      "INSERT INTO public.user(username, password, level) VALUES($1, $2, $3) RETURNING *;",
      [username, password_hash, level]
    );

    // console.log(db_rows);
    res.status(201).json({ message: "user created" });
  } catch (err) {
    // console.error(err);
    res.status(400).json({ message: "unable to create user" });
  }
};
