import React from "react";
import { Button, Table } from "reactstrap";

const userhistory = props => {
  return (
    <div>
      <h3>Rapporter historik</h3>
      <Table striped className="userhistorylist-main">
        <thead>
          <tr>
            <th>Id</th>
            <th>Datum</th>
            <th>Förnamn</th>
            <th>Efternamn</th>
            <th>Rapport</th>
          </tr>
        </thead>
        <tbody>
          {props.reports.map(report => (
            <tr key={report.id}>
              <th scope="row">{report.id}</th>
              <td>{report.date.toLocaleString().slice(0, 7)}</td>
              <td>{props.firstName}</td>
              <td>{props.lastName}</td>
              <td>
                {" "}
                <Button
                  className="userlist-buttons"
                  onClick={() => props.handleGetReportByReportId(report.id)}
                >
                  Rapport
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default userhistory;
