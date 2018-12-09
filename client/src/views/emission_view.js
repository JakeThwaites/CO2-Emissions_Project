const PubSub = require('../helpers/pub_sub.js');

const EmissionView = function(container) {
  this.container = container;
};

EmissionView.prototype.render = function (emissions) {
  const emissionContainer = document.querySelector('#graph-container');

  emissions.forEach((emission) => {
    emissionContainer.category.push( emission.type)
    emissionContainer.value.push( emission.value )
  })
};

module.exports = EmissionView;
