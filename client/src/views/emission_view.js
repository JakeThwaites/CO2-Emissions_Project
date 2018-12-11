const PubSub = require('../helpers/pub_sub.js');
const EmissionsGraphView = require('./emissions_graph_view.js');
const Highcharts = require('highcharts');

const EmissionView = function(container) {
  this.container = container;
};

EmissionView.prototype.bindEvents = function () {
  PubSub.subscribe("Emissions:data-loaded", (event) => {
    this.render(event.detail);
    this.renderDropDown(event.detail);
  })
};



EmissionView.prototype.renderDropDown = function (data) {

  const container = document.querySelector('#drop-down-container');
  container.innerHTML = "";
  const dropDown = document.createElement('select');
  const dropDownOption1 = document.createElement('option');
  const dropDownOption2 = document.createElement('option');
  const dropDownOption3 = document.createElement('option');
  const dropDownOption4 = document.createElement('option');
  dropDownOption1.textContent = "Please Select View";
  dropDownOption2.textContent = "Yearly Emissions";
  dropDownOption3.textContent = "Monthly Emissions";
  dropDownOption4.textContent = "Weekly Emissions";
  dropDown.appendChild(dropDownOption1);
  dropDown.appendChild(dropDownOption2);
  dropDown.appendChild(dropDownOption3);
  dropDown.appendChild(dropDownOption4);
  container.appendChild(dropDown);
  container.addEventListener('change', (event) => {
    console.log(event.target.value);
    if (event.target.value === "Monthly Emissions") {
      return this.renderMonthGraph(data);
    } else if (event.target.value === "Yearly Emissions"){
      return this.renderYearGraph(data);
    } else return this.render(data);
  })
};

EmissionView.prototype.renderMonthGraph = function (emissions) {
  const monthContainer = document.querySelector('#graph-container');
const monthGraph = Highcharts.chart(monthContainer, {
  chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: 'Yearly Carbon Emissions'
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.1f} kg</b>'
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
          }
      }
  },
  series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
          name: 'Transport',
          y: (emissions[0].value * 52 / 12), color: 'red',
          sliced: true,
          selected: true
      }, {
          name: 'Diet',
          y: (emissions[1].value * 52 / 12), color: 'yellow',
      }, {
          name: 'Household',
          y: (emissions[2].value * 52 / 12), color: 'blue',
      }]
  }]
});
  this.container.innerHTML = "";
  this.container.appendChild(monthContainer);
};



EmissionView.prototype.renderYearGraph = function (emissions) {
  const yearContainer = document.querySelector('#graph-container');
const yearGraph = Highcharts.chart(yearContainer, {
  chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: 'Yearly Carbon Emissions'
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.1f} kg</b>'
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
          }
      }
  },
  series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
          name: 'Transport',
          y: (emissions[0].value * 52),
          sliced: true,
          selected: true
      }, {
          name: 'Diet',
          y: (emissions[1].value * 52)
      }, {
          name: 'Household',
          y: (emissions[2].value * 52)
      }]
  }]
});
this.container.innerHTML = "";
this.container.appendChild(yearContainer);

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

  this.container.innerHTML = "";
  this.container.appendChild(graphContainer);
};

module.exports = EmissionView;

// [{y: (emissions[0].value * 52), color: 'blue'}, {y: (97 * 52), color: 'red'}, {y: (emissions[1].value * 52), color: 'blue'}, {y: (35 * 52), color: 'red'}, {y: (emissions[2].value * 52), color: 'blue'}, {y: (29 * 52), color: 'red'}]
