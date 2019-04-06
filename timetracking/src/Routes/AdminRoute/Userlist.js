import React from "react";
import { Button, Input, Table } from "reactstrap";

export default class Userlist extends React.Component {
  handleReportClick = user => {
    const userInfo = {
      user: user,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      attest: user.attest
    };
    this.props.reportUserInfo(userInfo);
  };

  handleHistoryClick = () => {
    console.log("👻");
  };

  render() {
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
            {this.props.users.map(user => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.department}</td>
                <td>
                  <Button
                    className="userlist-buttons"
                    onClick={() => this.handleReportClick(user)}
                  >
                    Rapport
                  </Button>
                </td>
                <td>
                  <Button
                    className="userlist-buttons"
                    onClick={() => this.handleHistoryClick(user)}
                  >
                    Historik
                  </Button>
                </td>
                <td>
                  <Input
                    readOnly
                    checked={user.attest}
                    style={{
                      backgroundColor: user.attest
                        ? "DarkSeaGreen"
                        : "IndianRed"
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
