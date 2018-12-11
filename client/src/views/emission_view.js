const PubSub = require('../helpers/pub_sub.js');
const EmissionsGraphView = require('./emissions_graph_view.js');
const Highcharts = require('highcharts');

const EmissionView = function(container) {
  this.container = container;
};

EmissionView.prototype.bindEvents = function () {
  PubSub.subscribe("Emissions:data-loaded", (event) => {
    this.render(event.detail)
  })
};

EmissionView.prototype.render = function (emissions) {
  const graphContainer = document.querySelector('#graph-container');
  const chart = new Highcharts.chart(graphContainer, {
    chart: {
      type: 'column',
      plotBackgroundImage: 'https://data.gov.sg/images/header-environment.jpg'
    },
    title: {
      text: 'Your co2 Emissions'
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      color: "#003300",
      categories: ["Transport", "Transport Average", "Diet", "Diet Average", "Household", "Household Average"],
      crosshair: true
  },
    yAxis: {
      color: "#003300",
      min: 0,
      title: {
        text: 'co2 (kg)'
  }
  },
  tooltip: {
    headerFormat: '<span style="font-size:15px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:series";padding:0">{series.name}: </td>' +
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
      name: 'CO2(kg) used per Week',
      data: [{y: emissions[0].value, color: 'blue'}, {y: 97, color: 'red'}, {y: emissions[1].value, color: 'blue'}, {y: 35, color: 'red'}, {y: emissions[2].value, color: 'blue'}, {y: 29, color: 'red'}]
  }]
  });

  this.container.appendChild(graphContainer);
};

module.exports = EmissionView;
