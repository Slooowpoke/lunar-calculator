import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "./ui/Button";

const CurrentPhase = ({ phase, percentage, fetchCurrentPhaseForLocation }) => {
  if (phase) {
    return <p>{`The current phase is ${phase} and is at ${percentage}`}</p>;
  }
  return (
    <Fragment>
      <Button onClick={fetchCurrentPhaseForLocation} type="button">
        Click to get phase for your current location
      </Button>
    </Fragment>
  );
};

CurrentPhase.propTypes = {
  phase: PropTypes.string,
  percentage: PropTypes.string,
  fetchCurrentPhaseForLocation: PropTypes.func.isRequired
};

CurrentPhase.defaultProps = {
  phase: false,
  percentage: ""
};

export default CurrentPhase;
