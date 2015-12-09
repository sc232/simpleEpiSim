var PERSON_ID_CTR = 0;

function Person() {	
	this.id = PERSON_ID_CTR++;
	//this.age = age;
	//this.gender = gender;
	
	//create a state of infection -- initially SUSCEPTIBLE
	this.infectionState = null;
	
	this.contactMade = function(p_, t_) {
		if(this.infectionState) {
			this.infectionState.contactMade(p_,t_);					
		}
	}
	
	/** 
	infect person (mainly used in initialization)
	**/
	this.infect = function(t_, infection_) {		
		//set infection parameters
		this.infectionState = new InfectionState();
		this.infectionState.infect(t_,infection_);
	}
	
	/**
	update the states of any infections this person has
	**/
	this.updateInternalState = function(t_) {
		if(this.infectionState)
			this.infectionState.updateInfectState(t_);
	}
	
	this.toString = function(t_) {
		
		var infectionStatus = "Susceptible";
		
		if(this.infectionState && this.infectionState.state > 0)
			infectionStatus = this.infectionState.toString(t_);
		
		return "Person "+this.id+": "+ infectionStatus;
	}
}