
/**
	Holds parameters for a particular infectious agent

	Future work: mutations, strains, drug sensitivity, resistance, etc.
	
**/
function Infection() {		
	var NOT_INIT = -1;
	
	//------ < BEGIN Constants and Parameters >---------//
	this.disease = "";
	
	//save infection parameters
	this.beta = NOT_INIT;
	//this.alpha = NOT_INIT;
	//this.gamma = NOT_INIT;
	//this.mu = NOT_INIT;		
	
	//TODO: change these to random variables...	
	//determines times spent in each period of infection
	this.incubationPer = NOT_INIT;			//incubation period of last infection
	this.infectionDuration= NOT_INIT;		//duration of last infection (inc. incubation)
	this.immunityDuration = NOT_INIT;		//period of immunity
	//------ < END Constants and Parameters >---------//
	
		/**
	Parameter for a particular strain of a disease
		
	beta_: contact rate. prob of spreading disease to someone susceptible
	incubationPer_:  	constant period of incubation after EXPOSURE
	infectionDuration_:	constant period of infection after EXPOSURE
	immunityDuration_:	constant period of immunity after RECOVERED
	
	--> eventually we want to use random variables...
		alpha -- (1/a) = period of incubation after infection 
		gamma - rate of recovery 
		mu - death rate
		//this.infect = function(disease, beta_, alpha_, gamma_, mu_) {	
	**/		
	this.init = function(disease_, beta_, incubationPer_,infectionDuration_,immunityDuration_) {		
		this.disease = disease_;		
		//save infection parameters
		this.beta = beta_;
		//this.alpha = alpha_;
		//this.gamma = gamma_;
		//this.mu = mu_;		
		
		//TODO: change these to random variables...	
		//determines times spent in each period of infection
		this.incubationPer = incubationPer_;			//incubation period of last infection
		this.infectionDuration= infectionDuration_;		//duration of last infection (inc. incubation)
		this.immunityDuration = immunityDuration_;		//period of immunity
	}
		
}