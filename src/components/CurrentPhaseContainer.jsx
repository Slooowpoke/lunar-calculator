import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentLunarPhase } from "../actions/currentPhaseCalculations";
import CurrentPhase from "./CurrentPhase";
import FormatDateToAmericanDateString from "../utils/FormatDateToAmericanDateString";

class CurrentPhaseContainer extends React.Component {
  constructor(props) {
    super(props);

    this.fetchCurrentPhaseForLocation = this.fetchCurrentPhaseForLocation.bind(
      this
    );
  }

  fetchCurrentPhaseForLocation() {
    const { props } = this;

    const date = new Date();
    props.loadCurrentLunarPhase(FormatDateToAmericanDateString(date));
  }

  render() {
    const { phaseForCurrentLocation } = this.props;

    return (
      <CurrentPhase
        {...phaseForCurrentLocation}
        fetchCurrentPhaseForLocation={this.fetchCurrentPhaseForLocation}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCurrentLunarPhase: date => {
      dispatch(getCurrentLunarPhase(date));
    }
  };
};

const mapStateToProps = state => {
  return {
    phaseForCurrentLocation: state.lunarCalculations.phaseForCurrentLocation
  };
};

CurrentPhaseContainer.propTypes = {
  phaseForCurrentLocation: PropTypes.shape({
    phase: PropTypes.string,
    percentage: PropTypes.string
  })
};

CurrentPhaseContainer.defaultProps = {
  phaseForCurrentLocation: {
    phase: "",
    percentage: ""
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentPhaseContainer);
