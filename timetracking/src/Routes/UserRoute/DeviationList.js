import React from "react";

export default class DeviationList extends React.Component {
  render() {
    return (
      <div className="deviation-main">
        <form className="form-center" onSubmit={this.props.handleSubmit}>
          <div className="create-input-headers">
            <p>Timmar Anledning</p>
          </div>
          {this.props.deviationItems.map(deviationItem => (
            <div
              className="createList"
              key={deviationItem.absenceDate.toLocaleDateString("sv")}
            >
              {deviationItem.absenceDate.toLocaleDateString("sv")}
              <input
                className="create-input-hours"
                type="number"
                value={deviationItem.hours}
                required
                min={0.5}
                max={8}
                step="any"
                disabled={!this.props.isAdmin}
                onChange={e => this.props.handleHoursChange(e, deviationItem)}
              />
              <input
                className="create-input-description"
                type="text"
                value={deviationItem.description}
                disabled={!this.props.isAdmin}
                required
                onChange={e =>
                  this.props.handleDescriptionChange(e, deviationItem)
                }
              />
            </div>
          ))}
        </form>
      </div>
    );
  }
}
