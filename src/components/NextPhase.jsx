import React from "react";
import PropTypes from "prop-types";

const NextPhase = ({ nextPhaseDate, nextPhaseType }) => {
  return (
    <p>
      {`The next lunar phase is ${nextPhaseDate}, it will be a ${nextPhaseType}`}
    </p>
  );
};

NextPhase.propTypes = {
  nextPhaseDate: PropTypes.string,
  nextPhaseType: PropTypes.string
};

NextPhase.defaultProps = {
  nextPhaseDate: "",
  nextPhaseType: ""
};

export default NextPhase;
