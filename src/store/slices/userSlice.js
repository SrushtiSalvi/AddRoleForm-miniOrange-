import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    // MFAData: {},
    // Branding: {},
    // AppsPolicies: {},
    // AuthenticationSource: {},
    // Reports: {},
    adminCapabilities: [],
    userCapabilities: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAdminCapabilities: (state, action) => {
      // console.log("payload", action.payload);
      // console.log("inside dispatcher");
      state.adminCapabilities = action.payload;
    },
    setUserCapabilities: (state, action) => {
      // console.log("payload", action.payload);
      state.userCapabilities = action.payload;
    },
    // setMFAData: (state, action) => {
    //   state.MFAData = action.payload;
    // },
    // setBranding: (state, action) => {
    //   state.Branding = action.payload;
    // },
    // setAppsPolicies: (state, action) => {
    //   state.AppsPolicies = action.payload;
    // },
    // setAuthenticationSource: (state, action) => {
    //   state.AuthenticationSource = action.payload;
    // },
    // setReports: (state, action) => {
    //   state.Reports = action.payload;
    // },
  },
});

export const { setUser, setAdminCapabilities, setUserCapabilities } =
  userSlice.actions;

export default userSlice.reducer;
