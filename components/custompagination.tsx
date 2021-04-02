import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Table, Container, Pagination } from "react-bootstrap";

interface Props {
  pageCount: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const CustomPagination: React.FC<Props> = ({ pageCount, page, setPage }) => {
  if (pageCount == 1) {
    return <></>;
  }

  const pageIncr = () => {
    setPage(page + 1);
  };
  const pageDecr = () => {
    setPage(page + 1);
  };

  const items: ReactNode[] = [];

  if (pageCount <= 10) {
    Array.from(Array(pageCount).keys()).map((i) => {
      items.push(
        <Pagination.Item
          key={i}
          active={page === i + 1}
          onClick={(_) => setPage(i + 1)}
        >
          {i + 1}
        </Pagination.Item>
      );
    });
  } else {
    // let items be the rolling window

    type Range = {
      min: number;
      max: number;
    };

    let range: Range = {
      min: null,
      max: null,
    };

    if (page <= 4) {
      // setEllipsisL(false);
      range.min = 2;
      range.max = 6;
    } else if (pageCount - page <= 3) {
      range.min = pageCount - 5;
      range.max = pageCount - 1;
    } else {
      range.min = page - 2;
      range.max = page + 2;
    }

    for (let i = range.min; i <= range.max; i++) {
      items.push(
        <Pagination.Item
          key={i - 1}
          active={page === i}
          onClick={(_) => setPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
  }

  return (
    <Pagination>
      {pageCount > 10 ? (
        <React.Fragment>
          <Pagination.First onClick={(_) => setPage(1)} />
          <Pagination.Prev onClick={pageDecr} />
          <Pagination.Item active={page === 1} onClick={(_) => setPage(1)}>
            {1}
          </Pagination.Item>
        </React.Fragment>
      ) : (
        <React.Fragment />
      )}

      {page - 1 > 3 && pageCount > 10 ? (
        <Pagination.Ellipsis />
      ) : (
        <React.Fragment />
      )}

      {items}

      {pageCount - page > 3 && pageCount > 10 ? (
        <Pagination.Ellipsis />
      ) : (
        <React.Fragment />
      )}

      {pageCount > 10 ? (
        <React.Fragment>
          <Pagination.Item
            active={page === pageCount}
            onClick={(_) => setPage(pageCount)}
          >
            {pageCount}
          </Pagination.Item>
          <Pagination.Next onClick={pageIncr} />
          <Pagination.Last onClick={(_) => setPage(pageCount)} />
        </React.Fragment>
      ) : (
        <React.Fragment />
      )}
    </Pagination>
  );
};

export default CustomPagination;
