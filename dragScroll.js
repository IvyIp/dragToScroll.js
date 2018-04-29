class ScrollBody{
	constructor(selector, options) {
		this.timeout_functions = [];
		this.step = typeof(options.scrollStep) === 'undefined' ? 1 : options.scrollStep;
		this.slide_enable = typeof(options.slideEnable) === 'undefined' ? true : options.slideEnable;
		this.slide_distance_multiplier = typeof(options.slideDistanceMultiplier) === 'undefined' ? 0.2 : options.slideDistanceMultiplier;
		this.slide_descending = typeof(options.slideDescending) === 'undefined' ? 1 : options.slideDescending;
		this.hold_time_threshold = typeof(options.holdTimeThreshold) === 'undefined' ? 30 : options.holdTimeThreshold;
		this.move_time_threshold = typeof(options.moveTimeThreshold) === 'undefined' ? 1000 : options.moveTimeThreshold;
		this.invert = options.YInvert === true ? -1 : 1;
		this.scroll_elements = document.querySelectorAll(selector);
		
		this.eventBind();
	}
	
	eventBind(){
		for (let i = 0; i < this.scroll_elements.length; i++){
			let scroll_element = this.scroll_elements[i];
			scroll_element.startY = -1;
			scroll_element.hold_time = 0;
			scroll_element.mousedown = undefined;
			
			scroll_element.onmousedown = (e)=> {
				console.log('1');
				scroll_element.startY = e.pageY;
				scroll_element.mousedown = true;
				scroll_element.startPoint = e.pageY;
				for (let i = 0 ; i < this.timeout_functions.length; i++) {
				  clearTimeout(this.timeout_functions[i]);
				}
			};
			scroll_element.onmouseup = (e) => {
				scroll_element.mousedown = false;
				if (this.slide_enable){
					if (scroll_element.hold_time < this.hold_time_threshold){
						if ((new Date - scroll_element.last_move_time) < this.move_time_threshold){
							this.slide(scroll_element, (e.pageY - scroll_element.startPoint) * this.slide_distance_multiplier * this.invert, this.slide_descending);
						}
					}
				}
				scroll_element.hold_time = 0;
			};
			scroll_element.onmouseleave = (e) => {
				scroll_element.mousedown = false;
				scroll_element.hold_time = 0;
			};
			scroll_element.onmousemove = (e) => {
				if (scroll_element.mousedown){
					scroll_element.hold_time++;
					scroll_element.scrollTop = scroll_element.scrollTop + (e.pageY - scroll_element.startY) * this.step * this.invert;
					scroll_element.startY = e.pageY;
					scroll_element.last_move_time = new Date;
				}
			};
		}
	}
	
	slide(element, distance, slide_descending){
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
		this.timeout_functions.push(setTimeout(() => {
			this.slide(element, new_dis, slide_descending);
		}, 10));
	}
}