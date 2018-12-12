const Emissions = require('../models/emissions.js');
const PubSub = require('../helpers/pub_sub.js');
const EmissionsInfoView = function () {

};

EmissionsInfoView.prototype.bindEvents = function (emission) {
  PubSub.subscribe('EmissionView:graph-loaded', (event) => {
    this.listenForDietButton(emission);
    this.listenForHouseholdButton(emission);
    this.listenForTransportButton(emission);
  })
};

EmissionsInfoView.prototype.listenForDietButton = function (emissionsInstance) {
  const dietButton = document.querySelector('#diet-info-button');
  dietButton.addEventListener( 'click', (event) => {
    const emissions = emissionsInstance.calculateEmissionsByType("diet");
    const dietInfoParagraph = this.dietEmissionsComparison(emissions, 30);
    this.createParagraph('.more-info-view', dietInfoParagraph);
  })
};
  EmissionsInfoView.prototype.listenForTransportButton = function (emissionsInstance) {
    const transportButton = document.querySelector('#transport-info-button');
    transportButton.addEventListener('click', (event) => {
      const emissions = emissionsInstance.calculateTransportEmissions();
      const transportInfoParagraph = this.transportEmissionsComparison(emissions, 50);
      this.createParagraph('.more-info-view', transportInfoParagraph);
    })
  };
  EmissionsInfoView.prototype.listenForHouseholdButton = function (emissionsInstance, buttonLink) {
    const dietButton = document.querySelector('#household-info-button');
    dietButton.addEventListener( 'click', (event) => {
      const emissions = emissionsInstance.calculateEmissionsByType("household");
      const householdInfoParagraph = this.householdEmissionsComparison(emissions, 44);
      this.createParagraph('.more-info-view', householdInfoParagraph);
    })
  };

  EmissionsInfoView.prototype.householdEmissionsComparison = function (totalEmissions, comparison) {
    if (totalEmissions.value > comparison) {
      return "Your household emissions are higher than average. You can reduce the CO2 from your household by "
    } else {
      return "Your household emissions are below average. Good job!"
    };
  };

  EmissionsInfoView.prototype.dietEmissionsComparison = function (totalEmissions, comparison) {
    if (totalEmissions.value > comparison) {
      return "Your diet emissions are higher than average. Animal agriculture is responsible for roughly 50% of all man-made emissions. The easiest way to lower your CO2 is to lower the amount of meat and animal products you eat. You can find more information on the impact of animal agriculture on the enivornment here "
    } else {
      return "Your diet emissions are below average. Good job!"
    };
  };

  EmissionsInfoView.prototype.transportEmissionsComparison = function (totalEmissions, comparison) {
    if (totalEmissions.value > comparison) {
      return "Your transport emissions are higher than average. Stop eating meat!"
    } else {
      return "Your transport emissions are below average. Good job!"
    };
  };

  EmissionsInfoView.prototype.createParagraph = function (containerDiv, infoParagraph) {
    const container = document.querySelector(containerDiv);
    const newParagraph = document.createElement('p');
    container.innerHTML = "";
    newParagraph.textContent = infoParagraph;
    container.appendChild(newParagraph);
  };

module.exports = EmissionsInfoView;
