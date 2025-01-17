import { configureStore } from "@reduxjs/toolkit";
import countriesSlice, { initializeCountries } from "../store/countriesSlice";
import countriesService from "../services/countries";

jest.mock("../services/countries"); //mock

describe("countriesSlice tests", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        countries: countriesSlice,
      },
    });
  });

  it("should handle the initalState", () => {
    const { countries, isLoading } = store.getState().countries;
    // initialState: {
    //     countries: [],
    //     isLoading: true,
    //   },
    expect(countries).toEqual([]);
    expect(isLoading).toBe(true);
  });

  it("should handle getCountries", () => {
    store.dispatch({
      type: "countries/getCountries",
      payload: ["Country 1", "Country 2"],
    });
    expect(store.getState().countries.countries).toEqual([
      "Country 1",
      "Country 2",
    ]);
    expect(store.getState().countries.isLoading).toEqual(false);
  });

  it("Should handle initializeCountries", async () => {
    const mockCountries = ["Country 1", "Country 2"];

    countriesService.getAll.mockResolvedValue(mockCountries);

    await store.dispatch(initializeCountries());

    expect(store.getState().countries.countries).toEqual(mockCountries);
    expect(store.getState().countries.isLoading).toEqual(false);
  });
});
