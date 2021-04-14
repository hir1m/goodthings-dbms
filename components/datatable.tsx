import { ReactNode, useState } from "react";
import { Table, Container, Row } from "react-bootstrap";
import CustomPagination from "./custompagination";

interface Props {
  data: Array<Object>;
}

const DataTable: React.FC<Props> = ({ data }) => {
  if (!data || data.length < 1) {
    return (
      <Container>
        <p className="text-center">No data to display</p>
      </Container>
    );
  }

  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(data.length / 15);
  const keys = Object.keys(data[0]);
  const keys_display = keys.map((x, i) => <th key={i}>{x}</th>);

  const rows_display: ReactNode[] = [];

  for (let i = (page - 1) * 15; i < Math.min(page * 15, data.length); i++) {
    let row = Object.values(data[i]);

    rows_display.push(
      <tr key={i}>
        {row.map((x, j) => (
          <td key={j}>{x ? x : "null"}</td>
        ))}
      </tr>
    );
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Table responsive="lg">
          <thead>{keys_display}</thead>
          <tbody>{rows_display}</tbody>
        </Table>
      </Row>
      <Row className="justify-content-center">
        <CustomPagination page={page} pageCount={pageCount} setPage={setPage} />
      </Row>
    </Container>
  );
};

export default DataTable;
