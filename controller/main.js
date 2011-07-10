var _ = require('common/util');

function viewImage(data) {
	app.setContent('viewImage', data);
}

_.extend(exports, {
	':load': function() {
		console.log('View was loaded');
		
		var view = this;
		
		view.get('keyword').on('submit', function() {
			var keyword = view.get('keyword').value();
			keyword = keyword.replace(" ", "%20");
			
			console.log("Keyword is: " + keyword);
			
			if (keyword.length !== 0) {
				app.msg('searchPic', {keyword: keyword});
			}
		});
		
		app.on('message', function(action, data) {
			
			if (action === 'searchPic') {
				viewImage(data);
			}
		});
	},

	':resized': function(width, height) {
		console.log('View was resized to ' + width + 'x' + height);
	},

	':keydown': function(key) {
		console.log('Key down: '+ key);
	},

	':keyup': function(key) {
		console.log('Key up: ' + key);
	},

	':keypress': function(key) {
		console.log('Key press: ' + key);
		this.get('keyword').emit('keypress', key);
	},

	':active': function() {
		console.log('View is active');
		var viewInput = this.get('keyword');
		viewInput.value("");
	},

	':inactive': function() {
		console.log('View is inactive');
	}
});
