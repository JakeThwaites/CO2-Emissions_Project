const Highcharts = require('highcharts');

const EmissionsGraphView = function() {
  this.graph = Highcharts.chart('container', {
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
    categories: [
                  // 'Transport',
                  // 'Diet',
                  // 'Household'
                ],
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
  data: []
  }]
  });
};

EmissionsGraphView.prototype.getData = function (emissions) {
  emissions.forEach((emission) => {
    this.graph.xAxis.categories.push(emission.type);
    this.graph.data.push(emission.value);
  })
};

module.exports = EmissionsGraphView;
