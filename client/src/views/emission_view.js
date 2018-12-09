const PubSub = require('../helpers/pub_sub.js');
const EmissionsGraphView = require('./emissions_graph_view.js');

const EmissionView = function(container) {
  this.container = container;
};

EmissionView.prototype.bindEvents = function () {
  PubSub.subscribe("Emissions:emissions-view", (event) => {
    this.render(event.detail);
  })
};

EmissionView.prototype.render = function (emissions) {
  const graphView = new EmissionsGraphView();
  this.container.appendChild(graphView);
  graphView.getData()
};

module.exports = EmissionView;
