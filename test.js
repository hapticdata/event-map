var test   = require('prova'),
    listen = require('./');

test('allows an element to be appended', function(t){

    t.plan(8);

    document.body.innerHTML = '<div id="container"><h1>Roll over me</h1><button class="btn">Click Me</button><ul><li><a href="#" class="link">link</a></div>';

    var container = document.getElementById('container');

    function listener(){
        t.ok(true);
    }


    var removeListeners = listen(container, {
        //this one will get called every time because it selector is '*'
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
