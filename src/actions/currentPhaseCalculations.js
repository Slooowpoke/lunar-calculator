export const GET_GEO_LOCATION_SUCCESS = "GET_GEO_LOCATION_SUCCESS";

export const GET_CURRENT_LUNAR_PHASE_REQUEST =
  "GET_CURRENT_LUNAR_PHASE_REQUEST";
export const GET_CURRENT_LUNAR_PHASE_SUCCESS =
  "GET_CURRENT_LUNAR_PHASE_SUCCESS";
export const GET_CURRENT_LUNAR_PHASE_FAILURE =
  "GET_CURRENT_LUNAR_PHASE_FAILURE";

export function getGeoLocationSuccess(position) {
  return {
    type: GET_GEO_LOCATION_SUCCESS,
    position
  };
}

export function getCurrentLunarPhaseFailure(error) {
  return {
    type: GET_CURRENT_LUNAR_PHASE_FAILURE,
    error
  };
}

export function getCurrentLunarPhaseSuccess(body) {
  return {
    type: GET_CURRENT_LUNAR_PHASE_SUCCESS,
    body
  };
}

export function getCurrentLunarPhaseRequest(date, position) {
  return dispatch => {
    dispatch({
      type: GET_CURRENT_LUNAR_PHASE_REQUEST,
      date,
      position
    });
    return fetch(
      `https://api.usno.navy.mil/rstt/oneday?date=${date}&coords=
      ${position.latitude},
      ${position.longitude}`
    )
      .then(res => res.json())
      .then(body => dispatch(getCurrentLunarPhaseSuccess(body)))
      .catch(ex => dispatch(getCurrentLunarPhaseFailure(ex)));
  };
}

export function getCurrentLunarPhase(date) {
  return dispatch => {
    const { geolocation } = navigator;
    return geolocation.getCurrentPosition(position => {
      const { coords } = position;
      dispatch(getGeoLocationSuccess(coords));
      dispatch(getCurrentLunarPhaseRequest(date, coords));
    });
  };
}
