hotrod-logger
=============

Simple bunyan based logging helper

## Install

```
npm install hotrod-logger
```

## Usage

Creating a logger:

```js

var logger = require('hotrod-logger')('myComponent');  // Creates logger with default level of 'INFO'
var logger = require('hotrod-logger')('myComponent', 'DEBUG');  // Override log level

// In example below, if __filename is '/Users/me/src/myComponent.js', logger name will be 'myComponent':
var logger = require('hotrod-logger')(__filename);

logger.info('blah'); 
logger.debug('blah'); 
```

Logger API - see the [bunyan docs](https://github.com/trentm/node-bunyan)

## Configuration

### Via Environment Variables

You can use the following environment variable forms to override log levels:

* `LOG_LEVEL=WARN` - sets global log level to `WARN`
* `LOG_LEVEL_DEBUG=foo,bar` - sets log level for the `foo` and `bar` loggers to `DEBUG`
* `LOG_LEVEL_INFO=myComponent` - ... etc  Use `LOG_LEVEL_<level>` form

### Custom Logic

You can pass a configuration object instead of a logger name with the following optional overrides:

```js
require('hotrod-logger')({
    createLogger: function(name, level) { ... },
    getLoggerName: function(namePassedToRequireCall) { ... },
    inspectDepth: <number> // Used as value for `depth` param passed to `util.inspect`. Default = 2 
})
```

See source for more details.

# License

The MIT License (MIT)

Copyright (c) Panoptix CC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
