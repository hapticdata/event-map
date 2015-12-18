# listener-map

A module to ease the addition and removal of a mapping of listeners to a view. Inspired by Backbone.View's [delegateEvents](http://backbonejs.org/#View-delegateEvents). A mapping consists of an object where the key is an event and optionally a selector as well and the value is a listener function.

[![NPM](https://nodei.co/npm/listener-map.png)](https://npmjs.org/package/listener-map)

## Install

```
npm install listener-map --save
```

## Usage

### listenerMap([domElement,] map [, useCapture])

On a domElement, append these listeners to the provided selectors:

```js
var removeListeners = listenerMap(domElement, {
    'click .btn': function(event){ console.log(event.target + 'clicked'); },
    'mouseover h1, h2, a': onRollover,
    'touchstart': onTouchStart
});


//at a later timer, clean up:
removeListeners(); //or use listenerMap.remove(domElement, map);
```

If no domElement is provided, all events are placed on document:

```js

var removeListeners = listenerMap({
    'touchstart': onTouchStart,
    'touchmove': onTouchMove,
    'touchend': onTouchEnd
}, true);
```
   
   
## License

MIT, see [LICENSE.md](http://github.com/hapticdata/listener-map/blob/master/LICENSE.md) for details. 
