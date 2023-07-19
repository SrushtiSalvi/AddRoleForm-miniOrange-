import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AdminCapabilities from "./AdminCapabilities";
import UserCapabilities from "./UserCapabilities";
import { useDispatch, useSelector } from "react-redux";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CapabilitiesTab() {
  const user = useSelector((state) => state.user.user);

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (user.inheritFrom === "None") {
      setValue(0);
    } else if (user.inheritFrom !== "Admin") {
      setValue(1);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{}}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          // aria-label="basic tabs example"
          className=" d-flex "
        >
          <Tab label="Admin Capabilities" {...a11yProps(0)} className="w-100" />
          <Tab
            label="EndUser Capabilities"
            {...a11yProps(1)}
            className="w-100"
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AdminCapabilities />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <UserCapabilities />
      </CustomTabPanel>
    </Box>
  );
}
