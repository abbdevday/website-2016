/* ==========================================================================

    Project: DevDay
    Author: Ekaterina
    Last updated: @@timestamp

   ========================================================================== */

'use strict';


var Devday = {

  /**
   * Init function
   */
  init: function() {
    Devday.initMobileMenu();
    Devday.initSmoothNavigation();
    Devday.addSmoothScrollToSections();
    Devday.createSpeakersLayout();
    Devday.addWorkshopsShowHide();
    Devday.addScheduleShowHide();
   	Devday.initPartnersSlider();
    Devday.initGMap();
    Devday.initTabs();
  },

  /**
  * Init mobile menu
  */
  initMobileMenu: function() {

  	$('.menu-item-has-children').append('<div class="open-menu-link open"></div>');
		$('.menu-item-has-children').append('<div class="open-menu-link close"></div>');
		$('.open').addClass('visible');

		$('#menu-btn').click(function(){
			$('.responsive-menu').slideToggle();
		});

		$('.open-menu-link').click(function(e){

			var childMenu =  e.currentTarget.parentNode.children[1];

			if($(childMenu).hasClass('visible')){
				$(childMenu).slideToggle();
				$(e.currentTarget.parentNode.children[3]).removeClass('visible');
				$(e.currentTarget.parentNode.children[3]).removeClass('visible');
				$(e.currentTarget.parentNode.children[2]).addClass('visible');
			} else {
				$(childMenu).addClass('visible');
				$(e.currentTarget.parentNode.children[2]).removeClass('visible');
				$(e.currentTarget.parentNode.children[3]).addClass('visible');
			}
		});
  },

  /* Init Smooth Navigation */
  initSmoothNavigation: function (){
  	$('#navigation').onePageNav({
      currentClass: 'current',
      changeHash: true,
      scrollSpeed: 750,
      scrollOffset: 30,
      scrollThreshold: 0.5,
      filter: '',
      easing: 'swing'
   	});
  },

  /*
  	Add smooth scroll to all buttons
  */
  addSmoothScrollToSections: function(){
  	$('a[href*="#"]:not([href="#"])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	    	var linkHash = $(this).attr('href');
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html, body').animate({
	          scrollTop: target.offset().top
	        }, {
	        	duration: 1000,
	        	complete: function(){
	        		location.hash = linkHash;
	        	}
	        });
      		return false;
	      }
	    }
	  });
  },

  /*
   * Turn speakers section into grid on tablets
   */
  createSpeakersLayout: function(){

  	if ($('#speakers').length > 0){

	  	$.getScript('js/salvatorre.min.js')
	  	  .done(function(){
	  	    console.log('Salvatorre.min.js has successfully downloaded!');
	  	    onResize();
	  	  })
	  	  .fail(function() {
	  	    console.log('Salvatorre.min.js has failed to download.');
	  		});

	  	var resizeTimer;
	  	$(window).resize(function() {
	  		clearTimeout(resizeTimer);
	  		resizeTimer = setTimeout(onResize, 250);
	  	});
	  	var _showHide;
  	}

  	// Turn grid layout on/off depending on screen's width
  	// account for 30px of scroll bar on the right (830px breakpoint means 800px needs to be used in resize function)
    function onResize() {

	    var _winWidth = $(window).width();

	    if (_winWidth < 800){
	    	$('#grid').removeAttr('data-columns');
	    	addShowHide();

	    } else if (800 < _winWidth < 1141) {
	    	$('#grid').attr('data-columns', '');
	    	reCreateGrid();

	    } else if (_winWidth > 1141) {
	    	$('#grid').attr('data-columns', '');
	    	reCreateGrid();
	    }
		}

		function reCreateGrid(){
			removeShowHide();
			salvattore.rescanMediaQueries();
		}

		function addShowHide(){
			if (!_showHide){
				$('#grid .info').slideUp();
				$('#grid .name').bind('click', function(){
					if (!$(this).hasClass('opened')) {
						$(this).addClass('opened').next('.info').addClass('opened');
						$(this).next('.info').slideToggle();
					} else {
						$(this).removeClass('opened').next('.info').removeClass('opened');
						$(this).next('.info').slideToggle();
					}
				});
				_showHide = true;
			}
		}

		function removeShowHide(){
			$('#grid .info').slideDown();
			$('#grid .name').unbind('click')
				.removeClass('opened')
				.next('.info').removeClass('opened');
			_showHide = false;
		}
  },

  /*
  	Add workshops show/hide functionality
  */
  addWorkshopsShowHide: function(){

	  if ($('#workshops').length > 0){
	  	$('#workshops .info').slideUp();
	  	$('#workshops .workshop').bind('click', function(){
	  		if (!$(this).hasClass('opened')) {
	  			$(this).addClass('opened');
	  			$(this).find('.info').slideToggle();
	  		} else {
	  			$(this).removeClass('opened');
	  			$(this).find('.info').slideToggle();
	  		}
	  	});
	  }
  },

  /*
  	Add workshops show/hide functionality
  */
  addScheduleShowHide: function(){

  	if ($('#schedule').length > 0){
	  	$('#schedule .info').slideUp();
	  	$('#schedule .lecture.expandable').bind('click', function(){
	  		if (!$(this).hasClass('opened')) {
	  			$(this).addClass('opened');
	  			$(this).find('.info').slideToggle();
	  			$(this).find('.top').slideToggle('fast');
	  		} else {
	  			$(this).find('.info').slideToggle().parent().find('.top').slideToggle('slow');
	  			$(this).removeClass('opened');
	  		}
	  	});
	 	}
  },

  /*
   * Init PartnersSlider
   */
  initPartnersSlider: function(){
  	if($('#partners-slider').length > 0){
  		$('#partners-slider').royalSlider({
		    autoHeight: true,
		    arrowsNav: true,
		    autoScaleSliderHeight: 400,
		    fadeinLoadedSlide: false,
		    controlNavigationSpacing: 0,
		    controlNavigation: 'none',
		    imageScaleMode: 'none',
		    imageAlignCenter: false,
		    loop: false,
		    loopRewind: true,
		    numImagesToPreload: 6,
		    keyboardNavEnabled: true,
		    usePreloader: false
		  });
  	}
  },

  /**
   * Init GMap
   */
  initGMap: function() {

		if ($('#gmap').length > 0){
			// load GoogleMaps API
			$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBJVUz8UZxdRfzmQJj5rqUOOMV5aDO6ALw')
			  .done(function(){
			    console.log('GMaps.js has successfully downloaded!');
			    initMap();
			  })
			  .fail(function() {
			    console.log('Gmaps.js has failed to download.');
				});

			var map;

			var coordinates = {
				lat: 50.07,
				lng: 19.92
			};
		}

		function initMap() {

		  var mapOptions = {
		 		zoom: 12,
		    center: new google.maps.LatLng(coordinates),
		    disableDefaultUI: true
			};

			var mapElement = document.getElementById('gmap');
			var map = new google.maps.Map(mapElement, mapOptions);
			var marker = new google.maps.Marker({
				position: {lat: 50.089, lng: 19.9845},
				map: map,
				title: 'DevDay',
				icon: 'img/home/ui_marker.png'
		 	});

		 	var center;

		 	$(window).resize(function(){
		 		center = map.getCenter();
		 		google.maps.event.trigger(map, 'resize');
		 		map.setCenter(center);
		 	});
		}
  },

  /*
   * Init Tabs
   */
  initTabs: function () {

  	function ProjectInterface() {
      this.run = run;
      function run() {
      	var tabber = new HashTabber();
        tabber.run();
      }
  	}
  	var hashTabber = new ProjectInterface();
  	hashTabber.run();
  }
};

document.addEventListener('DOMContentLoaded', function() {
  Devday.init();
});
