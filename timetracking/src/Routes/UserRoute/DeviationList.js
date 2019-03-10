import React from "react";
import "./UserRoute.css";

export default class DeviationList extends React.Component {
  hoursRef = React.createRef();
  descriptionRef = React.createRef();
  render() {
    return (
      <div className="deviationlist-main-div">
        <form>
          {this.props.deviationItems.map(deviationItem => (
            <div
              className="deviationlist-div"
              key={deviationItem.absenceDate.toLocaleDateString("sv")}
            >
              {deviationItem.absenceDate.toLocaleDateString("sv")}
              <input
                className="deviationlist-hours"
                type="number"
                min={0.5}
                max={8}
                step="any"
                required
              />
              <input
                className="deviationlist-description"
                type="text"
                maxLength={30}
                minLength={2}
                required
              />
            </div>
          ))}
        </form>
      </div>
    );
  }
}
