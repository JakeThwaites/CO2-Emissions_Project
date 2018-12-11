const EmissionFormView = require('./views/emission_form_view.js');
const Emission = require('./models/emissions.js');
const EmissionView = require('./views/emission_view.js');
const EmissionsInfoView = require('./views/emissions_info_view.js');


document.addEventListener('DOMContentLoaded', () => {
  const emissionsForm = document.querySelector('#form');
  const emissionFormView = new EmissionFormView(emissionsForm);

  emissionFormView.bindEvents();

  const emission = new Emission();
  emission.bindEvents();

  const graphContainer = document.querySelector('#outer-container');
  const emissionView = new EmissionView(graphContainer);
  emissionView.bindEvents();

  const emissionsInfoView = new EmissionsInfoView();
  emissionsInfoView.listenForDietButton(emission, '#diet-info');
  emissionsInfoView.listenForTransportButton(emission, '#transport-info');
  emissionsInfoView.listenForHouseholdButton(emission, '#household-info');
});
