import React from "react";
import "./App.css";
import NextPhaseContainer from "./components/NextPhaseContainer";
import CurrentPhaseContainer from "./components/CurrentPhaseContainer";

function App() {
  return (
    <div className="App">
      <section>
        <NextPhaseContainer />
        <CurrentPhaseContainer />
      </section>
    </div>
  );
}

export default App;
