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
      return "Larger households typically have much greater CO2 emissions. Adding solar panels to your roof is a great way to improve your home's emissions. You can also try to choose more energy efficient appliances around your house. More information on reducing your carbon footprint can be found here https://cotap.org/reduce-carbon-footprint/"
    } else {
      return "Smaller houses tend to have lower CO2 emissions than larger ones. Don't forget to turn off lights you're not using and when you leave the room. More information on reducing your carbon footprint can be found here https://cotap.org/reduce-carbon-footprint/ "
    };
  };

  EmissionsInfoView.prototype.dietEmissionsComparison = function (totalEmissions, comparison) {
    if (totalEmissions.value > comparison) {
      return "Your diet emissions are higher than average. Animal agriculture is responsible for roughly 50% of all man-made emissions. The easiest way to lower your CO2 is to lower the amount of meat and animal products you eat. You can find more information on the impact of animal agriculture on the enivornment here: http://www.greeneatz.com/foods-carbon-footprint.html"
    } else {
      return "Have a lower meat intake is a great way to reduce your carbon footprint. Animal agriculture is responsible for roughly 50% of all man-made emissions. You can also try to make sure you eat organic, locally sourced foods. More information on the impact of animal agriculture on the enivornment here: http://www.greeneatz.com/foods-carbon-footprint.html"
    };
  };

  EmissionsInfoView.prototype.transportEmissionsComparison = function (totalEmissions, comparison) {
    if (totalEmissions.value > comparison) {
      return "Your transport emissions are higher than average. You could consider making more use of public transport and walking where possible. Electric cars can also greatly reduce your CO2 emissions. More information reducing your carbon footprint can be found here: https://cotap.org/reduce-carbon-footprint/"
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
