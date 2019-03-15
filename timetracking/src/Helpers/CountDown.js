import React from "react";
import Countdown from "react-countdown-now";

export default class CountDown extends React.Component {
  state = {
    today: new Date(),
    sumdate: this.expirationDate - this.today
  };
  expiration = localStorage.getItem("expirationTime");
  expirationDate = new Date(this.expiration);
  today = new Date();
  sumdate = this.expirationDate - this.today;

  logout() {
    localStorage.clear();
    window.location.href = "/Timetracker";
  }
  render() {
    return (
      <div>
        <div>
          <Countdown
            date={Date.now() + this.sumdate}
            onComplete={this.logout}
            zeroPadTime={2}
            daysInHours={true}
          />
        </div>
      </div>
    );
  }
}
