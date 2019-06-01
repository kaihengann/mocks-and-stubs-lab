const generateQueue = require("../src/queueService");
const math = require("mathjs");

const mockedRandomInt = jest.spyOn(math, "randomInt");
beforeEach(() => {
  jest.resetAllMocks();
});

describe("Test generateQueue", () => {
  it("should return [3, 3, 3] when randomInteger and number are both positive", () => {
    mockedRandomInt.mockImplementation(() => 3);
    expect(generateQueue()).toEqual([3, 3, 3]);
  });
  it("should return [-20, -20, -20] when randomInteger is positive and number is negative", () => {
    mockedRandomInt.mockImplementation(() => -20);
    mockedRandomInt.mockImplementationOnce(() => 3);
    expect(generateQueue()).toEqual([-20, -20, -20]);
  });
  it("should call math.randomInt twice when randomInteger and number are both 1", () => {
    mockedRandomInt.mockImplementation(() => 1);
    expect(generateQueue()).toEqual([1]);
    expect(mockedRandomInt).toBeCalledTimes(2);
  });
  it;
});
