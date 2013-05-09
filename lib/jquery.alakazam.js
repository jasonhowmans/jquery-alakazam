/**!
  A L A K A Z A M
  Your page is waiting.
  - - - - - - - - - - - - - - - - -
  @version 0.9
  @created April 2013
  @by Jason Howmans (@jasonhowmans).
  @dependencies jQuery 1.9.1
 **/

;(function($) {

	var proto = {

		// Queue and manage the actions
		// @param parent {string}: Containing element
		// @param element {string}: Element to apply timeout to
		// @param time {number}: Number to pass to setTimeout
		// @param settings {object}: Settings object
		queue: function(parent, element, time, settings) {
			if (parent && element && time && (typeof settings === 'object')) {
				if (typeof proto.time_manager !== 'object') {
					proto.time_manager = [];
				}

				// Add a timeout to the manager, add enter class, and kill timeout
				proto.time_manager[parent+'>'+element] = window.setTimeout( function() {
					if (settings.safetyClass) 
						$(parent+' '+element).removeClass( settings.safetyClass );

					$(parent+' '+element).addClass( settings.enterClass );
					proto.time_manager.splice(parent+'>'+element, 1)
				}, time);
			}
		}

	};

	$.fn.alakazam = function( keyframes, options ) {
		var $this 		= this,
		$frames 		= this.children(),
		current_frame	= 0;

		// Create default settings object and extend with passed options.
		var settings = $.extend({
			enterClass: 'in',
			safetyClass: false
		}, options);

		// Make sure the frames object exists
		if (typeof keyframes === 'object') {
			// Loop through everything in the keyframes object, and pass rules to the queue
			for (var parent in keyframes) {
				var group = keyframes[parent];

				if (typeof group === 'object') {
					for (var element in group) {
						// Apply safety class if it's set
						if (settings.safetyClass) 
							$(parent+' '+element).addClass(settings.safetyClass);

						var time = keyframes[parent][element];
						proto.queue(parent, element, time, settings);
					}
				}
			}
		}
	};
})( jQuery );