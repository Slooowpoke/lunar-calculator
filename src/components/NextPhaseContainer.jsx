import React from "react";
import { connect } from "react-redux";
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
    return <NextPhase />;
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
    nextLunarPhase: state.nextLunarPhase
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NextPhaseContainer);
