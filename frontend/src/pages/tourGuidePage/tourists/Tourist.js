import React from "react";
import "./Tourist.css";
import MyTable from "../../../components/dataTable/DataTable";
const Tourist = () => {
  const Usercolumns = [
    { name: "ID", selector: "id", sortable: true },
    { name: "Name", selector: "name", sortable: true },
    { name: "Email", selector: "email", sortable: true },
    { name: "Role", selector: "role", sortable: true },
    { name: "Phone", selector: "phone", sortable: true },
  ];
  return (
    <div className="MainTourist">
      <span className="custmers">customers</span>
      <div className="tableContainer">
      <MyTable
        apiEndpoint="http://localhost:5000/api/users"
        title="Tourists"
        columns={Usercolumns}
        dataKey="user"
      />
      </div>
      
    </div>
  );
};

export default Tourist;
