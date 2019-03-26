import React from "react";
import { Button, Table } from "reactstrap";
export default class Userlist extends React.Component {
  handleAddChangeReportClick = () => {
    console.log("💝");
  };
  handleHistoryClick = () => {
    console.log("👻");
  };
  render() {
    return (
      <div className="userlist-main-div">
        <h1 className="userlist-title">Anställda</h1>
        <Table striped className="userlist-main">
          <thead>
            <tr>
              <th>Id</th>
              <th>Förnamn</th>
              <th>Efternamn</th>
              <th>Avdelning</th>
              <th>Editera</th>
              <th>Historik</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(user => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.department}</td>
                <td>
                  <Button
                    className="userlist-buttons"
                    onClick={() => this.handleAddChangeReportClick(user)}
                  >
                    Editera
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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
