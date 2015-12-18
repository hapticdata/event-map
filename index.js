var isDom = require('is-dom');

/**
 * provide a map of listeners to add or remove
 *
 * @example
 * listenerMap(el, {
 *  'click .startBtn': onStartButtonClick,
 *  'click .modal .close': function(event){ el.removeChild(event.target); },
 *  'mouseover .btn1, .btn2': onButtonOver,
 *  'mouseout .btn1, .btn2': onButtonOut
 *  });
 */

module.exports = exports = add;
exports.add = add;
exports.remove = remove;

/**
 * add a map of listeners to a dom element
 * @param {HTMLElement} [dom] optionally provide a dom node for root, defaults to document
 * @param {Object} map an object mapping events and selectors to functions
 * @param {Boolean} [useCapture] optionally choose useCapture for all listeners
 * @return {Function} for removing all listeners
 */
function add(dom, map, useCapture){
    applyListenerMap('addEventListener', dom, map, useCapture);

    //return a function that will easily remove all of the listeners
    return function(){
        exports.remove(dom, map, useCapture);
    };
}

function remove(dom, map, useCapture){
    applyListenerMap('removeEventListener', dom, map, useCapture);
}

function applyListenerMap(fnStr, dom, map, useCapture){
    if( !isDom(dom) ){
        //allow for dom to be optional
        useCapture = map;
        map = dom;
        dom = document;
    }

    var event,
        spaceIndex,
        selector,
        listener;

    for(var prop in map){

        listener = map[prop];

        if((spaceIndex = prop.indexOf(' ')) < 0){
            //if no selector is provided, the event will be bound to the root element
            dom[fnStr](prop, listener, useCapture);
        } else {

           event = prop.slice(0, spaceIndex);
           selector = prop.slice(spaceIndex+1);

            //for every selector provided, query all the elements
            var nodes = dom.querySelectorAll(selector);

            for( var j=0; j<nodes.length; j++){
                //apply the event to every node for the current query
                nodes[j][fnStr](event, listener, useCapture);
            }

        }
    }
}

