import React, { Fragment } from "react";
import PropTypes from "prop-types";

const CurrentPhase = ({ phase, percentage, fetchCurrentPhaseForLocation }) => {
  if (phase) {
    return <p>{`The current phase is ${phase} and is at ${percentage}`}</p>;
  }
  return (
    <Fragment>
      <small>
        To get the current phase for your location, please click below.
      </small>
      <br />
      <br />
      <button onClick={fetchCurrentPhaseForLocation} type="button">
        Get phase for current location
      </button>
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
