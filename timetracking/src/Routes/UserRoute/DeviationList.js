import React from "react";
import { Button } from "reactstrap";
import "./UserRoute.css";

export default class DeviationList extends React.Component {
  render() {
    return (
      <div className="deviationlist-main-div">
        <div
          className="deviation-list-header"
          hidden={
            !this.props.isValidMonth || !this.props.deviationItems.length > 0
          }
        >
          <h4>Lista med avvikelser</h4>
          <div className="deviation-list-titles">
            <p>Timmar Anledning</p>
          </div>
        </div>
        <form onSubmit={this.props.handleSubmit}>
          {this.props.deviationItems.map(deviationItem => (
            <div
              className="deviationlist-div"
              key={deviationItem.absenceDate.toLocaleDateString("sv")}
            >
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
                maxLength={30}
                minLength={2}
                required
              />
            </div>
          ))}
          <div>
            <Button
              hidden={
                !this.props.isValidMonth ||
                !this.props.deviationItems.length > 0
              }
              className="deviation-button"
              color="info"
              type="submit"
            >
              Skicka in
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
