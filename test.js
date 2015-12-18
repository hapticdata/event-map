var test   = require('prova'),
    listen = require('./');

test('allows an element to be appended', function(t){

    t.plan(5);



    document.body.innerHTML = '<div id="container"><h1>Roll over me</h1><button class="btn">Click Me</button><ul><li><a href="#" class="link">link</a></div>';

    var container = document.getElementById('container');


    function listener(event){
        console.log(event.target);
        t.ok(true);
        event.stopPropagation();
    }

    var removeListeners = listen(container, {
        'click' : listener,
        'click h1': listener,
        'click .btn, .link': listener
    });

    t.ok(typeof removeListeners === 'function');

    function sendClicks(){
        container.click();
        container.querySelector('h1').click();
        container.querySelector('.btn').click();
        container.querySelector('.link').click();
    }

    sendClicks();
    removeListeners();
    sendClicks();


});
