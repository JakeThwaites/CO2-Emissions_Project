const EmissionFormView = require('./views/emission_form_view.js');
const Emission = require('./models/emissions.js');

document.addEventListener('DOMContentLoaded', () => {
  const emissionsForm = document.querySelector('#form');
  const emissionFormView = new EmissionFormView(emissionsForm);

  emissionFormView.bindEvents();

  const emission = new Emission();
  emission.bindEvents();

  const url = "http://localhost:3000"
});

// test asdf
