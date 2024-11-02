export default {
  template:
	`
	  	 <span :id="l_id" :class="getClasse()" 
	  	 @click="clickCase()" > {{boule}} </span>

`,
props: {
		id: String,
		boule: String,
		frequences: Object
		
	},
	data: () => ({
		l_id: null,
		isNotChecked: true,
		isChecked: false,
		
	}),
	created() {
	},
	mounted () {
	
		
	},
	watch: {
  	

	},
	methods : {
		
     clickCase: function(e) {
     		
     		this.isChecked = !this.isChecked;
				this.isNotChecked = !this.isNotChecked;


     },
     
     getClasse() {
     	//{case:isNotChecked, casec:isChecked}
     	if(this.isNotChecked) {
     		if(this.frequences.datas[this.boule]<this.frequences.moyenne_num)
     			return "faible";
     		if(this.frequences.datas[this.boule] == this.frequences.moyenne_num)
     			return "moyen";
     		if(this.frequences.datas[this.boule]>this.frequences.moyenne_num)
     			return "fort";


     	}

     	if(this.isChecked) {
     		return "casec";
     	}

     },

	}

};