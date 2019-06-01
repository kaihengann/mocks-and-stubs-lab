const { generateQueue } = require("../src/queueService");
const math = require("mathjs");

const spyRandomInt = jest.spyOn(math, "randomInt");

beforeEach(() => jest.resetAllMocks());

describe("Test generateQueue", () => {
  it("should return array with positive numbers when randomInteger and number are both positive", () => {
    spyRandomInt.mockImplementation(() => 3);
    expect(generateQueue()).toEqual([3, 3, 3]);
  });
  it("should return array with negative numbers when randomInteger is positive and number is negative", () => {
    spyRandomInt.mockImplementation(() => -20);
    spyRandomInt.mockImplementationOnce(() => 3);
    expect(generateQueue()).toEqual([-20, -20, -20]);
  });
  it("should call math.randomInt twice when randomInteger and number are both 1", () => {
    spyRandomInt.mockImplementation(() => 1);
    expect(generateQueue()).toEqual([1]);
    expect(spyRandomInt).toBeCalledTimes(2);
  });
});
