const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const EmissionFormView = function (form) {
  this.form = form;
};

EmissionFormView.prototype.bindEvents = function () {
  PubSub.subscribe("Emission:form-item-changed", (event) => {
    this.handleSubmit(event);
  });
  const slider = document.querySelector('.slider');
  slider.addEventListener('change', (event) => {
    console.log(event);
    const message = { type: event.target.id,
                      value: event.target.value};
    PubSub.publish("Emission:form-item-changed", message );
  });
};

EmissionFormView.prototype.handleSubmit = function (event) {
  event.preventDefault();
  const newEmission = this.createEmissions(event.target);
  PubSub.publish("Emission:emissions-submitted", newEmission);
  console.log(event);

  // event.target.reset();
};

EmissionFormView.prototype.testSubmit = function (event) {
  console.log(event);
  event.preventDefault();
  const newEmission = {
    type: event.target.name,
      value: event.target.value
  };

  PubSub.publish("Emission:emissions-submitted", newEmission);
};

EmissionFormView.prototype.createEmissions = function (form) {
  const newCar = {
    type: "Transport",
    name: "Car",
    value: form.Transport.value
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
