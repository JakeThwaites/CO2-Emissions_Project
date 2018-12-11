const Emissions = require('../models/emissions.js');

const EmissionsInfoView = function () {

};


EmissionsInfoView.prototype.listenForButtonClick = function (emission) {
  const button = document.querySelector('#more-info');
  const infoParagraph = this.compareEmissions(emission, "transport")
  
  button.addEventListener( 'click', (event) => {
    this.createParagraph('.more-info-view', infoParagraph);
  })
  };

  EmissionsInfoView.prototype.createParagraph = function (containerDiv, infoParagraph) {
    const container = document.querySelector(containerDiv);
    const newParagraph = document.createElement('p');
    container.innerHTML = "";
    newParagraph.textContent = infoParagraph;
    container.appendChild(newParagraph);
  };

  EmissionsInfoView.prototype.compareEmissions = function (totalEmissions, comparison) {
    if (totalEmissions > comparison) {
      return `This is higher than ${comparison}`
    } else {
      return `This is lower than ${comparison}`
    };
  };


module.exports = EmissionsInfoView;
