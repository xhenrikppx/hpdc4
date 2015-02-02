(function() {

	window.App = {
		Models: {},
		Collections: {},
		Views: {},
		Router: {}
	};

	window.template = function(id) {
		return _.template( $('#' + id).html() );
	};

	var vent = _.extend({}, Backbone.Events);
	console.log(vent);

	App.Router = Backbone.Router.extend({
		routes: {
			'': 					'index',
			'show/:id': 			'show',
			'download/*filename': 	'download'
		},

		index: function() {
			console.log('index');
		},

		show: function(showId) {
			console.log('showing: '+showId);
			vent.trigger('appointment:show', showId);
		},

		download: function(filename) {
			console.log('downloading: '+filename);
		}
	});

	App.Views.Appointment = Backbone.View.extend({
		initialize: function(){
			vent.on('appointment:show', this.showAppointment, this);
		},

		showAppointment: function(id) {
			console.log('showing appt '+id+' via vent');
		}
	});

	new App.Views.Appointment;
	new App.Router;
	Backbone.history.start();
})(); 