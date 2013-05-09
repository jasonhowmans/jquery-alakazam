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

		// Hide all but visible frames
		// @param {object} frames: Object containing all frames
		// @param {number} current_frame: Index of frame currently in view
		hideUnseen: function( frames, current_frame ) {
			if (typeof frames === 'object') {
				
			}
		},

		// Queue and manage the actions
		// @param parent {string}: Containing element
		// @param element {string}: Element to apply timeout to
		// @param time {number}: Number to pass to setTimeout
		// @param enterclass {string}: Class to apply to element after time
		queue: function(parent, element, time, enterclass) {
			if (typeof enterclass === 'undefined') enterclass = 'in';
			if (parent && element && time) {
				if (typeof proto.time_manager !== 'object') {
					proto.time_manager = [];
				}
				
				// Add a timeout to the manager, add enter class, and kill timeout
				proto.time_manager[parent+'>'+element] = window.setTimeout( function() {
					$(parent+' '+element).addClass( enterclass );
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
			exitClass: 'out',
			frameDelay: 2000
		}, options);

		// Make sure the frames object exists
		if (typeof keyframes === 'object') {
			// Loop through everything in the keyframes object, and pass rules to the queue
			for (var parent in keyframes) {
				var group = keyframes[parent];

				if (typeof group === 'object') {
					for (var element in group) {
						var time = keyframes[parent][element];
						proto.queue(parent, element, time, settings.enterClass);
					}
				}
			}
		}
	};
})( jQuery );