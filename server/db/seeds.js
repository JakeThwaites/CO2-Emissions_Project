use co2_input;
db.dropDatabase();

db.emissions.insertMany([
  {
    name: "Transport",
    emissions: 20
  },
  {
    name: "Diet",
    emissions: 10
  },
  {
    name: "Household",
    emissions: 15
  }
]);
