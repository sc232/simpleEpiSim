var INFECTED = 2;

function InfectionState() {		
			
	//------ < BEGIN Constants and Parameters >---------//	
	
	//constants of infection state
	this.SUSCEPT = 0;
	this.EXPOSED = 1;
	this.INFECTED = 2;
	this.RECOVERED = 3;
	this.DEATH = 4;

	this.STATE_STRS = ["SUSCEPT","EXPOSED","INFECTED","RECOVERED","DEATH"];
	
	//current state of infection / recovery
	this.infectAgent = null;		//agent of infection (virus, etc.)
	this.state = this.SUSCEPT;		//infection state
	this.timeLastStateChange = -1;	//time that state last changed
	this.timeLastExposed = -1;		//time of last exposure
	this.timeLastRecovered = -1;	//time of last recovery
		
	//------ < END Constants and Parameters >---------//	
	

	/**
		Determines whether get infected from contact w/ the infection
		
		p_ : person come into contact with
		t_ : current timestep
	**/
	this.contactMade = function(p_, t_) {			
	
		//if you are infected & you meet someone susceptible
		if(this.state == this.INFECTED) {			
			if ((p_.infectionState == null) || (p_.infectionState.state == this.SUSCEPT)) {				
					//alert("trying to infect:"+ p_.id);

					//you get infected with probability = beta
					if(SimpleEpiUtil.rollDiceProb(this.infectAgent.beta))
						p_.infect(t_,this.infectAgent);
			}
		}
	} //end this.contact

	
	
	/**
	update state to reflect incubation period
	**/
	this.infect = function(t_,infection_) {				
		this.state = this.EXPOSED;		
		this.infectAgent = infection_;
		this.timeLastExposed = t_;	
		this.timeLastStateChange = t_;		
	}
		
	/**
		will update what's going on inside of a person based on the particular infection
	**/
	this.updateInfectState = function(t_) {
		switch(this.state) {
			case this.SUSCEPT:
				//nothing happens internally if you're susceptible
				break;
			case this.EXPOSED:
				//update to infected after incubation period up
				if((t_ - this.timeLastExposed) >= this.infectAgent.incubationPer) {
					this.state = this.INFECTED;
					this.timeLastStateChange = t_;
				}
				break;
			case this.INFECTED:
				//update to recovered after infection time is up
				if((t_ - this.timeLastStateChange ) >= this.infectAgent.infectionDuration) {
					this.state = this.RECOVERED;
					this.timeLastRecovered = t_;
					this.timeLastStateChange = t_;
				}
				break;
			case this.RECOVERED:
				//if immunity time is up, make person susceptible again
				if((t_ - this.timeLastRecovered) >= this.infectAgent.immunityDuration) {
					this.state = this.SUSCEPT;
					this.timeLastStateChange = t_;				
				}
				break;
			default:
				//shouldn't get here...
		}
	}
		
	this.toString = function(t_) {
		return this.infectAgent.disease + ":" +this.STATE_STRS[this.state] + " for " + (t_-this.timeLastStateChange);	
	}						
						
}