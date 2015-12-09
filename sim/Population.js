function Population(n) {
	this.people = [];
	this.gridLen = Math.round(Math.sqrt(n));
	
	//create the people and infect prevalence % of them
	for(i = 0; i< n; i++) {
		var p = new Person();
		this.people[p.id] = p;
	} //end for
	
	/**
	infect person (mainly used in initialization)
	**/
	this.infect = function(t_,infection_,prevalence_) {
		for(i = 0; i< n; i++) {
			if(SimpleEpiUtil.rollDiceProb(prevalence_)) {
				this.people[i].infect(t_,infection_);
			}
		}
	}
	
	/** 
	updates the population a single timestep
	**/
	this.update = function(t_,heatmap_) {	
		var state = "<h4>t="+t_+"</h4>\n\n";
		
		//for each person...
		for(i = 0; i< this.people.length; i++) {			

			//update the person's internal state
			this.people[i].updateInternalState(t_);

			
			//see if person infects anyone
			if(this.people[i].infectionState) {	
			
				if(this.people[i].infectionState.state == INFECTED) {		
				
					//check north
					var north= i - this.gridLen;
					if(north > 0) {
						this.people[i].contactMade(this.people[north], t_); 	
					}
					
					//check south
					var south = i + this.gridLen;
					if(south < n) {
						this.people[i].contactMade(this.people[south], t_); 	
					}
					
					//check east				
					if( (i % this.gridLen) < this.gridLen-1) {
						this.people[i].contactMade(this.people[i+1], t_) ;				
					}
					
					//check west
					if( (i % this.gridLen) > 0) {
						this.people[i].contactMade(this.people[i-1], t_); 		
					}
				}
			}
			


			//update the viz
			state+=(this.people[i].toString(t_)+"<br>\n");
			if(this.people[i].infectionState) {
				heatmap_.updateCellColor(this.people[i].id,this.people[i].infectionState.state);		
			}
		}
		return state;
	}
}