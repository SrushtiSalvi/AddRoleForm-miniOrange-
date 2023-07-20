import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  FormControl,
  FormGroup,
  FormLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { styled } from "@mui/system";
import AddCapabilitiesForm from "./AddCapabilitiesForm";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setAdminCapabilities,
  setUser,
  setUserCapabilities,
} from "../../store/slices/userSlice";
import Preview from "../Preview";
import CodeSnippet from "../common/CodeSnippet";

const steps = ["Add Role Name", "Add Capabilities", "Preview"];

const StyledTextarea = styled(TextareaAutosize)(
  () => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 2px;
  color:  grey[500]
  border: 1px solid  grey[200]
  
  

  

  &:focus {
    border-color:{ #EB5424};
    
  }

 
`
);

const StepperForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [inheritFrom, setInheritFrom] = useState("");
  const [error, setError] = useState(false);
  const adminCapabilities = useSelector(
    (state) => state.user.adminCapabilities
  );
  const userCapabilities = useSelector((state) => state.user.userCapabilities);
  let capabiltites;

  // const removeKeysWithFalseSubcategory = (data) => {
  //   const updatedData = data.map((item) => {
  //     item.capabilities.filter((capability) => console.log(capability));
  //   });
  //   return updatedData;
  // };
  const removeKeysWithFalseSubcategory = (
    adminCapabilities,
    userCapabilities
  ) => {
    let resultArr = [];
    let resultAdminArr = [];
    let resultUserArr = [];

    const updatedAdminCapabilties = adminCapabilities.map((group) => ({
      ...group,
      capabilities: group.capabilities.map((capability) => {
        const filteredSubcategories = capability.subcategories.map(
          (subcategory) => {
            if (subcategory.checked === true) {
              resultAdminArr = [...resultAdminArr, subcategory];
            }
          }
        );
      }),
    }));
    const updatedUserCapabilties = userCapabilities.map((group) => ({
      ...group,
      capabilities: group.capabilities.map((capability) => {
        const filteredSubcategories = capability.subcategories.map(
          (subcategory) => {
            if (subcategory.checked === true) {
              resultUserArr = [...resultUserArr, subcategory];
            }
          }
        );
      }),
    }));

    resultArr = {
      adminCapabilities: {
        name: "Admin Capabilities",
        capabilities: [...resultAdminArr],
      },
      enduserCapabilities: {
        name: "End User capabilties",
        capabilities: [...resultUserArr],
      },
    };

    return resultArr;
  };

  capabiltites = removeKeysWithFalseSubcategory(
    adminCapabilities,
    userCapabilities
  );

  // console.log(capabiltites);

  // if (inheritFrom === "Admin") {
  //   capabiltites = adminCapabilities;
  // } else {
  //   capabiltites = userCapabilities;
  // }

  const data = {
    roleName: roleName,
    description: description,
    inheritFrom: inheritFrom,
    capabilities: capabiltites,
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (activeStep) => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    } else if (roleName === "" || description === "" || inheritFrom === "") {
      toast.error("Kindly fill all the required fields first");
      setError(true);
      console.log("fields empty");
    } else {
      dispatch(setUser(data));
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setRoleName("");
    setDescription("");
    setInheritFrom("");
    dispatch(setUser({}));
  };

  const handleSelectChange = (e) => {
    setInheritFrom(e.target.value);
    dispatch(setAdminCapabilities([]));
    dispatch(setUserCapabilities([]));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   );
          // }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
          <Box>
            <CodeSnippet />
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              justifyContent: "end",
              marginY: 3,
            }}
          >
            {activeStep === 0 ? null : (
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                className="text-capitalize fw-bolder"
              >
                <ArrowBackIcon className="mx-2" />
                Back
              </Button>
            )}
            <Box />
            {isStepOptional(activeStep) && (
              <Button
                className="text-capitalize"
                onClick={handleSkip}
                sx={{ mr: 1, color: "blue" }}
              >
                Skip
              </Button>
            )}
            {activeStep !== 0 ? (
              <Button onClick={handleNext} color="primary" variant="contained">
                {activeStep === steps.length - 1 ? "Finish" : "Save and next"}
              </Button>
            ) : null}
          </Box>

          <Box>
            {(activeStep === 0 && (
              // <AddRoleNameForm
              //   activeStep={activeStep}
              //   steps={steps}
              //   roleName={roleName}
              //   setRoleName={setRoleName}
              //   description={description}
              //   setDescription={setDescription}
              //   inheritFrom={setInheritFrom}
              //   skipped={skipped}
              //   isStepS
              //   kipped={isStepSkipped}
              // />
              <Box className="m-3 ">
                <FormGroup>
                  <Box className="d-flex flex-column">
                    <Typography variant="heading">
                      {steps[activeStep]}
                    </Typography>
                    <Typography variant="info" className="mt-3">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </Typography>
                  </Box>
                  <FormControl className="w-50 my-5">
                    <Typography variant="subHeading">
                      Enter Role Name
                    </Typography>
                    <TextField
                      required
                      type="text"
                      variant="outlined"
                      placeholder="Role name"
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
                      // error={error}
                    />
                    <br />
                    <Typography variant="subHeading">Description</Typography>

                    <StyledTextarea
                      required
                      className="h-100 p-3 border borderRadius-3 focus-ring-primary"
                      variant="outlined"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      error={error}
                      helperText={error && "Kindly fill all the fields"}
                      // placeholder="description"
                    />
                    {/* <textarea
                      cols="30"
                      rows="5"
                      className=" placeholder-sm"
                      required={true}
                      placeholder="
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                            ut labore et dolore magna aliqua.
                      "
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea> */}
                    <br />
                    <Typography variant="subHeading">
                      Inherit Capabilities from
                    </Typography>
                    <Select
                      required
                      value={inheritFrom}
                      onChange={(e) => handleSelectChange(e)}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      defaultValue="None"
                    >
                      <MenuItem value={"None"}>None</MenuItem>
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="User">End User</MenuItem>
                    </Select>
                  </FormControl>
                </FormGroup>
                {activeStep === 0 ? (
                  <Button
                    onClick={() => handleNext(activeStep)}
                    color="primary"
                    variant="contained"
                  >
                    {activeStep === steps.length - 1
                      ? "Finish"
                      : "Save and next"}
                  </Button>
                ) : null}
              </Box>
            )) ||
              (activeStep === 1 && (
                <AddCapabilitiesForm
                  activeStep={activeStep}
                  roleName={roleName}
                />
              )) || <Preview />}
          </Box>
        </>
      )}
    </Box>
  );
};

export default StepperForm;
