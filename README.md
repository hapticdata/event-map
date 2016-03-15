# event-map

A module to ease the addition and removal of a mapping of delegated listeners to a view. Inspired by Backbone.View's [delegateEvents](http://backbonejs.org/#View-delegateEvents). A mapping consists of an object where the key is an event and optionally a selector as well and the value is a listener function.

[![NPM](https://nodei.co/npm/event-map.png)](https://npmjs.org/package/event-map)

## Install

```
npm install event-map --save
```

## Usage

### eventMap([domElement,] map [, useCapture])

On a domElement, append these listeners delegated to the provided selectors:

```js
var removeListeners = eventMap(domElement, {
    'click .btn': function(event){ console.log(event.target + 'clicked'); },
    'mouseover h1, h2, a': onRollover,
    'touchstart': onTouchStart
});


//at a later timer, clean up:
removeListeners();
```

If no domElement is provided, all events are placed on document:

```js

var removeListeners = eventMap({
    'touchstart': onTouchStart,
    'touchmove': onTouchMove,
    'touchend': onTouchEnd
}, true);
```
   
   
## License

MIT, see [LICENSE.md](http://github.com/hapticdata/event-map/blob/master/LICENSE.md) for details. 
