var config = require('../config');
var express = require('express');
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');

var router = express.Router();
var urlEncodedParser = bodyParser.urlencoded({
  extended: false
});
var natural_language_classifier = watson.natural_language_classifier(config.watson
  .natural_language_classifier);
router.post('/', urlEncodedParser, function(req, res, next) {
  natural_language_classifier.classify({
      'text': req.body.source,
      'classifier_id': config.watson.natural_language_classifier.id
    },
    function(err, response) {
      if (err) {
        console.log('error:', err);
      } else {
        console.log(JSON.stringify(response, null, 2));
        res.json(response);
      }
    });
});

module.exports = router;
