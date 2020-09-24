require('chromedriver');
const seleniumWebdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

exports.createDriver = function () {
    const options = new chrome.Options();
    options.addArguments('window-size=1440,900');

    return new seleniumWebdriver.Builder()
        .withCapabilities(seleniumWebdriver.Capabilities.chrome())
        .setChromeOptions(options)
        .build();
}
