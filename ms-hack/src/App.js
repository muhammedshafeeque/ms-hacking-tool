import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Header from "./Components/Header/Header";
import CreateScript from "./Pages/CreateScript/CreateScript";
import Scripts from "./Pages/Scripts/Scripts";
import EnvironmentForm from "./Pages/Environment/environment";
import ScriptRunForm from "./Pages/RunSigleScript/RunSingleScript";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/"} exact element={<Home />} />
        <Route path={"/create-script"} element={<CreateScript />} />
        <Route path={"/scripts"} element={<Scripts />} />
        <Route path={"/create-environment"} element={<EnvironmentForm />} />
        <Route path={"/run-script/:id"} element={<ScriptRunForm/>} />

      </Routes>
    </>
  );
}

export default App;
