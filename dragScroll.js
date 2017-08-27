var timeout_functions = [];

function ScrollBody(selector, options){
	/** options **/
	var step = typeof(options.scrollStep) == 'undefined' ? 1 : options.scrollStep;
	var slide_enable = typeof(options.slideEnable) == 'undefined' ? true : options.slideEnable;
	var slide_distance_multiplier = typeof(options.slideDistanceMultiplier) == 'undefined' ? 0.2 : options.slideDistanceMultiplier;
	var slide_descending = typeof(options.slideDescending) == 'undefined' ? 1 : options.slideDescending;
	var hold_time_threshold = typeof(options.holdTimeThreshold) == 'undefined' ? 30 : options.holdTimeThreshold;
	var move_time_threshold = typeof(options.moveTimeThreshold) == 'undefined' ? 1000 : options.moveTimeThreshold;
	if (options.YInvert == true){
		var invert = -1;
	}else{
		var invert = 1;
	}
	
	var scroll_elements = document.querySelectorAll(selector);
	
	for (var i = 0; i < scroll_elements.length; i++){
		var scroll_element = scroll_elements[i];
		
		scroll_element.startY = -1;
		scroll_element.hold_time = 0;
		scroll_element.mousedown = undefined;
		
		scroll_element.onmousedown = function(e){
			this.startY = e.pageY;
			this.mousedown = true;
			this.startPoint = e.pageY;
			for (var i = 0 ; i< timeout_functions.length; i++) {
			  clearTimeout(timeout_functions[i]);
			}
		};
		scroll_element.onmouseup = function(e, scroll_element){
			this.mousedown = false;
			if (slide_enable){
				if (this.hold_time < hold_time_threshold){
					if ((new Date - this.last_move_time) < move_time_threshold){
						slide(this, (e.pageY - this.startPoint) * slide_distance_multiplier * invert, slide_descending);
					}
				}
			}
			this.hold_time = 0;
		};
		scroll_element.onmouseleave = function(e){
			this.mousedown = false;
			this.hold_time = 0;
		};
		scroll_element.onmousemove = function(e){
			if (this.mousedown){
				this.hold_time++;
				this.scrollTop = this.scrollTop + (e.pageY - this.startY) * step * invert;
				this.startY = e.pageY;
				this.last_move_time = new Date;
			}
		};
	}
	

}
function slide(element, distance, slide_descending){
	element.scrollTop = element.scrollTop + distance;
	if (distance > 0){
		var new_dis = distance - slide_descending;
		if (new_dis < 0){
			return;
		}
	}else{
		var new_dis = distance + slide_descending;
		if (new_dis > 0){
			return;
		}
	}
	timeout_functions.push(setTimeout(function(){
		slide(element, new_dis, slide_descending);
	}, 10));
}