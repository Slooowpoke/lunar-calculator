import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import {
  GET_CURRENT_LUNAR_PHASE_REQUEST,
  GET_CURRENT_LUNAR_PHASE_SUCCESS,
  GET_GEO_LOCATION_SUCCESS,
  getCurrentLunarPhase,
  getCurrentLunarPhaseRequest
} from "../../actions/currentPhaseCalculations";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("current lunar phase for location actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates GET_LUNAR_PHASE_DATA_REQUEST after fetching geolocation", () => {
    const mockDate = "05/12/2019";

    const expectedActions = [
      {
        type: GET_GEO_LOCATION_SUCCESS,
        position: { latitude: 10, longitude: 10 }
      },
      {
        type: GET_CURRENT_LUNAR_PHASE_REQUEST,
        date: mockDate,
        position: { latitude: 10, longitude: 10 }
      }
    ];

    const store = mockStore({ currentLunarPhase: {} });

    return store.dispatch(getCurrentLunarPhase(mockDate)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates GET_CURRENT_LUNAR_PHASE_SUCCESS after request", () => {
    const fetchResultBody = {
      error: false,
      apiversion: "2.2.0",
      year: 2019,
      month: 5,
      day: 11,
      dayofweek: "Saturday",
      datechanged: false,
      lon: -0.295416,
      lat: 51.404863,
      tz: 0,
      sundata: [
        {
          phen: "BC",
          time: "03:36"
        },
        {
          phen: "R",
          time: "04:17"
        },
        {
          phen: "U",
          time: "11:58"
        },
        {
          phen: "S",
          time: "19:40"
        },
        {
          phen: "EC",
          time: "20:20"
        }
      ],
      moondata: [
        {
          phen: "S",
          time: "01:14"
        },
        {
          phen: "R",
          time: "10:05"
        },
        {
          phen: "U",
          time: "18:04"
        }
      ],
      nextmoondata: [
        {
          phen: "S",
          time: "01:50"
        }
      ],
      closestphase: {
        phase: "First Quarter",
        date: "May 12, 2019",
        time: "01:12"
      },
      fracillum: "44%",
      curphase: "Waxing Crescent"
    };

    const mockDate = "05/11/2019";
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
        type: GET_CURRENT_LUNAR_PHASE_REQUEST,
        date: mockDate,
        position: mockPosition
      },
      { type: GET_CURRENT_LUNAR_PHASE_SUCCESS, body: fetchResultBody }
    ];

    const store = mockStore({ nextPhaseData: {} });

    return store
      .dispatch(getCurrentLunarPhaseRequest(mockDate, mockPosition))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
