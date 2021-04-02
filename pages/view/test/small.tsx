import { NextPage } from "next";
import cookies from "next-cookies";
import { relative_path } from "../../../lib/config";
import { jwtFetch } from "../../../lib/utils";
import { UserData } from "../../../types/user";
import Navigation from "../../../components/navigation";
import DataTable from "../../../components/datatable";
import Error from "next/error";
import React from "react";

interface Props {
  userdata: UserData;
  sampledata: Array<Object>;
}

const Test: NextPage<Props> = ({ userdata, sampledata }) => {
  return userdata ? (
    <div>
      <Navigation userdata={userdata} />
      <DataTable data={sampledata} />
    </div>
  ) : (
    <Error statusCode={405} />
  );
};

Test.getInitialProps = async (ctx) => {
  const { jwt_token } = cookies(ctx);
  // console.log(ctx);

  var userdata: UserData;
  var sampledata: Array<Object>;

  try {
    const res = await jwtFetch(`${relative_path}/api/get/userdata`, jwt_token);
    const res_json = await res.json();
    // console.log(res_json);

    if (!res.ok) {
      userdata = null;
    } else {
      userdata = res_json.data.userdata;
    }
  } catch (err) {
    console.error(err);
    userdata = null;
  }

  if (userdata) {
    try {
      const res = await jwtFetch(
        `${relative_path}/api/get/from/sample`,
        jwt_token,
        {
          "Content-Type": "application/json",
        },
        {
          method: "POST",
          body: JSON.stringify({
            limit: 10,
          }),
        }
      );
      const res_json = await res.json();
      // console.log(res_json);

      if (!res.ok) {
        userdata = res_json.data.userdata;
      } else {
        sampledata = res_json.data.rows;
      }
    } catch (err) {
      console.error(err);
      sampledata = null;
    }
  }

  return {
    userdata: userdata,
    sampledata: sampledata,
  };
};

export default Test;
