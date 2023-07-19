import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import adminCapabilities from "../../admincapabilities.json";
import { useDispatch, useSelector } from "react-redux";
import { setAdminCapabilities } from "../../store/slices/userSlice";
import CheckB from "./CheckB";
import { Category } from "@mui/icons-material";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const AdminCapabilities = () => {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const listData = useSelector((state) => state.user.adminCapabilities);
  // console.log("listData>>>", listData);

  // const updateChecked = (data) => {
  // const updatedCapabilities = data.map((item) => {
  //   const updatedSubCapabilities = item.capabilities.map((capability) => {
  //     console.log("capablity>>>", capability);
  //     capability.checked = true;
  //     const updatedSubCategories = capability.subcategories.map(
  //       (category) => {
  //         category.checked = true;
  //         return category;
  //       }
  //     );
  //     capability.subcategories = updatedSubCategories;
  //     return capability;
  //   });
  //   item.capabilities = updatedSubCapabilities;
  //   // item.name = "cgfsd";
  //   return item;
  // });
  // return updatedCapabilities;
  // };

  // console.log("data in redux", listData);

  // const [adminCapabilitiesState, setCapabilitiesState] =
  //   useState(adminCapabilities);
  // console.log(adminCapabilitiesState);

  // const updateCheckedStatus = (data) => {
  //   const updatedData = data.map((group) => ({
  //     ...group,
  //     capabilities: group.capabilities.map((capability) => ({
  //       ...capability,
  //       subcategories: capability.subcategories.map((subcategory) => ({
  //         ...subcategory,
  //         // Condition to determine if checked should be true or false
  //         checked: subcategory.checked === false ? true : subcategory.checked,
  //       })),
  //       // Condition to determine if checked should be true or false
  //       checked: capability.checked === false ? true : capability.checked,
  //     })),
  //   }));
  //   return updatedData;
  // };

  const updateCheckedStatus = (data) => {
    const updatedData = data.map((group) => ({
      ...group,
      capabilities: group.capabilities.map((capability) => ({
        ...capability,
        subcategories: capability.subcategories.map((subcategory) => ({
          ...subcategory, // Condition to determine if checked should be true or false
          checked: subcategory.checked === false ? true : subcategory.checked,
        })), // Condition to determine if checked should be true or false
        checked: capability.checked === false ? true : capability.checked,
      })),
    }));
    return updatedData;
  };

  // useEffect(() => {
  //   dispatch(setAdminCapabilities(adminCapabilities));
  // }, []);

  useEffect(() => {
    // dispatch(setAdminCapabilities(adminCapabilities));

    //API call to get adminCapabilities or userCapabilities based on selected value (user or admin)
    // const isAdmin = true;
    // if (user.inheritFrom === "Admin") {
    //   // console.log("adminCapabilities>>>>", adminCapabilities);
    //   console.log("inherited from admin");
    //   const result = updateChecked(listDataCopy);
    //   console.log("result >>>", result);
    //   console.log(result);
    //   // console.log("updated >>>>", updatedCapabilities);
    //   dispatch(setAdminCapabilities(result));
    //   console.log("adminCapabilities>>>>", adminCapabilities);
    // } else {
    // }

    //check if data is set in redux
    if (listData.length === 0) {
      console.log(
        "No data in redux, setting data on redux for adminCapabilities"
      );
      if (user.inheritFrom === "Admin") {
        const result = updateCheckedStatus(adminCapabilities);
        // setResultData(result);
        dispatch(setAdminCapabilities(result));
        console.log("result>>>>", result);
      } else {
        dispatch(setAdminCapabilities(adminCapabilities));
      }
    }
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleCheckboxChange = (e) => {
  //   const item = e.target.name;
  //   const isChecked = e.target.checked;

  //   setCheckedItems(new Map(checkedItems.set(item, isChecked)));

  //   let map2 = new Map(
  //     [...checkedItems].filter(([keys, value]) => value === true)
  //   );

  //   dispatch(
  //     setAdminCapabilities(
  //       [...map2].map((i) => {
  //         return i[0];
  //       })
  //     )
  //   );
  // };

  // const handleCheckBoxParent = (e, subcategories) => {
  //   if (e.target.checked) {
  //     subcategories.forEach((item) => {
  //       item.checked = true;
  //       console.log(item);
  //     });
  //   } else {
  //     subcategories.forEach((item) => {
  //       item.checked = false;
  //       console.log(item);
  //     });
  //   }
  // };

  // const handleCheckBoxChild = (e) => {
  //   console.log("event>>>", e.target.checked);
  // };

  const handleChildCheckBox = (parentId, capabilityId, subcategoryId) => {
    // console.log(parentId, capabilityId, subcategoryId);
    const updatedData = listData.map((data) => {
      if (data.id === parentId) {
        const capabilities = data.capabilities.map((capability) => {
          if (capability.id === capabilityId) {
            const subcategories = capability.subcategories.map(
              (subcategory) => {
                if (subcategory.id === subcategoryId) {
                  return {
                    ...subcategory,
                    checked: !subcategory.checked,
                  };
                }
                return subcategory;
              }
            );
            return {
              ...capability,
              subcategories,
            };
          }
          return capability;
        });
        return {
          ...data,
          capabilities,
        };
      }
      return data;
    });
    // setListData(updatedData);
    dispatch(setAdminCapabilities(updatedData));
  };

  const handleCapabilityCheckBox = (parentId, capabilityId) => {
    // console.log(parentId, capabilityId);
    const updatedData = listData.map((data) => {
      if (data.id === parentId) {
        // console.log("parentID matched", parentId);
        const capabilities = data.capabilities.map((capability) => {
          if (capability.id === capabilityId) {
            // console.log("capabilityID matched", capabilityId);
            const allSubcategoriesSelected = capability.subcategories.every(
              (subcategory) => subcategory.checked
            );
            // console.log(
            //   "allSubcategoriesSelected ->",
            //   allSubcategoriesSelected
            // );

            const subcategories = capability.subcategories.map(
              (subcategory) => ({
                ...subcategory,
                checked: !allSubcategoriesSelected,
              })
            );
            // console.log("subcategories ->", subcategories);

            // console.log("data to be returnes", {
            //   ...capability,
            //   subcategories,
            // });

            return {
              ...capability,
              subcategories,
            };
          }
          return capability;
        });

        return {
          ...data,
          capabilities,
        };
      }
      return data;
    });
    // setListData(updatedData);
    dispatch(setAdminCapabilities(updatedData));
    // console.log("updatedData", updatedData);
  };

  return (
    <Box
      sx={{
        // flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        // height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {listData.map((item) => {
          return (
            <Tab
              label={item.name}
              {...a11yProps(item.id)}
              className="px-5"
              key={item.id}
              id={item.id}
            />
          );
        })}
      </Tabs>
      {listData.map((item, i) => {
        return (
          <TabPanel value={value} index={i} key={item.id}>
            {/* <Typography key={item.id}>{item.name}</Typography>
            <Typography key={item.id}>{item.description}</Typography> */}
            <div className="p-4">
              {item.capabilities.map((capability) => {
                return (
                  <div key={capability.id}>
                    <FormControlLabel
                      // key={capability.id}
                      label={capability.name}
                      control={
                        <Checkbox
                          // value={capability.name}
                          // id={capability.name}
                          // key={capability.id}
                          // name={capability.name}
                          checked={capability.subcategories.every(
                            (subcategory) => subcategory.checked
                          )}
                          // checked = {true}
                          // indeterminate={checked[0] !== checked[1]}
                          // onChange={(e) => handleCheckboxChange(e)}
                          onChange={() =>
                            handleCapabilityCheckBox(item.id, capability.id)
                          }
                        />
                      }
                    />

                    <Box
                      sx={{ display: "flex", flexDirection: "column", ml: 3 }}
                    >
                      {capability.subcategories.map((subcategory) => {
                        return (
                          <div key={subcategory.id}>
                            <FormControlLabel
                              // key={subcategory.id}
                              label={subcategory.name}
                              control={
                                <Checkbox
                                  // key={`${item.id}${capability.id}${subcategory.id}`}
                                  // value={subcategory.name}
                                  // name={subcategory.name}
                                  // checked={subcategory.checked}
                                  // checked={checkedItems.get(subcategory.name)}

                                  checked={subcategory.checked}
                                  // onChange={(e) => handleCheckboxChange(e)}
                                  onChange={() =>
                                    handleChildCheckBox(
                                      item.id,
                                      capability.id,
                                      subcategory.id
                                    )
                                  }
                                />
                              }
                            />
                          </div>
                        );
                      })}
                    </Box>
                  </div>
                );
              })}
            </div>
          </TabPanel>
        );
      })}
    </Box>
  );
};
export default AdminCapabilities;
