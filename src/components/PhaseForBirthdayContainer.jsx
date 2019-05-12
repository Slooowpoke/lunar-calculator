import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FormatDateToAmericanDateString from "../utils/FormatDateToAmericanDateString";
import { getPhaseForBirthday, resetPhaseForBirthday } from "../actions/phaseForBirthdayCalculations";
import PhaseForBirthday from "./PhaseForBirthday";

class PhaseForBirthdayContainer extends React.Component {
  componentDidMount() {
    this.fetchPhaseForDateOnLocation = this.fetchPhaseForDateOnLocation.bind(
      this
    );
  }

  fetchPhaseForDateOnLocation = (inputDate) => {
    const { props } = this;

    const date = new Date(inputDate);
    props.loadPhaseForBirthday(FormatDateToAmericanDateString(date));
  }


  render() {
    const { props } = this;
    const { phaseForBirthday } = props;

    return (
      <PhaseForBirthday
        {...phaseForBirthday}
        fetchPhaseForDateOnLocation={this.fetchPhaseForDateOnLocation}
        resetPhaseForBirthday={props.resetPhaseForBirthday}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPhaseForBirthday: date => {
      dispatch(getPhaseForBirthday(date));
    },
    resetPhaseForBirthday: () => {
      dispatch(resetPhaseForBirthday());
    }
  };
};

const mapStateToProps = state => {
  return {
    phaseForBirthday: state.lunarCalculations.phaseForBirthday
  };
};

PhaseForBirthdayContainer.propTypes = {
  phaseForBirthday: PropTypes.shape({
    phase: PropTypes.string,
    percentage: PropTypes.string
  })
};

PhaseForBirthdayContainer.defaultProps = {
  phaseForBirthday: {
    phase: "",
    percentage: ""
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhaseForBirthdayContainer);
