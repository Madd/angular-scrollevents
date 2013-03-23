(function(angular) {
    'use strict';
    
    var INTERVAL_DELAY = 150;
  
    angular.module('ngScrollEvent', [])
    .directive('ngScrollEvent', ['$parse', '$window', function($parse, $window) {
        return function(scope, element, attr) {
          var fn = $parse(attr.ngScrollEvent);
    
            var interval,
            el = element[0],
            scrollPosition = {
                x: 0,
                y: 0
            };    
    
            var bindScroll = function() {
                element.bind('scroll', function(event) {
                    scrollPosition.x = el.scrollLeft;
                    scrollPosition.y = el.scrollTop;
    
                    startInterval(event);
                    unbindScroll();
                    scrollTrigger(event, false);
                });
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
                element.unbind('scroll');
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
