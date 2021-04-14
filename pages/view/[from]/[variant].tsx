import { NextPage } from "next";
import cookies from "next-cookies";
import { relative_path } from "../../../lib/config";
import { jwtFetch } from "../../../lib/utils";
import { UserData } from "../../../types/user";
import { Modal, Button } from "react-bootstrap";
import Navigation from "../../../components/navigation";
import DataTable from "../../../components/datatable";
import Error from "next/error";
import React from "react";
import Router from "next/router";

interface Props {
  userdata: UserData;
  error: String;
  data: Array<Object>;
}

const DataView: NextPage<Props> = ({ userdata, error, data }) => {
  const handleReturn = () => {
    Router.push("/");
  };

  return userdata ? (
    <div>
      <Navigation userdata={userdata} />

      {error ? (
        <Modal show={true} centered>
          <Modal.Header>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{error}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleReturn}>
              Return to Homepage
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <div>
          <DataTable data={data} />
        </div>
      )}
    </div>
  ) : (
    <Error statusCode={405} />
  );
};

DataView.getInitialProps = async (ctx) => {
  const { from, variant, id } = ctx.query;
  const { jwt_token } = cookies(ctx);
  // console.log(ctx);

  let userdata: UserData;
  let error: String = null;
  let data: Array<Object>;

  try {
    const res = await jwtFetch(`${relative_path}/api/get/userdata`, jwt_token);
    const res_json = await res.json();

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
        `${relative_path}/api/get/${from}/${variant}`,
        jwt_token,
        {
          "Content-Type": "application/json",
        },
        {
          method: "POST",
          body: JSON.stringify({
            id: id ? id : "null",
          }),
        }
      );
      const res_json = await res.json();
      // console.log(res_json);

      if (!res.ok) {
        error = res_json.message;
        data = null;
      } else {
        data = res_json.data.rows;
      }
    } catch (err) {
      console.error(err);
      data = null;
    }
  }

  return {
    userdata: userdata,
    error: error,
    data: data,
  };
};

export default DataView;
