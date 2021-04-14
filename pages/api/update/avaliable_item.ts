import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../lib/db";
import { getUserData } from "../get/userdata";

/**
 * Delete query sample 1
 */
export default async (
  {
    headers: { authorization: jwt_token },
    body: { id: aid, price: price, quantity: quantity, category: category },
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
      `SELECT * FROM "AVALIABLE_ITEM" WHERE aid LIKE '${aid}';`
    );

    if (rowCount === 0) {
      return res.status(500).json({
        message: `item with id:${aid} either does not exist or is sold out`,
      });
    }

    const update_query: Array<string> = [];

    if (price) {
      update_query.push(`price = '${price}'`);
    }
    if (quantity) {
      update_query.push(`quantity = '${quantity}'`);
    }
    if (category) {
      update_query.push(`category = '${category}'`);
    }

    await pool.query(
      `UPDATE "AVALIABLE_ITEM" SET ${update_query.join(
        ", "
      )} WHERE aid LIKE '${aid}';`
    );

    res.status(200).json({
      message: `item with id:${aid} has been updated`,
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
