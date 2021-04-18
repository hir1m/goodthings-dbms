import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../lib/db";
import { getUserData } from "../get/userdata";

export default async (
  {
    headers: { authorization: jwt_token },
    body: { id: cid, number: number, e_pid: e_pid, m_pid: m_pid, pid: pid },
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

    await pool.query(
      `INSERT INTO "CONTRACT" VALUES ('${cid}', ${number}, '${e_pid}', '${m_pid}', '${pid}');`
    );

    res.status(200).json({
      message: `new contract has been inserted`,
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
