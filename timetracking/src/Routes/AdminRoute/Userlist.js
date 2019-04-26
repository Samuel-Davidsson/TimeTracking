import React from "react";
import { Button, Input, Table } from "reactstrap";

const userlist = props => {
  const handleReportClick = user => {
    const userInfo = {
      user: user,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      attest: user.attest
    };
    props.reportUserInfo(userInfo);
  };

  const handleHistoryClick = user => {
    const userHistoryInfo = {
      id: user.id,
      firstName: user.firstname,
      lastName: user.lastname
    };
    props.reportHistoryInfo(userHistoryInfo);
  };

  return (
    <div className="userlist-main-div">
      <Table striped className="userlist-main">
        <thead>
          <tr>
            <th>Id</th>
            <th>Förnamn</th>
            <th>Efternamn</th>
            <th>Avdelning</th>
            <th>Rapport</th>
            <th>Historik</th>
            <th>Godkänd</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map(user => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.department}</td>
              <td>
                <Button
                  className="userlist-buttons"
                  onClick={() => handleReportClick(user)}
                >
                  Rapport
                </Button>
              </td>
              <td>
                <Button
                  className="userlist-buttons"
                  onClick={() => handleHistoryClick(user)}
                >
                  Historik
                </Button>
              </td>
              <td>
                <Input
                  readOnly
                  checked={user.attest}
                  style={{
                    backgroundColor: user.attest ? "DarkSeaGreen" : "IndianRed"
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default userlist;
