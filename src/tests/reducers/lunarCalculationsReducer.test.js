import lunarCalculations from "../../reducers/lunarCalculations";
import { GET_NEXT_PHASE_SUCCESS } from "../../actions/nextPhaseCalculations";
import { GET_CURRENT_LUNAR_PHASE_SUCCESS } from "../../actions/currentPhaseCalculations";
import { GET_PHASE_FOR_BIRTHDAY_SUCCESS } from "../../actions/phaseForBirthdayCalculations";

const initialStateMock = {
  nextLunarPhase: null,
  phaseForCurrentLocation: null,
  phaseForBirthday: null
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

  it("should handle GET_CURRENT_PHASE_SUCCESS and apply curphase if exists", () => {
    const action = {
      type: GET_CURRENT_LUNAR_PHASE_SUCCESS,
      body: {
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
      }
    };

    expect(lunarCalculations(initialStateMock, action)).toEqual({
      ...initialStateMock,
      phaseForCurrentLocation: {
        phase: action.body.curphase,
        percentage: action.body.fracillum
      }
    });
  });

  it("should handle GET_CURRENT_PHASE_SUCCESS and apply closestphase if curphase does not exist", () => {
    const action = {
      type: GET_CURRENT_LUNAR_PHASE_SUCCESS,
      body: {
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
        }
      }
    };

    expect(lunarCalculations(initialStateMock, action)).toEqual({
      ...initialStateMock,
      phaseForCurrentLocation: {
        phase: action.body.closestphase.phase,
        percentage: "100%"
      }
    });
  });

  it("should handle GET_PHASE_FOR_BIRTHDAY_SUCCESS and apply curphase if exists", () => {
    const action = {
      type: GET_PHASE_FOR_BIRTHDAY_SUCCESS,
      body: {
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
      }
    };

    expect(lunarCalculations(initialStateMock, action)).toEqual({
      ...initialStateMock,
      phaseForBirthday: {
        phase: action.body.curphase,
        percentage: action.body.fracillum
      }
    });
  });

  it("should handle GET_PHASE_FOR_BIRTHDAY_SUCCESS and apply closestphase if curphase does not exist", () => {
    const action = {
      type: GET_PHASE_FOR_BIRTHDAY_SUCCESS,
      body: {
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
        }
      }
    };

    expect(lunarCalculations(initialStateMock, action)).toEqual({
      ...initialStateMock,
      phaseForBirthday: {
        phase: action.body.closestphase.phase,
        percentage: "100%"
      }
    });
  });
});
