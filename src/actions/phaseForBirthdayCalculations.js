import { getGeoLocationSuccess } from "./currentPhaseCalculations";

export const GET_PHASE_FOR_BIRTHDAY_REQUEST = "GET_PHASE_FOR_BIRTHDAY_REQUEST";
export const GET_PHASE_FOR_BIRTHDAY_SUCCESS = "GET_PHASE_FOR_BIRTHDAY_SUCCESS";
export const GET_PHASE_FOR_BIRTHDAY_FAILURE = "GET_PHASE_FOR_BIRTHDAY_FAILURE";

export function getPhaseForBirthdaySuccess(body) {
  return {
    type: GET_PHASE_FOR_BIRTHDAY_SUCCESS,
    body
  };
}

export function getPhaseForBirthdayFailure(error) {
  return {
    type: GET_PHASE_FOR_BIRTHDAY_FAILURE,
    error
  };
}

export function getPhaseForBirthdayRequest(date, position) {
  return dispatch => {
    dispatch({
      type: GET_PHASE_FOR_BIRTHDAY_REQUEST,
      date,
      position
    });
    return fetch(
      `https://api.usno.navy.mil/rstt/oneday?date=${date}&coords=${
        position.latitude
      },${position.longitude}`
    )
      .then(res => res.json())
      .then(body => dispatch(getPhaseForBirthdaySuccess(body)))
      .catch(ex => dispatch(getPhaseForBirthdayFailure(ex)));
  };
}

export function getPhaseForBirthday(date) {
  return dispatch => {
    const { geolocation } = navigator;
    return geolocation.getCurrentPosition(position => {
      const { coords } = position;
      const formattedPosition = {
        latitude: coords.latitude,
        longitude: coords.longitude
      };
      dispatch(getGeoLocationSuccess(formattedPosition));
      dispatch(getPhaseForBirthdayRequest(date, formattedPosition));
    });
  };
}
