const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const EmissionFormView = function (form) {
  this.form = form;

};

EmissionFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (event) => {
    this.handleSubmit(event);
  });
  const inputs = document.querySelectorAll('.input');
  inputs.forEach((input) => {
    input.addEventListener('change', (event) => {
      const emissionUpdate = this.handleChange(event);
      PubSub.publish("EmissionFormView:emissions-updated", emissionUpdate)
    });
  });
};

EmissionFormView.prototype.handleSubmit = function (event) {
  event.preventDefault();
  const newEmission = this.createEmission(event.target);
  PubSub.publish("Emission:emissions-submitted", newEmission);

  // event.target.reset();
};

EmissionFormView.prototype.handleChange = function (event) {
  const newEmission = {
    type: event.target.id,
    name: event.target.name,
    value: event.target.value
  };

  return newEmission;
};

EmissionFormView.prototype.createEmission = function (form) {
  const newCar = {
    type: "Transport",
    name: "Car",
    value: form.userCar.value
  };

  const newAeroplane = {
    type: "Transport",
    name: "Aeroplane",
    value: form.userAeroplane.value
  };

  const newBus = {
    type: "Transport",
    name: "Bus",
    value: form.userBus.value
  };

  const newDiet = {
    type: "Diet",
    value: form.userDiet.value
  };

  const newElectricity = {
    type: "Household",
    value: form.userElectricity.value
  };

  const newGas = {
    type: "Household",
    value: form.userGas.value
  }

  const allEmissions = [newCar, newAeroplane, newBus, newDiet, newElectricity, newGas];

  return allEmissions;
};


module.exports = EmissionFormView;
