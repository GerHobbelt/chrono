// chrono.js
// version : 0.0.5
// author : Wanasit T.
// license : MIT
var moment,
    chrono;

(function () {
  chrono = function(){
    for(var attr in chrono){
      this[attr] = chrono[attr]
    }

    this.parsers = {}
    for(var p in chrono.parsers) this.parsers[p] = chrono.parsers[p];

    this.refiners = {}
    for(var r in chrono.refiners) this.refiners[r] = chrono.refiners[r];

    this.timezoneMap = {}
    for(var r in chrono.timezoneMap) this.timezoneMap[r] = chrono.timezoneMap[r];
  }

  chrono.timezoneMap = {};
  chrono.parsers = {};
  chrono.refiners = {};

  chrono.parse = function(text, referrenceDate, option) {

    option = option || {}

    if(typeof(referrenceDate) === 'string'){
      var _ref = moment(referrenceDate).zone(referrenceDate);
      option.timezoneOffset = _ref.zone();
      referrenceDate        = _ref.toDate();
    }

    var results = this.integratedParse(text, referrenceDate, option);
    var results = this.integratedRefine(text, results, option);

    return results;
  }

  chrono.parseDate = function(text, referrenceDate, timezoneOffset) {

    var results = this.parse(text, referrenceDate);

    if(results.length >= 1) return results[0].start.date(timezoneOffset);
    else return null;
  }

  if (typeof exports == 'undefined'){
    //Browser Code
    moment = moment || window.moment;
    window.chrono = chrono;
  } else {
    moment = require('moment');
    module.exports = chrono
  }
})();



