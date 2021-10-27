import React, { useEffect, useState } from "react";
import axios from "axios";

import Search from "./Search";
import EmployeesList from "./EmployeesList";

const Employees = () => {
  const [employeesList, setEmployeesList] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isSearchFound, setIsSearchFound] = useState(false);

  const searchEmployeeHandler = (ev) => {
    let { value } = ev.target;
    setSearchText(value);
    const list = [];
    const filterEmployees = (empList, value) => {
      for (let emp of empList) {
        if (emp.name.toLowerCase().includes(value.toLowerCase())) {
          let em = { ...emp };
          delete em.subordinates;
          list.push(em);
        }
        if (emp.subordinates.length !== 0) {
          filterEmployees(emp.subordinates, value);
        }
      }
    };
    if (value !== "") {
      filterEmployees(employeesList, value);
      if (list.length === "") {
        setFilteredEmployees([]);
        setIsSearchFound(false);
      } else {
        setIsSearchFound(true);
        setFilteredEmployees(list);
      }
    } else {
      setFilteredEmployees([]);
      setIsSearchFound(false);
    }
  };

  useEffect(() => {
    getEmployess();
  }, []);

  const getEmployess = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URI}/employees`
    );
    setEmployeesList(data);
  };

  return (
    <div>
      <Search
        searchEmployee={searchEmployeeHandler}
        searchText={searchText}        
      />
      <EmployeesList
        employeesList={employeesList}
        filteredEmployees={filteredEmployees}
        isSearchFound={isSearchFound}
      />
    </div>
  );
};

export default Employees;
