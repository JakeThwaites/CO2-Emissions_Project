const PubSub = require('../helpers/pub_sub.js');
const EmissionsGraphView = require('./emissions_graph_view.js');
const Highcharts = require('highcharts');

const EmissionView = function(container) {
  this.container = container;
};

EmissionView.prototype.bindEvents = function () {
  PubSub.subscribe("Emissions:emissions-view", (event) => {
    this.render(event.detail)
  })
};

EmissionView.prototype.render = function (emissions) {
  const graphContainer = document.querySelector('#graph-container');
  const chart = new Highcharts.chart(graphContainer, {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Your co2 Emissions'
    },
    subtitle: {
      text: ''
    },
  xAxis: {
    categories: ["Transport", "Diet", "Household"],
    crosshair: true
  },
  yAxis: {
  min: 0,
  title: {
      text: 'co2 (kg)'
  }
  },
  tooltip: {
  // headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} kg</b></td></tr>',
  footerFormat: '</table>',
  shared: true,
  useHTML: true
  },
  plotOptions: {
  column: {
      pointPadding: 0.2,
      borderWidth: 0
  }
  },
  series: [{
  name: 'All Categories',
  data: [emissions[0].value, emissions[1].value, emissions[2].value]
  }]
  });
  this.container.appendChild(graphContainer);
};

module.exports = EmissionView;
