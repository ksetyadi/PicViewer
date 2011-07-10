var _ = require('common/util');

_.extend(exports, {
    ':load': function() {
        console.log('viewImage loaded');
    },
    
    ':active': function() {
        console.log('viewImage active');
    },
    
    ':inactive': function() {
        console.log('viewImage inactive');
    },
    
    ':state': function(data) {
        var url = "http://farm" + data.farm + ".static.flickr.com/" + data.server + "/" + data.id + "_" + data.secret + ".jpg";
        console.log("url: " + url);
        var imgview = this.get('imgresult');        
        imgview.resource(url);
    },
    
    ':back': function() {
        app.back();
    }
});
