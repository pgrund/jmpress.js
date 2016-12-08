/* global angular:true, $:true */
/* eslint no-param-reassign: ["warn", { "props": false }] */
/* eslint no-unused-vars: "warn" */
/* eslint func-names: ["error", "as-needed"] */
(function iife() {
  // 'use strict';
  angular.module('jmpress')
    .directive('jmpressStep', [function jmpressStep() {
      function camelCase(str) {
        const str1 = str.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`);
        return str1.charAt(0) === '-' ? str1.substr(1) : str1;
      }

      return {
        restrict: 'A',
        require: '^^jmpressRoot',
        link(scope, stepElement, attrs, rootController) {
          const currentStep = rootController.getStep(scope.$index);
          const rootElement = rootController.getRootElement();

          if (currentStep.id) {
            stepElement.attr('id', currentStep.id);
          }

          if (currentStep.data) {
            $.each(currentStep.data, (key, value) => {
              stepElement.attr(`data-${camelCase(key)}`, `${value}`);
            });
          }

          rootElement.jmpress('init', stepElement);

          if (currentStep.active) {
            rootElement.jmpress('goTo', stepElement);
          }
        },
      };
    }]);
}());
