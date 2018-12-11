const Emissions = require('../models/emissions.js');

const EmissionsInfoView = function () {

};


EmissionsInfoView.prototype.listenForButtonClick = function (emissionsInstance) {
  const button = document.querySelector('#more-info');


  button.addEventListener( 'click', (event) => {
    const emissions = emissionsInstance.calculateEmissionsByType("diet");
    const infoParagraph = this.compareEmissions(emissions, 30);
    this.createParagraph('.more-info-view', infoParagraph);
  })
  };


  EmissionsInfoView.prototype.compareEmissions = function (totalEmissions, comparison) {
    if (totalEmissions.value > comparison) {
      return `This is higher than ${comparison}`
    } else {
      return `This is lower than ${comparison}`
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
