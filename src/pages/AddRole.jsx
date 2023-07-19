import { Typography } from "@mui/material";
import React from "react";
import StepperForm from "../components/AddRole.jsx/StepperForm";

const AddRole = () => {
  return (
    <div className="p-4 d-flex flex-column  gap-5">
      <p variant="info">Users / Manage Roles / Add Role</p>
      <h4>Add New Role</h4>
      <StepperForm />
    </div>
  );
};

export default AddRole;
