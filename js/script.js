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

/* Track outbound links in Google Analytics */
(function($) {
 
  "use strict";
 
  // current page host
  var baseURI = window.location.host;
 
  // click event on body
  $("body").on("click", function(e) {
 
    // abandon if link already aborted or analytics is not available
    if (e.isDefaultPrevented() || typeof ga !== "function") return;
 
    // abandon if no active link or link within domain
    var link = $(e.target).closest("a");
    if (link.length != 1 || baseURI == link[0].host) return;
 
    // cancel event and record outbound link
    e.preventDefault();
    var href = link[0].href;
    ga('send', {
      'hitType': 'event',
      'eventCategory': 'outbound',
      'eventAction': 'link',
      'eventLabel': href,
      'hitCallback': loadPage
    });
 
    // redirect after one second if recording takes too long
    setTimeout(loadPage, 1000);
 
    // redirect to outbound page
    function loadPage() {
      document.location = href;
    }
 
  });
 
})(jQuery); // pass another library here if required