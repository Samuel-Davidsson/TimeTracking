import React from "react";
import "react-app-polyfill/ie11";
import "react-day-picker/lib/style.css";
import Header from "../../Header";
import HomePageNavBar from "../../HomePageNavbar";
import Timereport from "./Timereport";

export default class UserPage extends React.Component {
  state = {
    title: "Månadens Rapport",
    subtitle: "Fyll i din frånvaro här senast den sista dagen varje månad"
  };
  render() {
    return (
      <div>
        <HomePageNavBar />
        <Header title={this.state.title} subtitle={this.state.subtitle} />
        <Timereport />
      </div>
    );
  }
}
