const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');

const EmissionView = function(container) {
  this.container = container;
  this.chart;
};

EmissionView.prototype.bindEvents = function () {
  PubSub.subscribe("Emissions:data-loaded", (event) => {
    this.render(event.detail);
    this.renderDropDown(event.detail);
    this.renderInfoButtons();
    PubSub.publish("EmissionView:graph-loaded", event.detail);
  })
};

EmissionView.prototype.renderInfoButtons = function () {
  const container = document.querySelector('.info-buttons');

  const headerContainer = document.querySelector('.info-title');

  const header = document.createElement('h3');
  header.textContent = "For more information see below";
  const dietButton = document.createElement('button');
  dietButton.setAttribute('id', "diet-info-button");
  dietButton.setAttribute('class', 'information-button');
  dietButton.textContent = "Diet";

  const householdButton = document.createElement('button');
  householdButton.setAttribute('id', "household-info-button");
  householdButton.setAttribute('class', 'information-button');
  householdButton.textContent = "Household";

  const transportButton = document.createElement('button');
  transportButton.setAttribute('id', "transport-info-button");
  transportButton.setAttribute('class', 'information-button');
  transportButton.textContent = "Transport";

  headerContainer.innerHTML = "";
  headerContainer.appendChild(header);
  container.innerHTML = "";
  container.appendChild(header);
  container.appendChild(dietButton);
  container.appendChild(householdButton);
  container.appendChild(transportButton);
};

EmissionView.prototype.renderDropDown = function (data) {
  const container = document.querySelector('#drop-down-container');
  container.innerHTML = "";
  const dropdown = document.createElement('select');
  this.createDropdownElement("Please Select View", dropdown, "dropdown-start");
  this.createDropdownElement("Yearly Emissions", dropdown);
  this.createDropdownElement("Monthly Emissions", dropdown);
  this.createDropdownElement("Weekly Emissions", dropdown);
  container.appendChild(dropdown);

  const dropdownStartButton = document.querySelector('#dropdown-start');
  dropdownStartButton.setAttribute('style', 'display:none');
  this.listenForDropdownChange(container, data);

};
EmissionView.prototype.createDropdownElement = function (textContent, container, id) {
  const dropDownElement = document.createElement('option');
  dropDownElement.textContent = textContent;
  dropDownElement.setAttribute('id', id)
  container.appendChild(dropDownElement);
};

EmissionView.prototype.listenForDropdownChange = function (dropdown, data) {
  dropdown.addEventListener('change', (event) => {
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
        text: 'Monthly Carbon Emissions'
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
      type: 'column'
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
  this.chart = graphContainer;
};


module.exports = EmissionView;
