const Emissions = require('../models/emissions.js');

const EmissionsInfoView = function () {

};

EmissionsInfoView.prototype.listenForDietButton = function (emissionsInstance, buttonLink) {
  const dietButton = document.querySelector(buttonLink);
  dietButton.addEventListener( 'click', (event) => {
    const emissions = emissionsInstance.calculateEmissionsByType("diet");
    const dietInfoParagraph = this.dietEmissionsComparison(emissions, 30);
    this.createParagraph('.more-info-view', dietInfoParagraph);
  })
};

  EmissionsInfoView.prototype.listenForTransportButton = function (emissionsInstance, buttonLink) {
    const transportButton = document.querySelector(buttonLink);
    transportButton.addEventListener('click', (event) => {
      const emissions = emissionsInstance.calculateTransportEmissions();
      const transportInfoParagraph = this.transportEmissionsComparison(emissions, 50);
      this.createParagraph('.more-info-view', transportInfoParagraph);
    })
  };

  EmissionsInfoView.prototype.listenForHouseholdButton = function (emissionsInstance, buttonLink) {
    const dietButton = document.querySelector(buttonLink);
    dietButton.addEventListener( 'click', (event) => {
      const emissions = emissionsInstance.calculateEmissionsByType("household");
      const householdInfoParagraph = this.householdEmissionsComparison(emissions, 44);
      this.createParagraph('.more-info-view', householdInfoParagraph);
    })
  };

  EmissionsInfoView.prototype.householdEmissionsComparison = function (totalEmissions, comparison) {
    if (totalEmissions.value > comparison) {
      return "Your household emissions are higher than average. Stop eating meat!"
    } else {
      return "Your household emissions are below average. Good job!"
    };
  };

  EmissionsInfoView.prototype.dietEmissionsComparison = function (totalEmissions, comparison) {
    if (totalEmissions.value > comparison) {
      return "Your diet emissions are higher than average. Stop eating meat!"
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
