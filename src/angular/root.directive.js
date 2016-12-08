/* global angular:true, $:true */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-unused-vars: "warn" */
/* eslint func-names: ["error", "as-needed"] */
(function iife() {
  // 'use strict';

  angular.module('jmpress')
    .directive('jmpressRoot', ['$compile', 'jmpressService',
      function jmpressRoot($compile, jmpressService) {
        function parseSildeElement(ele, idx) {
          const slideId = $(ele).attr('id') ? $(ele).attr('id') : `step-${idx}`;
          const slide = {
            id: slideId,
            description: ele.title ? ele.title : `${ele.id}`,
            data: {
              x: ($(ele).data('x') ? $(ele).data('x') : 0),
              y: ($(ele).data('y') ? $(ele).data('y') : 0),
              z: ($(ele).data('z') ? $(ele).data('z') : 0),
            },
            type: $(ele).attr('class'),
          };
          if ($(ele).attr('fa')) {
            slide.icon = $(ele).attr('fa');
          }
          return slide;
        }
        return {
          restrict: 'A',
          transclude: true,
          template: '<div id="jmpress" ng-transclude></div>',
          link: function link(scope, element) {
            // jmpress is bound to jquery, not angular jqLite
            const ele = $(element[0]).find('#jmpress');

            scope.steps = [];
            ele.find(jmpressService.config.stepSelector).each((idx, step) => {
              scope.steps.push(parseSildeElement(step, idx));
            });

            jmpressService.init(ele, scope);

            // // enable ESC to toggle jmpress
            // ele.jmpress('template', 'stepper', {
            //   children: function(i, child, children) {
            //     if ($(child).parent().attr('id') === 'developer') {
            //       return {
            //         y: -(i+1)*300,
            //         x: ((i-1)%2)*100
            //       };
            //     }
            //     return {
            //       y: (i+1)*250,
            //       x: (i%2)*100
            //     };
            //   }
            // });
            //
            // // apply secondary animation
            // ele.jmpress('apply', '#secondary', {
            //   secondary: {
            //     rotate: { z: 20, x: 20, y:20 },
            //     '': 'self'
            //   }
            // });

            jmpressService.start();
          },
        };
      },
    ]);
}());
