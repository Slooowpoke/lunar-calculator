import lunarCalculations from "../../reducers/lunarCalculations";
import { GET_NEXT_PHASE_SUCCESS } from "../../actions/nextPhaseCalculations";

const initialStateMock = {
  nextLunarPhase: null,
  currentLunarPhase: null,
  phaseForCurrentLocation: null,
  ageInLunarYears: null,
};

describe("lunar calculations reducer", () => {
  it("should return the initial state", () => {
    expect(lunarCalculations(undefined, {})).toEqual(initialStateMock);
  });
});
