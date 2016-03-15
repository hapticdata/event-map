var delegate = require('delegate');
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

module.exports = add;

/**
 * add a map of listeners to a dom element
 * @param {HTMLElement} [dom] optionally provide a dom node for root, defaults to document
 * @param {Object} mappings an object mapping events and selectors to functions
 * @param {Boolean} [useCapture] optionally choose useCapture for all listeners
 * @return {Function} for removing all listeners
 */
function add(dom, mappings, useCapture){
    if( !isDom(dom) ){
        //allow for dom to be optional
        useCapture = mappings;
        mappings = dom;
        dom = document;
    }

    mappings = generateMap(mappings);

    var delegations = mappings.map(function(item){
        return delegate(dom, item.selector, item.eventType, item.listener, useCapture);
    });

    return function removeDelegates(){
        delegations.forEach(function(dele){
            dele.destroy();
        });
    };
}


/**
 * parse the key and values of the event map and separate
 * them between eventType, selector and listener
 * @param {Object}
 * @return Array<{selector, eventType, listener}>
 */
function generateMap(map){

    var eventType,
        spaceIndex,
        selector,
        listener,
        result = [];

    for(var prop in map){

        spaceIndex = prop.indexOf(' ');

        listener = map[prop];
        eventType = (spaceIndex < 0) ? prop : prop.slice(0, spaceIndex);
        selector = (spaceIndex < 0) ? '*' : prop.slice(spaceIndex+1);

        result.push({
                selector: selector,
                eventType: eventType,
                listener: listener
        });
    }

    return result;

}

