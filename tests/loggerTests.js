var chai = require('chai');
var assert = chai.assert;

var SimpleLogger = require('../lib/simpleLogger');

describe('Hotrod Logger', function() {

    it('can create Bunyan logger with simple logger name', function() {
        var logger = require('../lib/index')('foo');
        assert.equal(logger.fields.name, 'foo');
    });

    it('can create Bunyan logger based on file path', function() {
        var logger = require('../lib/index')(__filename);
        assert.equal(logger.fields.name, 'loggerTests');
    });

    describe('With custom logger factory', function() {
        var requestedName;
        var requestedLevel;

        beforeEach(function() {
            requestedName = null;
            requestedLevel = null;

            delete process.env.LOG_LEVEL;
            ['TRACE','DEBUG','INFO','WARN','ERROR','FATAL'].forEach(function(level) {
                delete process.env['LOG_LEVEL_' + level];
            });

            var loggerStub = {
                debug: function() {}
            };

            require('../lib/index')({
                createLogger: function(name, level) {
                    requestedName = name;
                    requestedLevel = level;
                    return loggerStub;
                }
            });
        });

        it('can create logger with simple logger name', function() {
            require('../lib/index')('foo');
            assert.equal(requestedName, 'foo');
        });

        it('can create logger based on file path', function() {
            require('../lib/index')(__filename);
            assert.equal(requestedName, 'loggerTests');
        });

        it('uses default log level of INFO', function() {
            require('../lib/index')('foo');
            assert.equal(requestedLevel, 'INFO');
        });

        it('can control global log level from environment variable', function() {
            process.env.LOG_LEVEL = 'DEBUG';
            require('../lib/index')('foo');
            assert.equal(requestedLevel, 'DEBUG');
        });

        ['TRACE','DEBUG','INFO','WARN','ERROR','FATAL'].forEach(function(level) {
            it('can set ' + level + ' log level for individual loggers from environment variable', function() {
                process.env['LOG_LEVEL_' + level] = 'some.logger';
                require('../lib/index')('some.logger');
                assert.equal(requestedLevel, level);
            });
        });

        it('can control log level for multiple loggers from environment variable', function() {
            process.env.LOG_LEVEL_DEBUG = 'foo,bar';

            require('../lib/index')('foo');
            assert.equal(requestedLevel, 'DEBUG');

            requestedLevel = null;

            require('../lib/index')('bar');
            assert.equal(requestedLevel, 'DEBUG');
        });

        it('can set log level for individual filename based logger from environment variable', function() {
            process.env.LOG_LEVEL_TRACE = 'loggerTests';
            require('../lib/index')(__filename);
            assert.equal(requestedLevel, 'TRACE');
        });
    });
});