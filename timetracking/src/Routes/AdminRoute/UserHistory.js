import React from "react";

const userhistory = props => {
  return (
    <div>
      <h3>Rapporter historik</h3>
      <div>
        {props.reports.map(report => (
          <div key={report.id}>
            <div className="admin-history-list">
              {report.date.toLocaleString().slice(0, 7)} {props.firstName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default userhistory;
