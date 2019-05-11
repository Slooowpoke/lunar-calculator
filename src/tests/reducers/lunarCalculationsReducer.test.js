import lunarCalculations from "../../reducers/lunarCalculations";

describe("lunar calculations reducer", () => {
  it("should return the initial state", () => {
    expect(lunarCalculations(undefined, {})).toEqual({
      nextLunarPhase: null,
      currentLunarPhase: null,
      phaseForCurrentLocation: null,
      ageInLunarYears: null,
    });
  });
});
