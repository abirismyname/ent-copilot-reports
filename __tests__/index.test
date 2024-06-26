import run from "../src/index";
import * as core from "@actions/core";
import * as github from "@actions/github";
import axios from "axios";
import fs from "fs";
import Papa from "papaparse";

jest.mock("@actions/core");
jest.mock("@actions/github");
jest.mock("axios");
jest.mock("fs");
jest.mock("papaparse");

describe("run function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch data and generate a CSV file", async () => {
    const mockData = { data: [{ id: 1, name: "Test" }] };
    const mockCsv = "id,name\n1,Test\n";
    const token = "test-token";
    const entName = "test-ent";
    const filePath = "/path/to/file.csv";

    core.getInput.mockImplementation((inputName) => {
      switch (inputName) {
        case "token":
          return token;
        case "ent_name":
          return entName;
        case "file_path":
          return filePath;
        default:
          return "";
      }
    });

    axios.get.mockResolvedValue(mockData);
    Papa.unparse.mockReturnValue(mockCsv);

    await run();

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.github.com/enterprises/${entName}/copilot/billing/seats`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      },
    );
    expect(Papa.unparse).toHaveBeenCalledWith(mockData.data);
    expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, mockCsv);
    expect(core.setOutput).toHaveBeenCalledWith("csv_path", filePath);
  });

  it("should handle undefined fetched data", async () => {
    axios.get.mockResolvedValue({});

    await run();

    expect(core.setFailed).toHaveBeenCalledWith(
      "Error: Fetched data is undefined. Cannot generate CSV.",
    );
  });

  it("should handle error while parsing data to CSV", async () => {
    const error = new Error("Test error");
    axios.get.mockResolvedValue({ data: [{ id: 1, name: "Test" }] });
    Papa.unparse.mockImplementation(() => {
      throw error;
    });

    await run();

    expect(core.setFailed).toHaveBeenCalledWith(
      `Error parsing data to CSV: ${error.message}`,
    );
  });

  it("should handle action failure", async () => {
    const error = new Error("Test error");
    axios.get.mockImplementation(() => {
      throw error;
    });

    await run();

    expect(core.setFailed).toHaveBeenCalledWith(
      `Action failed with error: ${error}`,
    );
  });
});
