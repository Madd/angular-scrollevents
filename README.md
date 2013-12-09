Scroll event directive for Angular.js
=================
At Symphonical.com, we develop a mobile webapp in Angular.js. And we saw the need of having an event for when the scrolling ends.
When the user scrolls within our viewport we update a header-bar, and could easily see that the default scroll event used too much resources. And therefor we built this Directive to update the header after the scrolling is done.


### How it works
    <div ng-scroll-event="updateOnScrollEvents($event, isEndEvent)" class="my-uber-design">
      This area is scrollable
    </div>
The _ng-scroll-events_ is the Directive name and calls the scope-defined function updateOnScrollEvents($event, isEndEvent).
The function is called with two arguments, the default $event and isEndEvent(true/false). If isEndEvent is false, then it's the *scroll-start* event. If false it's *scroll-end* event.

During testing we saw that calling the scroll event and do calculations there was heavy, especially if there was a lot of DOM elements with some expensive CSS. So we unbind the scroll event and start an Interval to see if the scroll position is different from the thre initial scroll or the last Interval tick. If so, we call the _ng-scroll-events_ with isEndEvent = true. The Interval runs every 150ms in our code, but you can easily change this if you want. But this was a good number for our usage.

### Working example
You can find a working example here: http://jsbin.com/uropuq/3/


#### Todo:
 - Write test
