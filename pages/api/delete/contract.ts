import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../lib/db";
import { getUserData } from "../get/userdata";

/**
 * Delete query sample 1
 */
export default async (
  { headers: { authorization: jwt_token }, body: { id: cid } }: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (!jwt_token || jwt_token.length < 1) {
      return res.status(401).json({
        message: "invalid authorization",
      });
    }

    const userdata = await getUserData(jwt_token);
    if (!userdata) {
      return res.status(401).json({
        message: "invalid authorization",
      });
    }

    const { rowCount: rowCount } = await pool.query(
      `SELECT * FROM "CONTRACT" WHERE cid LIKE '${cid}';`
    );

    if (rowCount === 0) {
      return res.status(500).json({
        message: `contract with id:${cid} does not exist`,
      });
    }

    await pool.query(`DELETE FROM "CONTRACT" WHERE cid LIKE '${cid}';`);

    res.status(200).json({
      message: `contract with id:${cid} has been deleted`,
    });
  } catch (err) {
    if (err.message) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(500).json({
        message: "server error",
      });
    }
  }
};
