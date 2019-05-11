import React from "react";
import PropTypes from "prop-types";

const NextPhase = ({ date, phase }) => {
  return <p>{`The next lunar phase is ${date}, it will be the ${phase}`}</p>;
};

NextPhase.propTypes = {
  date: PropTypes.string,
  phase: PropTypes.string
};

NextPhase.defaultProps = {
  date: "",
  phase: ""
};

export default NextPhase;
