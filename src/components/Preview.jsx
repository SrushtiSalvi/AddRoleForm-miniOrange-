import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

const Preview = () => {
  const user = useSelector((state) => state.user.user);
  // const adminCapabilities = useSelector(
  //   (state) => state.user.adminCapabilities
  // );
  // const userCapabilities = useSelector((state) => state.user.userCapabilities);
  // console.log(adminCapabilities);
  console.log(user.capabilities.adminCapabilities.name);
  return (
    <div className="">
      <div className="d-flex flex-column border-bottom p-4">
        <Typography variant="heading" className="pb-2">
          Preview
        </Typography>
        <Typography variant="info">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Typography>
      </div>
      <div className="p-4 d-flex flex-column border-bottom">
        <Typography variant="heading">Role</Typography>
        <Typography className="py-3">{user.roleName}</Typography>
        <Typography variant="subHeading">{user.description}</Typography>
      </div>
      <div className="p-3">
        <Typography variant="heading">Capabilities</Typography>
        <div className="d-flex justify-content-around p-5">
          <div>
            <Typography variant="capabilityName">
              {user.capabilities.adminCapabilities.name}
            </Typography>
            <div>
              {user.capabilities.adminCapabilities.capabilities?.map(
                (capability) => {
                  return (
                    <div key={capability.id}>
                      <FormControlLabel
                        // key={subcategory.id}
                        label={capability.name}
                        control={
                          <Checkbox
                            // key={`${item.id}${capability.id}${subcategory.id}`}
                            // value={subcategory.name}
                            // name={subcategory.name}
                            // checked={subcategory.checked}
                            // checked={checkedItems.get(subcategory.name)}
                            disabled={true}
                            checked={capability.checked}
                            // onChange={(e) => handleCheckboxChange(e)}
                            // onChange={() =>
                            //   handleChildCheckBox(
                            //     item.id,
                            //     capability.id,
                            //     subcategory.id
                            //   )
                            // }
                          />
                        }
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div>
            <Typography variant="capabilityName">
              {user.capabilities.enduserCapabilities.name}
            </Typography>
            <div>
              {user.capabilities.enduserCapabilities.capabilities?.map(
                (capability) => {
                  return (
                    <div key={capability.id}>
                      <FormControlLabel
                        // key={subcategory.id}
                        label={capability.name}
                        control={
                          <Checkbox
                            // key={`${item.id}${capability.id}${subcategory.id}`}
                            // value={subcategory.name}
                            // name={subcategory.name}
                            // checked={subcategory.checked}
                            // checked={checkedItems.get(subcategory.name)}
                            disabled={true}
                            checked={capability.checked}
                            // onChange={(e) => handleCheckboxChange(e)}
                            // onChange={() =>
                            //   handleChildCheckBox(
                            //     item.id,
                            //     capability.id,
                            //     subcategory.id
                            //   )
                            // }
                          />
                        }
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
