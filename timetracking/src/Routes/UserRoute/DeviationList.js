import React from "react";
import { Button } from "reactstrap";
import "./UserRoute.css";

export default class DeviationList extends React.Component {
  render() {
    return (
      <div className="deviationlist-main-div">
        <form onSubmit={this.props.handleSubmit}>
          {this.props.deviationItems.map(deviationItem => (
            <div key={deviationItem.absenceDate.toLocaleDateString("sv")}>
              {deviationItem.absenceDate.toLocaleDateString("sv")}
              <input
                className="deviationlist-hours"
                type="number"
                value={deviationItem.hours}
                onChange={e => this.props.handleHoursChange(e, deviationItem)}
                min={0.5}
                max={8}
                step="any"
                required
              />
              <input
                className="deviationlist-description"
                type="text"
                value={deviationItem.description}
                onChange={e =>
                  this.props.handleDescriptionChange(e, deviationItem)
                }
                maxLength={40}
                minLength={2}
                required
              />
            </div>
          ))}
          <Button color="info" type="submit">
            Skicka in
          </Button>
        </form>
      </div>
    );
  }
}
