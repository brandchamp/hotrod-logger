'use strict';

var bunyan = require('bunyan');
var path = require('path');
var assert = require('assert');
var SimpleLogger = require('./simpleLogger');

var logDataInspectDepth = 2;

function createSimpleLogger(name, level) {
    return bunyan.createLogger({
        name: name,
        streams: [{
            level: level,
            stream: new SimpleLogger(logDataInspectDepth),
            type: 'raw'
        }]
    });
}

function getLoggerName(name) {
    if (name.indexOf('/') !== -1) {
        return path.basename(name, '.js');
    }
    return name;
}

var logFactory = createSimpleLogger;
var loggerNameProvider = getLoggerName;

module.exports = function(loggerNameOrConfigObj, level) {
    assert(loggerNameOrConfigObj, 'Must pass either a logger name or a configuration object');

    if (typeof loggerNameOrConfigObj !== 'string') {
        var config = loggerNameOrConfigObj;
        logFactory = config.createLogger || logFactory;
        loggerNameProvider = config.getLoggerName || loggerNameProvider;
        logDataInspectDepth = config.inspectDepth || logDataInspectDepth;
        return null;
    } else {
        var loggerName = loggerNameOrConfigObj;

        loggerName = loggerNameProvider(loggerName);

        level = level || process.env.LOG_LEVEL || 'INFO';
        ['TRACE','DEBUG','INFO','WARN','ERROR','FATAL'].forEach(function(levelCandidate) {
            if ((process.env['LOG_LEVEL_' + levelCandidate] || '').indexOf(loggerName) !== -1) {
                level = levelCandidate;
            }
        });

        return logFactory(loggerName, level);
    }
};
