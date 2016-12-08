/* global angular:true, $:true */
/* eslint no-param-reassign: ["warn", { "props": false }] */
/* eslint no-unused-vars: "warn" */
/* eslint func-names: ["error", "as-needed"] */
(function iife() {
  // 'use strict';
  angular.module('jmpress')
    .directive('jmpressAdd', [function jmpressAdd() {
      return {
        restrict: 'A',
        require: '^^jmpressRoot',
        link: function link(scope, stepElement, attrs, rootController, transclude) {
          if (rootController) {
            console.log(rootController.getRootElement(), transclude);
          }
          const getEntry = function getEntry(ele) {
            return {
              id: ele.attr('id'),
              data: {
                x: (ele.data('x') ? ele.data('x') : -2000),
                y: (ele.data('y') ? ele.data('y') : -1500),
                z: (ele.data('z') ? ele.data('z') : 0),
              },
              type: ele.attr('class'),
              content: ele.html(),
            };
          };
          if (scope.steps.find(ele => ele.id === stepElement.attr('id'))) {
            console.warn(stepElement.attr('id'), 'already present');
          } else {
            scope.steps.push(getEntry(stepElement));
          }
          // console.log(scope.$index, scope.steps);
        },
      };
    }]);
}());
