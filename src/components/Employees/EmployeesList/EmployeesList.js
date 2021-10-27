import React from "react";

import "./EmployeesList.scss";

const EmployeeDetails = ({ data }) => {
  return (
    <div>
      <div>
        {data.name} ({data.title})
      </div>
    </div>
  );
};

const EmployeesList = ({ employeesList, filteredEmployees, isSearchFound }) => {
  const employeesListHandler = (employees) => {
    if (typeof employees === "string") return employees;
    return employees.map((emp, i) => {
      return (
        <div key={i}>
          <EmployeeDetails data={emp} />
          {emp.subordinates && emp.subordinates.lenth !== 0 && (
            <div style={{ marginLeft: "20px" }}>
              {employeesListHandler(emp.subordinates)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="EmployeesList">
      <div>
        <h2>Results</h2>
        {employeesListHandler(
          filteredEmployees.length === 0
            ? isSearchFound
                  ? "No Employee results!"
              : employeesList
            : filteredEmployees
        )}
      </div>
    </div>
  );
};

export default EmployeesList;
