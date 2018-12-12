const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const EmissionFormView = function (form) {
  this.form = form;

};

EmissionFormView.prototype.bindEvents = function () {
  const inputs = document.querySelectorAll('.input');
  inputs.forEach((input) => {
    input.addEventListener('change', (event) => {
      const emissionUpdate = this.handleChange(event);
      PubSub.publish("EmissionFormView:emissions-updated", emissionUpdate)
    });
  });
  const buttons = document.querySelectorAll('.slider-button');
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const emissionButtonUpdate =
      this.handleChange(event);
      console.log(emissionButtonUpdate);
      PubSub.publish("EmissionFormView:emissions-updated", emissionButtonUpdate)
    });
  });
};


EmissionFormView.prototype.handleChange = function (event) {
  const newEmission = {
    type: event.target.id,
    name: event.target.name,
    value: event.target.value
  };

  return newEmission;
};




module.exports = EmissionFormView;
