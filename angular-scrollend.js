(function(angular) {
    angular.module('ngScrollEnd', [])
    .directive('ngScrollEnd', ['$parse', function($parse) {
        return function(scope, element, attr) {
            var fn = $parse(attr['ngScrollEnd']);
            var opts = $parse(attr['ngScrollEnd' + 'Opts'])(scope, {});
    
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
                });
            };
    
            var startInterval = function(event) {
                interval = setInterval(function() {
                    if(scrollPosition.x == el.scrollLeft && scrollPosition.y == el.scrollTop) {
                        clearInterval(interval);
                        bindScroll();
                        scrollEndTrigger(event);
                    } else {
                        scrollPosition.x = el.scrollLeft;
                        scrollPosition.y = el.scrollTop;
                    }
                }, 150);
            };
    
            var unbindScroll = function() {
                element.unbind('scroll');
            };
    
            var scrollEndTrigger = function(event) {
                scope.$apply(function() {
                    fn(scope, {$event: event});
                });
            };
    
            bindScroll();
        };
    }]);
})(angular);
