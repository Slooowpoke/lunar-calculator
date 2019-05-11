import "cross-fetch/polyfill";

export const GET_NEXT_PHASE_REQUEST = "GET_NEXT_PHASE_REQUEST";
export const GET_NEXT_PHASE_SUCCESS = "GET_NEXT_PHASE_SUCCESS";
export const GET_NEXT_PHASE_FAILURE = "GET_NEXT_PHASE_SUCCESS";

export function getNextLunarPhaseRequest(date) {
  return {
    type: GET_NEXT_PHASE_REQUEST,
    date
  };
}

export function getNextLunarPhaseSuccess(body) {
  return {
    type: GET_NEXT_PHASE_SUCCESS,
    body
  };
}

export function getNextLunarPhaseFailure(error) {
  return {
    type: GET_NEXT_PHASE_FAILURE,
    error
  };
}

export function getNextLunarPhase(date) {
  return dispatch => {
    dispatch(getNextLunarPhaseRequest());
    return fetch(`https://api.usno.navy.mil/moon/phase?date=${date}&nump=1`)
      .then(res => res.json())
      .then(body => dispatch(getNextLunarPhaseSuccess(body)))
      .catch(ex => dispatch(getNextLunarPhaseFailure(ex)));
  };
}
