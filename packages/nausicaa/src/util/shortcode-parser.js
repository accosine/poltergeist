/*
Copyright (c) 2012, Ernesto Méndez (der@der-design.com)

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
*/
/* lib/shortcode-parser.js */

/* eslint-disable */

var util = require('util');

var shortcodes = {};

var SHORTCODE_ATTRS = /(\s+([a-z0-9\-_]+|([a-z0-9\-_]+)\s*=\s*([a-z0-9\-_]+|\d+\.\d+|'[^']*'|"[^"]*")))*/
  .toString()
  .slice(1, -1);
var SHORTCODE_SLASH = /\s*\/?\s*/.toString().slice(1, -1);
var SHORTCODE_OPEN = /\[\s*%s/.toString().slice(1, -1);
var SHORTCODE_RIGHT_BRACKET = '\\]';
var SHORTCODE_CLOSE = /\[\s*\/\s*%s\s*\]/.toString().slice(1, -1);
var SHORTCODE_CONTENT = /(.|\n|)*?/.toString().slice(1, -1);
var SHORTCODE_SPACE = /\s*/.toString().slice(1, -1);

function typecast(val) {
  val = val.trim().replace(/(^['"]|['"]$)/g, '');
  // don't parse number because ids can be too big
  // if (/^\d+$/.test(val)) {
  //   return parseInt(val, 10);
  // } else if (/^\d+\.\d+$/.test(val)) {
  //   return parseFloat(val);
  if (/^(true|false)$/.test(val)) {
    return val === 'true';
  } else if (/^undefined$/.test(val)) {
    return undefined;
  } else if (/^null$/i.test(val)) {
    return null;
  } else {
    return val;
  }
}

function closeTagString(name) {
  return /^[^a-z0-9]/.test(name)
    ? util.format('[%s]?%s', name[0].replace('$', '\\$'), name.slice(1))
    : name;
}

function parseShortcode(name, buf, inline) {
  var regex,
    match,
    data = {},
    attr = {};

  if (inline) {
    regex = new RegExp(
      '^' +
        util.format(SHORTCODE_OPEN, name) +
        SHORTCODE_ATTRS +
        SHORTCODE_SPACE +
        SHORTCODE_SLASH +
        SHORTCODE_RIGHT_BRACKET,
      'i'
    );
  } else {
    regex = new RegExp(
      '^' +
        util.format(SHORTCODE_OPEN, name) +
        SHORTCODE_ATTRS +
        SHORTCODE_SPACE +
        SHORTCODE_RIGHT_BRACKET,
      'i'
    );
  }

  while ((match = buf.match(regex)) !== null) {
    var key = match[3] || match[2];
    var val = match[4] || match[3];
    var pattern = match[1];
    if (pattern) {
      var idx = buf.lastIndexOf(pattern);
      attr[key] = val !== undefined ? typecast(val) : true;
      buf = buf.slice(0, idx) + buf.slice(idx + pattern.length);
    } else {
      break;
    }
  }

  attr = Object.keys(attr)
    .reverse()
    .reduce(function(prev, current) {
      prev[current] = attr[current];
      return prev;
    }, {});

  buf = buf
    .replace(regex, '')
    .replace(
      new RegExp(util.format(SHORTCODE_CLOSE, closeTagString(name))),
      ''
    );

  return {
    attr: attr,
    content: inline ? buf : buf.replace(/(^\n|\n$)/g, ''),
  };
}

module.exports = {
  _shortcodes: shortcodes,

  add: function(name, callback) {
    if (typeof name == 'object') {
      var ob = name;
      for (var m in ob) {
        // Adding methods from instance and prototype
        if (ob[m] instanceof Function) {
          shortcodes[m] = ob[m];
        }
      }
    } else {
      shortcodes[name] = callback;
    }
  },

  remove: function(name) {
    delete shortcodes[name];
  },

  parse: function(buf, extra, context) {
    context = context || shortcodes;

    extra = extra || {};

    const usedShortcodes = [];

    for (var name in context) {
      // Allow absence of first char if not alpha numeric. E.g. [#shortcode]...[/shortcode]

      var regex = {
        wrapper: new RegExp(
          util.format(SHORTCODE_OPEN, name) +
            SHORTCODE_ATTRS +
            SHORTCODE_RIGHT_BRACKET +
            SHORTCODE_CONTENT +
            util.format(SHORTCODE_CLOSE, closeTagString(name)),
          'gi'
        ),
        inline: new RegExp(
          util.format(SHORTCODE_OPEN, name) +
            SHORTCODE_ATTRS +
            SHORTCODE_SLASH +
            SHORTCODE_RIGHT_BRACKET,
          'gi'
        ),
      };

      var matches = buf.match(regex.wrapper);

      if (matches) {
        usedShortcodes.push(name);
        for (var m, data, i = 0, len = matches.length; i < len; i++) {
          m = matches[i];
          data = parseShortcode(name, m);
          buf = buf.replace(
            m,
            context[name].call(null, data.content, data.attr, extra)
          );
        }
      }

      matches = buf.match(regex.inline);

      if (matches) {
        usedShortcodes.push(name);
        while ((m = matches.shift()) !== undefined) {
          data = parseShortcode(name, m, true);
          buf = buf.replace(
            m,
            context[name].call(null, data.content, data.attr, extra)
          );
        }
      }
    }

    return { text: buf, usedShortcodes: [...new Set(usedShortcodes)] };
  },

  parseInContext: function(buf, context, data) {
    return this.parse(buf, data, context);
  },
};
