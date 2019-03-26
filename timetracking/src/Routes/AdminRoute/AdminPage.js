import axios from "axios";
import React from "react";
import Header from "../../Header";
import Api_Url from "../../Helpers/Api_Url";
import GenerateHeaderData from "../../Helpers/GenerateHeaderData";
import Userlist from "./Userlist";
import "./Admin.css";

export default class AdminPage extends React.Component {
  state = {
    title: "Admin sidan",
    subtitle: "",
    users: []
  };
  componentDidMount = () => {
    const userId = localStorage.getItem("id");
    axios
      .get(`${Api_Url}/admin/` + userId, { headers: GenerateHeaderData() })
      .then(res => {
        this.setState({
          users: res.data
        });
      });
  };
  render() {
    return (
      <div>
        <Header title={this.state.title} />
        <Userlist users={this.state.users} />
      </div>
    );
  }
}
