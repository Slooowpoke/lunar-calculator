import React from "react";
import "./App.css";
import NextPhaseContainer from "./components/NextPhaseContainer";
import CurrentPhaseContainer from "./components/CurrentPhaseContainer";
import PhaseForBirthdayContainer from "./components/PhaseForBirthdayContainer";

function App() {
  return (
    <div className="App">
      <section>
        <NextPhaseContainer />
        <CurrentPhaseContainer />
        <PhaseForBirthdayContainer />
      </section>
    </div>
  );
}

export default App;
