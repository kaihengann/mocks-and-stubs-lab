const processPayments = require("../src/main");
const paymentService = require("../src/paymentService");
const queueService = require("../src/queueService");
const makePayment = paymentService.makePayment;
const refundPayment = paymentService.refundPayment;
const generateQueue = queueService.generateQueue;

jest.mock("../src/queueService");
jest.mock("../src/paymentService");

beforeEach(() => jest.resetAllMocks());

describe("Test processPayments", () => {
  it("should not call makePayment or refundPayment when paymentQueue is empty", () => {
    generateQueue.mockImplementation(() => []);
    expect(processPayments()).toBe(undefined);
    expect(makePayment).toBeCalledTimes(0);
    expect(refundPayment).toBeCalledTimes(0);
  });
  it("should call makePayment when next item in paymentQueue is positive", () => {
    generateQueue.mockImplementation(() => [1]);
    expect(processPayments()).toBe(undefined);
    expect(makePayment).toBeCalledTimes(1);
    expect(refundPayment).toBeCalledTimes(0);
  });
  it("should only call makePayment when all items in paymentQueue is positive", () => {
    generateQueue.mockImplementation(() => [2, 2, 2, 2]);
    expect(processPayments()).toBe(undefined);
    expect(makePayment).toBeCalledTimes(4);
    expect(refundPayment).toBeCalledTimes(0);
  });
  it("should call refundPayment when next item in paymentQueue is negative", () => {
    generateQueue.mockImplementation(() => [-1]);
    expect(processPayments()).toBe(undefined);
    expect(makePayment).toBeCalledTimes(0);
    expect(refundPayment).toBeCalledTimes(1);
  });
  it("should only call refundPayment when next item in paymentQueue is negative", () => {
    generateQueue.mockImplementation(() => [-2, -2, -2, -2]);
    expect(processPayments()).toBe(undefined);
    expect(makePayment).toBeCalledTimes(0);
    expect(refundPayment).toBeCalledTimes(4);
  });
  it("should call makePayment when next item in paymentQueue is zero", () => {
    generateQueue.mockImplementation(() => [0]);
    expect(processPayments()).toBe(undefined);
    expect(makePayment).toBeCalledTimes(1);
    expect(refundPayment).toBeCalledTimes(0);
  });
  it("should call both makePayment and refundPayment when paymentQueue has both positive and negative items", () => {
    generateQueue.mockImplementation(() => [-2, 2, -2, 2]);
    expect(processPayments()).toBe(undefined);
    expect(makePayment).toBeCalledTimes(2);
    expect(refundPayment).toBeCalledTimes(2);
  });
});
