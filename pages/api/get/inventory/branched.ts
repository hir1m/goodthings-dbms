import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../../lib/db";
import { getUserData } from "../userdata";

/**
 * Join query sample 2
 */
export default async (
  { headers: { authorization: jwt_token } }: NextApiRequest,
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

    const { rowCount: rowCount, rows: rows } = await pool.query(
      `SELECT "BRANCH".bid, "BRANCH".address, "AVALIABLE_ITEM".aid, "AVALIABLE_ITEM".price FROM "AVALIABLE_ITEM" INNER JOIN "BRANCH" ON "AVALIABLE_ITEM".bid = "BRANCH".bid;`
    );

    res.status(200).json({
      message: "success",
      data: {
        rowCount: rowCount,
        rows: rows,
      },
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
