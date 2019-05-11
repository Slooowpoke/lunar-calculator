import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NextPhase from "./NextPhase";
import { getNextLunarPhase } from "../actions/nextPhaseCalculations";

class NextPhaseContainer extends React.Component {
  componentDidMount() {
    const { props } = this;

    const date = new Date();
    const formattedDateString = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    props.loadNextLunarPhase(formattedDateString);
  }

  render() {
    const { nextLunarPhase } = this.props;

    return <NextPhase {...nextLunarPhase} />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadNextLunarPhase: date => {
      dispatch(getNextLunarPhase(date));
    }
  };
};

const mapStateToProps = state => {
  return {
    nextLunarPhase: state.lunarCalculations.nextLunarPhase
  };
};

NextPhaseContainer.propTypes = {
  nextLunarPhase: PropTypes.shape({
    phase: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string
  })
};

NextPhaseContainer.defaultProps = {
  nextLunarPhase: {
    phase: "",
    date: "",
    time: ""
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NextPhaseContainer);
