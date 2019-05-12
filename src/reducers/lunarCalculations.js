import { GET_NEXT_PHASE_SUCCESS } from "../actions/nextPhaseCalculations";
import { GET_CURRENT_LUNAR_PHASE_SUCCESS } from "../actions/currentPhaseCalculations";
import { GET_PHASE_FOR_BIRTHDAY_SUCCESS } from "../actions/phaseForBirthdayCalculations";

const initialState = {
  nextLunarPhase: null,
  phaseForCurrentLocation: null,
  phaseForBirthday: null
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
      if (action.body.curphase) {
        // If we are in a transition phase, apply the curphase
        return {
          ...state,
          phaseForCurrentLocation: {
            phase: action.body.curphase,
            percentage: action.body.fracillum
          }
        };
      }
      // Otherwise apply the closestphase from the API
      return {
        ...state,
        phaseForCurrentLocation: {
          phase: action.body.closestphase.phase,
          percentage: "100%"
        }
      };
    case GET_PHASE_FOR_BIRTHDAY_SUCCESS:
      if (action.body.curphase) {
        // If we are in a transition phase, apply the curphase
        return {
          ...state,
          phaseForBirthday: {
            phase: action.body.curphase,
            percentage: action.body.fracillum
          }
        };
      }
      // Otherwise apply the closestphase from the API
      return {
        ...state,
        phaseForBirthday: {
          phase: action.body.closestphase.phase,
          percentage: "100%"
        }
      };
    default:
      return state;
  }
};

export default lunarCalculations;
