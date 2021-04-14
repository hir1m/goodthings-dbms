import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../../lib/db";
import { getUserData } from "../userdata";

/**
 * Aggregation query sample 2
 */
export default async (
  { headers: { authorization: jwt_token }, body: { id: bid } }: NextApiRequest,
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

    const { rowCount: rowCount_ } = await pool.query(
      `SELECT * FROM "BRANCH" WHERE bid LIKE '${bid}';`
    );

    if (rowCount_ === 0) {
      return res.status(500).json({
        message: `branch with id:${bid} does not exist`,
      });
    }

    const { rowCount: rowCount, rows: rows } = await pool.query(
      `SELECT COUNT("EMPLOYEE".e_pid)
      FROM "EMPLOYEE"
      WHERE bid LIKE '${bid}';`
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
