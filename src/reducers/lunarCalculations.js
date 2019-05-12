import { GET_NEXT_PHASE_SUCCESS } from "../actions/nextPhaseCalculations";

const initialState = {
  nextLunarPhase: null,
  phaseForCurrentLocation: null,
  ageInLunarYears: null
};

const lunarCalculations = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEXT_PHASE_SUCCESS:
      if (
        action.body.phasedata === undefined ||
        action.body.phasedata.length === 0
      ) {
        return state;
      }

      return {
        ...state,
        nextLunarPhase: action.body.phasedata[0]
      };
    default:
      return state;
  }
};

export default lunarCalculations;
