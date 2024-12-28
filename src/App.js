import "./App.css";
import Home from "./Screens/Home";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Components/ContextReducer.jsx";
import MyOrder from "./Screens/MyOrder.js";
function App() {
  return (
    <CartProvider> <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/createuser" element={<Signup />} />
          <Route exact path="/myOrder" element={<MyOrder />} />
        </Routes>
      </div>
    </Router></CartProvider>
   
  );
}

export default App;
