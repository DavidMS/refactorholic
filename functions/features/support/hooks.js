const {Before} = require('cucumber');

const clearDB = function() {
    console.log('Clearing DB');
}

Before(clearDB);
