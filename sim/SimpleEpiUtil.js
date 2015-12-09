var SimpleEpiUtil = {

//============ GENERAL ==============//

	/** 
	helps give a descriptive error message
	**/
    errMsg : function(humanReadableErr, playerName, sysErr) {	
	try {
		console.log(humanReadableErr + "("+playerName+"):" + sysErr);
	} catch(e) {
		console.log("SimpleEpiUtil.errMsg: "+e);
	}  
  },

    //adapted from http://kcwebprogrammers.blogspot.com/2010/07/javascript-to-get-parameter-from-url.html
   urlParams : function() {
       var url = window.location.href;
       var paramMap = new Object();
       
       //return if there are no parameters
       if ( url.indexOf("?") < 0 ) return paramMap;
    
       // make array of all name/value pairs in query string
       var query_string = url.split("?");       
       var params = query_string[1].split("&");

       // loop through the parameters & add to map
       for (i=0; i < params.length;i++) {
	   var param_item = params[i].split("=");
	   
	   paramMap[param_item[0]] = param_item[1];
       }
       return paramMap;
   },



//============ MATH / RAND ==============//

	/**
	rolls dice against a given probability
	**/
	rollDiceProb : function(prob) {
		try {
			var roll = Math.random();
			return roll <= prob;
		} catch(e) {
			console.log("SimpleEpiUtil.rollDiceProb : "+e);
		}  
	},
	
	/**
	rolls dice and returns an integer between 0 and numChoices
	**/
    rollDiceInt : function (numChoices) {
	try {
	    var roll = Math.random();
	    return Math.round(roll*numChoices);
	} catch(e) {
		console.log("SimpleEpiUtil.rollDice : "+e);
	}  
	 
	},


	/**
	rolls dice and returns an integer between 0 and cdfArray.length. 
	probability of returning a number depends on the probabilities contained in CDFArray
	**/
    rollDiceCDF : function (cdfArray) {
	    var roll = Math.random();
	    for(i = cdfArray.length-1;i > 0; i--) {
	       if(roll > cdfArray[i]) 
			return i;	    
	    }

	    return 0;
	},


	/**
	Rounds a number to specified number of decimal places
	make this more efficient
	**/
   roundDecimal : function(x, numDecimalPlaces) {
	try { 

		var multiplier = Math.exp(10,numDecimalPlaces);
		return (Math.round(x * multiplier)/multiplier).toFixed(numDecimalPlaces);
	} catch(e) {
		alert("SimpleEpiUtil.roundDecimal:"+e);
	}
   },




	
}
