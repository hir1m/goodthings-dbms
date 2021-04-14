import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../lib/db";
import { getUserData } from "../get/userdata";

/**
 * Delete query sample 1
 */
export default async (
  {
    headers: { authorization: jwt_token },
    body: { id: m_pid, phone_number: phone_number },
  }: NextApiRequest,
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
      `SELECT * FROM "MEMBER" WHERE m_pid LIKE '${m_pid}';`
    );

    if (rowCount === 0) {
      return res.status(500).json({
        message: `member with id:${m_pid} does not exist`,
      });
    }

    await pool.query(
      `UPDATE "MEMBER" SET phone_number = '${phone_number}' WHERE m_pid = '${m_pid}';`
    );

    res.status(200).json({
      message: `phone number of member with id:${m_pid} has been updated`,
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
