import { GET_NEXT_PHASE_SUCCESS } from "../actions/nextPhaseCalculations";
import { GET_CURRENT_LUNAR_PHASE_SUCCESS } from "../actions/currentPhaseCalculations";

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
    case GET_CURRENT_LUNAR_PHASE_SUCCESS:
      if(action.body.curphase){
        // If we are in a transition phase, apply the curphase
        return {
          ...state,
          phaseForCurrentLocation: {
            phase: action.body.curphase,
            percentage: action.body.fracillum
          }
        };

      }else{
        // Otherwise apply the closestphase from the API
        return {
          ...state,
          phaseForCurrentLocation: {
            phase: action.body.closestphase.phase,
            percentage: "100%"
          }
        };
      }

    default:
      return state;
  }
};

export default lunarCalculations;
