const { setWorldConstructor } = require('cucumber');

function CustomWorld() {
    this.res = null;
}

setWorldConstructor(CustomWorld);
