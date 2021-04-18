import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../lib/db";
import { getUserData } from "../get/userdata";

export default async (
  {
    headers: { authorization: jwt_token },
    body: {
      id: aid,
      price: price,
      quantity: quantity,
      category: category,
      url: url,
      bid: bid,
      cid: cid,
    },
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
      `INSERT INTO "AVALIABLE_ITEM" (aid, price, quantity, category, url, bid, cid)
      VALUES ('${aid}', ${price}, ${quantity}, '${category}', '${url}', '${bid}', '${cid}');`
    );

    res.status(200).json({
      message: `new item has been inserted`,
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
