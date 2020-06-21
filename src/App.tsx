import React from "react";
import Todos from "./components/Todos";
import SomeCheckboxes from "./components/SomeCheckboxes";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Todos mainTitle="The title of the todos" />
        <br />
        <br />
        <SomeCheckboxes />
      </header>
    </div>
  );
}

export default App;
