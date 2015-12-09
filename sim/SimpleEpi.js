/**
Called when web-page is loaded
**/
$(document).ready( function(){	

	//default parameters
	var t = 0;				//current time in the sim
	var maxTime = 100;		//max time in sim
	var viewerTimestepMS = 1000;	//# ms between each step
	var n = 900;				//population size (pick a square # for best viewing)	
	var prev = 0.1;		//init prevalence of disease
	 //init a cold infection: 10% trans, 3 incubation, 10 infection, 30 immunity
	var infection = new Infection();		
	var beta = 0.1;
	var incubationTime = 3;
	var infectionTime = 10;
	var immuneTime = 30;
	var gridWidthPx = 500;

	//holds any parameters passed through the URL
	var urlParamMap = SimpleEpiUtil.urlParams();
	if(urlParamMap["n"])
		n = urlParamMap["n"];		
	if(urlParamMap["prev"])
		prev = urlParamMap["prev"];
	if(urlParamMap["maxTime"])
		maxTime = urlParamMap["maxTime"];
	if(urlParamMap["beta"])
		beta = urlParamMap["beta"];
	if(urlParamMap["incubTime"])
		incubationTime = urlParamMap["incubTime"];
	if(urlParamMap["infectTime"])
		 infectionTime = urlParamMap["infectTime"];
	if(urlParamMap["immuneTime"])
		immuneTime = urlParamMap["immuneTime"];	

	
	//create an infection
	infection.init("Common cold", beta, incubationTime,infectionTime,immuneTime);	

	//create population & infect a portion
	var pop = new Population(n);
	pop.infect(t, infection,prev);
	
	//create heatmap to display
	var heatmap = new HeatMapGrid("#heatmap",n,gridWidthPx);
	//heatmap.setColor(1,1,20);
	
	// main loop of the simulation -- done this way to artificially introduce a delay
	singleTimestep = function() {
		
		//update title HTML
		$('#timeTitle').html('Time='+t);
		
		//generate detailed status
		var statusTxt = pop.update(t,heatmap);		
		$("#commentary").html(statusTxt);
		
		if(t++ >=  maxTime)
			clearInterval(ticker);
	}
	var ticker = setInterval("singleTimestep()", viewerTimestepMS);		
		
	
});