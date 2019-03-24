import React from "react";
import Countdown from "react-countdown-now";
import Logout from "./Logout";

export default class CountDown extends React.Component {
  state = {
    today: new Date(),
    sumdate: this.expirationDate - this.today
  };
  expiration = localStorage.getItem("expirationTime");
  expirationDate = new Date(this.expiration);
  today = new Date();
  sumdate = this.expirationDate - this.today;

  render() {
    return (
      <div>
        <div>
          <Countdown
            date={Date.now() + this.sumdate}
            onComplete={Logout}
            zeroPadTime={2}
            daysInHours={true}
          />
        </div>
      </div>
    );
  }
}
