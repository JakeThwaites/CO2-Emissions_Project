const EmissionFormView = require('./views/emission_form_view.js');
const Emission = require('./models/emissions.js');
const EmissionView = require('./views/emission_view.js');


document.addEventListener('DOMContentLoaded', () => {
  const emissionsForm = document.querySelector('#form');
  const emissionFormView = new EmissionFormView(emissionsForm);

  emissionFormView.bindEvents();

  const emission = new Emission();
  emission.bindEvents();

  const graphContainer = document.querySelector('#graph-container');
  const emissionView = new EmissionView(graphContainer);
  emissionView.bindEvents();



  const url = "http://localhost:3000"
});

// test asdf
