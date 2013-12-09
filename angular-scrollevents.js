(function(angular) {
    'use strict';
    
    var INTERVAL_DELAY = 150;
  
    angular.module('ngScrollEvent', [])
    .directive('ngScrollEvent', ['$parse', '$window', function($parse, $window) {
        return function(scope, element, attr) {
          var fn = $parse(attr.ngScrollEvent);
    
            var interval,
            handler,
            el = element[0],
            scrollEvent = 'scroll',
            scrollPosition = {
                x: 0,
                y: 0
            };
    
            var bindScroll = function() {
                handler = function(event) {
                    scrollPosition.x = el.scrollLeft;
                    scrollPosition.y = el.scrollTop;
    
                    startInterval(event);
                    unbindScroll();
                    scrollTrigger(event, false);
                };

                element.bind(scrollEvent, handler);
            };
    
            var startInterval = function(event) {
                interval = $window.setInterval(function() {
                    if(scrollPosition.x == el.scrollLeft && scrollPosition.y == el.scrollTop) {
                        $window.clearInterval(interval);
                        bindScroll();
                        scrollTrigger(event, true);
                    } else {
                        scrollPosition.x = el.scrollLeft;
                        scrollPosition.y = el.scrollTop;
                    }
                }, INTERVAL_DELAY);
            };
    
            var unbindScroll = function() {
                // be nice to others, don't unbind their scroll handlers
                element.unbind(scrollEvent, handler);
            };
    
            var scrollTrigger = function(event, isEndEvent) {
                scope.$apply(function() {
                  fn(scope, {$event: event, isEndEvent: isEndEvent});
                });
            };
    
            bindScroll();
        };
    }]);
})(angular);
