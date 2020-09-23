require('chromedriver');
const { setWorldConstructor, setDefaultTimeout } = require('cucumber');
const seleniumWebdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

function CustomWorld({attach, parameters}) {
    this.attach = attach
    this.parameters = parameters

    const options = new chrome.Options()
    options.addArguments('window-size=1440,900')

    this.driver = new seleniumWebdriver.Builder()
        .withCapabilities(seleniumWebdriver.Capabilities.chrome())
        .setChromeOptions(options)
        .build();

    setDefaultTimeout(10000);
}

setWorldConstructor(CustomWorld);
