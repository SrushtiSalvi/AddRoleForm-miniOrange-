import logo from "./logo.svg";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddRole from "./pages/AddRole";
import Navbar from "./components/common/Navbar";
import Form from "./components/test/Form";

function App() {
  return (
    <div>
      <Navbar />
      <AddRole />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* <Form /> */}
    </div>
  );
}

export default App;
