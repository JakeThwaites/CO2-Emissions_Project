const PubSub = require('../helpers/pub_sub.js');
const EmissionsGraphView = require('./emissions_graph_view.js');

const EmissionView = function(container) {
  this.container = container;
};

EmissionView.prototype.render = function (emissions) {
  const graphView = new EmissionsGraphView();
  graphView.getData()
};

module.exports = EmissionView;
