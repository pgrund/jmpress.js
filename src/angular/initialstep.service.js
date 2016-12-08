/* global angular:true, $:true */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint func-names: ["error", "as-needed"] */
(function iife() {
  // 'use strict';

  angular.module('jmpress')
    .service('initialStep', ['$window', function initialStep($window) {
      const initalStepService = this;
      function getElementFromUrl(settings) {
        const element = $($window.document.getElementById($window.location.hash.replace(/^#\/?/, '')));
        const stepSelector = settings.stepSelector;
        if (element.length > 0 && element.is(stepSelector)) {
          return element[0];
        }
        return undefined;
      }
      initalStepService.fromHash = function fromHash(settings) {
        // Only get from hash if the module is available
        if (settings.hash && settings.hash.use) {
          return getElementFromUrl(settings);
        }
        return undefined;
      };
      initalStepService.fromStart = function fromStart(rootElement, settings) {
        return rootElement.find(settings.stepSelector)[0];
      };
    }]);
}());
