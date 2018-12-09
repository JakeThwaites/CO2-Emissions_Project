use co2_input;
db.dropDatabase();

db.emissions.insertMany([
  {
    type: "Transport",
    name: "Car",
    emissions: 20
  },
  {
    type: "Transport",
    name: "Aeroplane",
    emissions: 20
  },
  {
    type: "Transport",
    name: "Bus",
    emissions: 20
  },
  {
    type: "Diet",
    emissions: 10
  },
  {
    type: "Household",
    emissions: 15
  }
]);
