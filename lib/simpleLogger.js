var util = require('util');

function SimpleLogger(logDataInspectDepth) {
    this.utilInspectOptions = { depth: logDataInspectDepth || 2 };
}

var NAME_FROM_LEVEL = {
    '10': 'TRACE',
    '20': 'DEBUG',
    '30': 'INFO',
    '40': 'WARN',
    '50': 'ERROR',
    '60': 'FATAL'
};

SimpleLogger.prototype.write = function (rec) {
    var dataStr = rec.data ? util.inspect(rec.data, this.utilInspectOptions) : '';
    console.log('[%s - %s] %s: %s %s',
        rec.time.toISOString(),
        rec.name,
        NAME_FROM_LEVEL[rec.level],
            rec.msg || dataStr,
        rec.err ? JSON.stringify(rec.err) : '');
};

module.exports = SimpleLogger;