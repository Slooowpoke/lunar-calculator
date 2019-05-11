import lunarCalculations from "../../reducers/lunarCalculations";
import { GET_NEXT_PHASE_SUCCESS } from "../../actions/nextPhaseCalculations";

const initialStateMock = {
  nextLunarPhase: null,
  currentLunarPhase: null,
  phaseForCurrentLocation: null,
  ageInLunarYears: null
};

describe("lunar calculations reducer", () => {
  it("should return the initial state", () => {
    expect(lunarCalculations(undefined, {})).toEqual(initialStateMock);
  });

  it("should handle GET_NEXT_PHASE_SUCCESS", () => {
    const action = {
      type: GET_NEXT_PHASE_SUCCESS,
      body: {
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
      }
    };

    expect(lunarCalculations(initialStateMock, action)).toEqual({
      ...initialStateMock,
      nextLunarPhase: action.body.phasedata[0]
    });
  });
});
