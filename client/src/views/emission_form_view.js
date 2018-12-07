const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const EmissionFormView = function (form) {
  this.form = form;
};

EmissionFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (event) => {
    this.handleSubmit(event);
  });
};

EmissionFormView.prototype.handleSubmit = function (event) {
  event.preventDefault();
  const newEmission = this.createEmission(event.target);
  PubSub.publish("Emission:emissions-submitted", newEmission);

  event.target.reset();
};

EmissionFormView.prototype.createEmission = function (form) {
  const newTransport = {
    name: "Transport",
    value: form.userTransport.value
  }

  const newDiet = {
    name: "Diet",
    value: form.userDiet.value
  };

  const newHousehold = {
    name: "Household",
    value: form.userHousehold.value
  };

  const allEmissions = [newTransport, newDiet, newHousehold];

  return allEmissions;
};


module.exports = EmissionFormView;
