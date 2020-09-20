const { setWorldConstructor } = require('cucumber');

function CustomWorld() {
    this.persistedPosts = [];
    this.res = null;
}

setWorldConstructor(CustomWorld);
