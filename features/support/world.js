require('chromedriver');
const {setWorldConstructor} = require('cucumber');
const {createDriver} = require("../helpers/selenium");

function CustomWorld({attach, parameters}) {
    this.attach = attach
    this.parameters = parameters
    this.driver = createDriver();
}

setWorldConstructor(CustomWorld);
