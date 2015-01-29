(function() {

	window.App = {
		Models: {},
		Collections: {},
		Views: {},

		Helpers: {}
	}

	window.template = function(id) {
		return _.template( $('#' + id).html() );
	};

	App.Models.Person = Backbone.Model.extend({
		defaults: {
			name: 		'John Doe',
			age: 		27,
			occupation: 'worker'
		}
	});

	App.Collections.People = Backbone.Collection.extend({
		model: App.Models.Person
	});

	App.Views.People = Backbone.View.extend({
		tagName: 'ul',
		render: function() {
			this.collection.each(function(person) {
				var personView = new App.Views.Person({ model: person });
				this.$el.append(personView.render().el);
			}, this);
			return this;
		},
		initialize: function(){
			console.log('making a list');
		}
	});

	App.Views.Person = Backbone.View.extend({
		tagName: 'li',
		template: template('personTemplate'),
		render: function() {
			this.$el.html( this.template(this.model.toJSON()) );
			console.log(this.model.toJSON());
			return this;
		},
		initialize: function() {
			console.log('making a person');
		},
		events: {
			'click strong': 'alertMe'
		},
		alertMe: function() {
			alert('yep');
		}
	});

	peopleCollection = new App.Collections.People([
		{
			name: 		'henrik persson',
			age: 		36
		}, {
			name: 		'john doe',
			age: 		25,
			occupation: 'something'
		}, {
			name: 		'Sally doe',
			age: 		27,
			occupation: 'unemployed' 
		}
	]);


	var peopleView = new App.Views.People({ collection: peopleCollection });
	//$(document.body).append(peopleView.render().el);
	$("#mainContent").append(peopleView.render().el);

	console.log(App.Collections);

})(); 