import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PersonList from "./components/PersonList";
import PersonItem from "./components/PersonItem";
import PersonEdit from "./components/PersonEdit";
import PersonAdd from "./components/PersonAdd";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonList />} />
        <Route path="/person/:pessoa_id" element={<PersonItem />} />
        <Route path="/person/:pessoa_id/edit" element={<PersonEdit />} />
        <Route path="/person/add" element={<PersonAdd />} />
      </Routes>
    </Router>
  );
};

export default App;
