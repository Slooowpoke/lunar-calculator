import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { GET_GEO_LOCATION_SUCCESS } from "../../actions/currentPhaseCalculations";
import {
  GET_PHASE_FOR_BIRTHDAY_REQUEST,
  GET_PHASE_FOR_BIRTHDAY_SUCCESS,
  getPhaseForBirthday,
  getPhaseForBirthdayRequest
} from "../../actions/phaseForBirthdayCalculations";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("phase for user's birthday actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates GET_LUNAR_PHASE_DATA_FOR_BIRTHDAY_REQUEST after fetching geolocation", () => {
    const mockDate = "04/01/1995";

    const expectedActions = [
      {
        type: GET_GEO_LOCATION_SUCCESS,
        position: { latitude: 10, longitude: 10 }
      },
      {
        type: GET_PHASE_FOR_BIRTHDAY_REQUEST,
        date: mockDate,
        position: { latitude: 10, longitude: 10 }
      }
    ];

    const store = mockStore({ phaseFor: {} });

    return store.dispatch(getPhaseForBirthday(mockDate)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates GET_PHASE_FOR_BIRTHDAY_SUCCESS after request", () => {
    const fetchResultBody = {
      error: false,
      apiversion: "2.2.0",
      year: 1995,
      month: 4,
      day: 1,
      dayofweek: "Saturday",
      datechanged: false,
      lon: -0.295315,
      lat: 51.404879,
      tz: 0,
      sundata: [
        {
          phen: "BC",
          time: "05:04"
        },
        {
          phen: "R",
          time: "05:38"
        },
        {
          phen: "U",
          time: "12:05"
        },
        {
          phen: "S",
          time: "18:34"
        },
        {
          phen: "EC",
          time: "19:07"
        }
      ],
      moondata: [
        {
          phen: "R",
          time: "06:01"
        },
        {
          phen: "U",
          time: "13:07"
        },
        {
          phen: "S",
          time: "20:23"
        }
      ],
      closestphase: {
        phase: "New Moon",
        date: "March 31, 1995",
        time: "02:09"
      },
      fracillum: "2%",
      curphase: "Waxing Crescent"
    };

    const mockDate = "04/01/1995";
    const mockPosition = { latitude: 10, longitude: 10 };

    fetchMock.getOnce(
      `https://api.usno.navy.mil/rstt/oneday?date=${mockDate}&coords=${
        mockPosition.latitude
      },${mockPosition.longitude}`,
      {
        body: fetchResultBody,
        headers: { "content-type": "application/json" }
      }
    );

    const expectedActions = [
      {
        type: GET_PHASE_FOR_BIRTHDAY_REQUEST,
        date: mockDate,
        position: mockPosition
      },
      { type: GET_PHASE_FOR_BIRTHDAY_SUCCESS, body: fetchResultBody }
    ];

    const store = mockStore({ nextPhaseData: {} });

    return store
      .dispatch(getPhaseForBirthdayRequest(mockDate, mockPosition))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
