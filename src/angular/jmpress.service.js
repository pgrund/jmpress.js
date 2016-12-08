/* global angular:true, $:true */
/* eslint no-param-reassign: ["warn", { "props": false }] */
/* eslint no-unused-vars: "warn" */
/* eslint func-names: ["error", "as-needed"] */
(function iife() {
  // 'use strict';
  angular.module('jmpress')
    .service('jmpressService', ['$window', function jmpressService($window) {
      const jmpressSvc = this;
      let element;
      let instanceSteps;
      const methods = {
        selectInitialStep: [],
      };

      jmpressSvc.config = {
        viewPort: {
          width: 1300,
          maxScale: 4,
          initalScale: 1,
          zoomable: false,
        },
        duration: {
          defaultValue: -1,
        },
        stepSelector: '.step',
      };

      jmpressSvc.print = function safePrint() {
        if (element.jmpress('initialized')) {
          element.jmpress('deinit');
          $window.print();
          element.jmpress(jmpressSvc.config);
        } else {
          $window.print();
        }
      };

      jmpressSvc.methods = [];

      // A single jmpress callback can be called synchronously inside an angular $digest or
      // asynchronously by a jquery implementation in which angular doesn't have control.
      // For that reason it may or may not throw an error for an $apply or $digest being
      // already in progress while using "scope.$apply" in some jmpress callbacks.
      // The recommended solution for similar cases is to use "$timeout", but having one more
      // asynchronous operation make it hard to test the module, because we would have to fill the
      // tests with several "setTimeouts" to wait for angular "$timeout" to execute.
      // Due to the tradeoffs, a check for "scope.$root.$$phase" was choosen over the
      // "$timeout" call.
      jmpressSvc.safeApply = function safeApply(scope, fn) {
        if (scope.$root.$$phase === '$digest' || scope.$root.$$phase === '$apply') {
          fn();
        } else {
          scope.$apply(fn);
        }
      };
      jmpressSvc.init = function init(initializedElement, scope) {
        element = initializedElement;
        instanceSteps = scope.steps;
      };
      jmpressSvc.start = function() {
        jmpressSvc.methods.forEach((m) => {
          element.jmpress.apply(element, m);
        });
        jmpressSvc.subMethods.forEach((m) => {
          var ele = element.find(m[0]);
          if (ele) {
            return ele.jmpress.apply(ele, m.slice(1));
          } else {
            throw new Error(`Element '${selector}' doesn't exist!`);
          }
        })
        element.jmpress(jmpressSvc.config);
      };

      jmpressSvc.register = function register(method, callback) {
        if (!(method in methods)) {
          throw new Error(`Method '${method}' doesn't exist!`);
        }
        methods[method].push(callback);
      };

      jmpressSvc.fire = function fire(method, ...args0) {
        let callbackReturn;
        const firingArguments = [].slice.call(args0, 1);
        methods[method].some((callback) => {
          callbackReturn = callback(...firingArguments);
          return callbackReturn;
        });
        return callbackReturn;
      };

      jmpressSvc.method = function method(...args0) {
        var orig = element.jmpress;
        return orig.apply(element, args0);
      };

      jmpressSvc.activate = function activate(steps, callback) {
        if (!Array.isArray(steps)) {
          callback = steps;
          steps = instanceSteps;
        }

        steps.forEach((step) => {
          delete step.active;
        });

        steps.some((step) => {
          if (callback(step) === true) {
            step.active = true;
            return true;
          }
          return false;
        });
      };

      jmpressSvc.findActive = function findActive(index) {
        return this.getActive(instanceSteps, index);
      };

      jmpressSvc.getActive = function getActive(steps, index) {
        const activeRef = this.getActiveReference(steps, index);
        if (activeRef) {
          return activeRef.step;
        }
        return undefined;
      };

      jmpressSvc.getActiveReference = function getActiveReference(steps, index) {
        let active;
        steps.forEach((step, i) => {
          if (step.active) {
            active = {
              step,
              index: i,
            };
          }
        });

        let targetStep;
        let targetIndex;
        if (active && index) {
          targetIndex = active.index + index;
          targetStep = steps[targetIndex];
          active = targetStep ? {
            step: targetStep,
            index: targetIndex,
          } : undefined;
        }

        return active;
      };
    },
    ]);
}());
