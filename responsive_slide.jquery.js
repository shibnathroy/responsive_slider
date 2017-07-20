/*
  Name: responsive slider
 */
(function($){
	$.fn.responsiveSlide = function(options) {

		/* Set the option for the slider*/
		var settings = $.extend({}, options);


		var $this = $(this),
		slideFun = function(){

		 

		  // set it's width from a parent 
		 var slideWidth = $this.width() || settings.width;
		 
		 /* Slider navigation */
		 var _previousButton = $(settings.prevButton);
		 var _nextButton = $(settings.nextButton);

		  /* Cache selectors */
		  var ul_selector = $this;
		  var ul_children = ul_selector.find('li');
		  var moveValue = slideWidth;


	   	  // wrap a div around the ul
	  	  ul_selector.wrap('<div class="res_slider_wrap"></div>');
	  	  var sliderWrapper = ul_selector.parents('.res_slider_wrap');

	  	  // add class to the slide ul itself
	  	  ul_selector.addClass('res_slider_ul'); 
	  	  ul_children.addClass('res_single_slide');

	  	  // set width for the child li
	  	  ul_children.css({
	  	  	 'width': slideWidth
	  	  });

	  	  sliderWrapper.width(slideWidth);

	  	  // set the width of the slider ul
	  	  var length_of_ul = ul_children.length * slideWidth;
	  	  var number_of_slide = ul_children.length;
	  	  ul_selector.width(length_of_ul);

	  	  var _moveNext = function(){

	  	  	  if(moveValue == (length_of_ul - slideWidth)){
	  	  	  	  moveValue = 0;
	  	  	  }
	  	  	  else{
	  	  	  	 moveValue = moveValue + slideWidth;
	  	  	  }
	  	  	  ul_selector.animate({
	  	  	  	 "margin-left": -moveValue
	  	  	  });

	  	  	  
	  	  	 
	  	  };

	  	  var _movePrev = function(){

	  	  	  if(moveValue <= slideWidth){
	  	  	  	  moveValue = 0;
	  	  	  }
	  	  	  else{
	  	  	  	 moveValue = moveValue - slideWidth;
	  	  	  }
	  	  	  ul_selector.animate({
	  	  	  	 "margin-left": -moveValue
	  	  	  });

	  	  	  
	  	  	  
	  	  };

	  	  var move_next_timer = setInterval(function(){
	  	  		_moveNext();
	  	    }, 5000);

	  	 var _nextSlideFun = function(){
	  	 	  move_next_timer = setInterval(function(){
	  	  		_moveNext();
	  	    }, 5000);
	  	 }
	  	 

	  	 // Trigger to move to next slide
	  	  _nextButton.on('click', function(e){

	  	  		e.preventDefault();

	  	  	   clearInterval(move_next_timer);
	  	  	   _moveNext();
	  	  	   
	  	  	   _nextSlideFun();
	  	  	   
	  	  	   
	  	  });

	  	  //Trigger to move to previous slide
	  	  _previousButton.on('click', function(e){
	  	  		e.preventDefault();
	  	  		 clearInterval(move_next_timer);
	  	  		 _movePrev();
	  	  	   
	  	  	   _nextSlideFun();
	  	  })

		};

		slideFun();
		return $this;
		
	};
}(jQuery));