const chai = require('chai');
chai.use(require('chai-http'));

require('chai/register-expect');
require('chai/register-assert');
require('chai/register-should');

module.exports = {
    default: `--format-options '{"snippetInterface": "synchronous"}'`
};
