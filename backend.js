// PicView -- backend.js
log.info('Hello from backend bootstrap.');

var http = require('blaast/simple-http');
var scaling = new (require('blaast/scaling').Scaling)();

app.message(function(client, action, data) {
    
    if (action === 'searchPic') {
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20flickr.photos.search%20where%20text%3D%22" + data.keyword + "%22%20limit%201&format=json&callback=";
        
        http.get(url, {type: 'binary'}, {
            ok: function(data) {
                console.log(data);
                data = JSON.parse(data);
                photo = data.query.results.photo;
                
                client.msg('searchPic', {farm: photo.farm, id: photo.id, secret: photo.secret, server: photo.server});
            },
            error: function(err) {
                console.log(err);
            }
        });
    }
});

app.setResourceHandler(function(request, response) {

    app.debug('Client requested resource-id=' + request.id);
    
    function sendReply(response, error, imageType, data) {
        if (error) {
           app.warn('Failed to load image: ' + error);
           response.failed();
        } else {
           app.debug('Loaded image.');
           response.reply(imageType, data);
        }
    }
    
    if (request.id !== null) {
        scaling.scale(request.id, request.display_width, request.display_height, 'image/jpeg',
            function(err, data) {
                sendReply(response, err, 'image/jpeg', data);
            }
        );
    }
});