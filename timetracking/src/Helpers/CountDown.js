import React from "react";
import Countdown from "react-countdown-now";
import Logout from "./Logout";

const countDown = () => {
  const expiration = localStorage.getItem("expirationTime");
  const expirationDate = new Date(expiration);
  const today = new Date();
  const sumdate = expirationDate - today;

  return (
    <div>
      <div>
        <Countdown
          date={Date.now() + sumdate}
          onComplete={Logout}
          zeroPadTime={2}
          daysInHours={true}
        />
      </div>
    </div>
  );
};
export default countDown;
