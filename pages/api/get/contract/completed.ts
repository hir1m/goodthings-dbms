import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../../lib/db";
import { getUserData } from "../userdata";

/**
 * Division query sample 1
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
      `SELECT cid FROM "SOLDOUT_ITEM" WHERE cid NOT IN (SELECT cid FROM
      "AVALIABLE_ITEM");
      `
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
