import nock from "nock";
import { uploadFile } from "./apiService";

const API_BASE_URL = "http://localhost:8080";

describe.only("uploadFile", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("should return a success response when valid content is provided", async () => {
    const mockResponse = { result: "Simulation successful" };

    nock(API_BASE_URL)
      .post("/api/simulate", { content: "C - 3 - 3\nA - Lara - 1 - 1 - N - AAG" })
      .reply(200, mockResponse);

    const result = await uploadFile("C - 3 - 3\nA - Lara - 1 - 1 - N - AAG");

    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when the API returns a 400 response", async () => {
    const mockError = { error: "Content is required" };

    nock(API_BASE_URL)
      .post("/api/simulate", { content: "TEST"})
      .reply(400, mockError);

    await expect(uploadFile("TEST")).rejects.toThrow("Request failed with status code 400");
  });

  it("should throw an error when the API returns a 500 response", async () => {
    const mockError = { error: "Internal server error" };

    nock(API_BASE_URL)
      .post("/api/simulate", { content: "C - 3 - 3\nA - Lara - 1 - 1 - N - AAG" })
      .reply(500, mockError);

    await expect(uploadFile("C - 3 - 3\nA - Lara - 1 - 1 - N - AAG")).rejects.toThrow(
      "Request failed with status code 500"
    );
  });
});
