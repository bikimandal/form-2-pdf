import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import Output from "./components/Output";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/output" element={<Output />} />
      </Routes>
    </Router>
  );
};

export default App;
