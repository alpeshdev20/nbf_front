"use strict";

/*
	Author ~ Ajithkumar Madhavnkutty
	Company ~ Sterco Digitex Pvt Ltd
*/

(function () {

    var StageResize = {}

    var w =  0;
	var h =  0;
	var newH = 0;
	var newW = 0;
	var mainW = 0;
	var mainH = 0;

    function makeResponsive ()
	{		
		w =  innerWidth;
		h =  innerHeight;
		mainW = propertyWidth;
		mainH = propertyHeight;
		$("#canvas_area").removeClass("large").removeClass("small");
		if((w/h) > (mainW /mainH))
		{
			mainH = (h/mainH);
			$("#canvas_area").addClass("large").css("transform", "scale("+mainH+")");
		}
		else
		{
			mainW = (w/mainW);
			$("#canvas_area").addClass("small").css("transform", "scale("+mainW+")");    
		}
		newH  = $("#canvas_area")[0].getBoundingClientRect().height;
		newW  = $("#canvas_area")[0].getBoundingClientRect().width;
		if(newW == w)
		{
			$("#canvas_area").css("top", Math.round((h - newH)/2)).css("left", "0");
		}
		else
		{
			$("#canvas_area").css("left", Math.round((w - newW)/2)).css("top", "0");
		}
		
	}
	
	$(document).ready(function(e) 
	{
		w =  innerWidth;
		h =  innerHeight;
		if(innerWidth >= propertyWidth || innerHeight > propertyHeight)
		{
			$("#canvas_area").css("top", Math.round((h/2)-(propertyHeight/2))).css("left", "0");
		}
		$(window).resize(function()
		{
			if(innerWidth < propertyWidth || innerHeight < propertyHeight)
			{
				makeResponsive();
			}
			else
			{
				$("#canvas_area").removeClass("small").removeClass("large").removeAttr("style");
				h =  innerHeight;
				$("#canvas_area").css("top", Math.round((h/2)-(propertyHeight/2))).css("left", "0");
			}
		})
		if(innerWidth < propertyWidth || innerHeight < propertyHeight)
		{
			makeResponsive();
		}
	});

    window.StageResize = StageResize;
}());

