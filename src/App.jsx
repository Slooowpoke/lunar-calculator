import React from "react";
import injectSheet from "react-jss";
import "./App.css";
import NextPhaseContainer from "./components/NextPhaseContainer";
import CurrentPhaseContainer from "./components/CurrentPhaseContainer";
import PhaseForBirthdayContainer from "./components/PhaseForBirthdayContainer";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Lunar Calculator</h1>
      </header>
      <section>
        <NextPhaseContainer />
        <hr />
        <CurrentPhaseContainer />
        <hr />
        <PhaseForBirthdayContainer />
      </section>
    </div>
  );
}

const styles = {
  "@global": {
    html: {
      backgroundColor: "#481e50"
    },
    body: {
      margin: 0,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh"
    },
    h1: {
      fontFamily: "Baloo Bhai",
      fontSize: "66px",
      marginBottom: "2px"
    },
    p: {
      fontFamily: "Lato"
    },
    small: {
      fontFamily: "Lato"
    },
    input: {
      padding: "20px",
      borderRadius: "2px",
      border: "1px",
      width: "35%"
    }
  }
};

export default injectSheet(styles)(App);
