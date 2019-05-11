import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import {
  GET_NEXT_PHASE_REQUEST,
  GET_NEXT_PHASE_SUCCESS,
  getNextLunarPhase
} from "../../actions/nextPhaseCalculations";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("next lunar phase actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates GET_NEXT_LUNAR_PHASE_SUCCESS on successful phase fetch", () => {
    const fetchResultBody = {
      error: false,
      apiversion: "2.2.0",
      year: 2019,
      month: 5,
      day: 13,
      numphases: 1,
      datechanged: false,
      phasedata: [
        {
          phase: "Full Moon",
          date: "2019 May 18",
          time: "21:11"
        }
      ]
    };

    const mockDate = "05/11/2019";

    fetchMock.getOnce(
      `https://api.usno.navy.mil/moon/phase?date=${mockDate}&nump=1`,
      {
        body: fetchResultBody,
        headers: { "content-type": "application/json" }
      }
    );

    const expectedActions = [
      { type: GET_NEXT_PHASE_REQUEST },
      { type: GET_NEXT_PHASE_SUCCESS, body: fetchResultBody }
    ];

    const store = mockStore({ nextPhaseData: {} });

    return store.dispatch(getNextLunarPhase(mockDate)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
