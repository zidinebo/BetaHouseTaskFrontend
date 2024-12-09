import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import RootLayout from "./Layout/RootLayout";
import AuthLayout from "./Layout/AuthLayout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/homepage" element={<Home />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/" element={<SignUp />} />

            <Route path="/signin" element={<SignIn />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
