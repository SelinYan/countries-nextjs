import countries from "../services/countries";

test("getAll returns data from the API", async () => {
  //call the function
  const data = await countries.getAll();
  //check that the data is an array (since the API returns an array of countries)
  expect(Array.isArray(data)).toBe(true);

  //check that each item in the array has the properties we expect
  data.forEach((country) => {
    expect(country).toHaveProperty("name");
    expect(country).toHaveProperty("population");
    expect(country).toHaveProperty("area");
  });
});
