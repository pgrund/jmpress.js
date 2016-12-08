(function() {
  'use strict';
  angular.module('jmpress')
  .controller('ConfigController', ['$scope', 'jmpressService',
    function($scope, jmpressService) {
      jmpressService.config = {
    		stepSelector: 'section',
    		viewPort: {
    			width: 1300,
    			maxScale: 1
    		},
    		presentationMode: {
    			notesUrl: 'index.notes.html'
    		},
        setActive: function(step) {
      		if ($(step).attr('id') === 'home') {
      			$('.nav').fadeOut();
      			$('.hint').stop(true, true).delay(3000).fadeIn();
      		} else {
      			$('.nav').fadeIn();
      			$('.hint').stop(true, true).fadeOut();
      		}
      	}
    	};

      jmpressService.methods = [
        [ 'toggle', 27 ],
        [ 'template', 'stepper', {
    		   children: function(i, child, children) {
      			if ($(child).parent().attr('id') === 'developer') {
      				return {
      					y: -(i+1)*300,
      					x: ((i-1)%2)*100
      				};
      			}
      			return {
      				y: (i+1)*250,
      				x: (i%2)*100
      			};
      		 }
    	    }
        ],
        ['apply', '#secondary', {
        		secondary: {
        			rotate: { z: 20, x: 20, y:20 },
        			'': 'self'
        		}
      	  }
        ]
      ];

      jmpressService.subMethods = [
        [
          '.nested-jmpress', {
            viewPort: { height: 150, width: 700, maxScale: 1 },
            duration: { defaultValue: 3500, barSelector: '.progressbar-value' },
            stepSelector: '.nested-step',
            hash: { use: false },
            fullscreen: false,
            presentationMode: { use: false }
          }
        ]
      ];

      //handle nested internal nav links
      $('.nested-go').click(function() {
        nested.jmpress($(this).attr('href').slice(1));
        //_gaq.push(['_trackEvent', 'Feature', 'NestedJmpress', "start"]);
        return false;
      });

      // handle internal nav links
      $('.go').click(function(e) {
        e.preventDefault();
        ele.jmpress($(this).attr('href').slice(1));
      });

    }]);
}());
