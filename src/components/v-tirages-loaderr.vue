<template>
	 <div><b>Tirages</b><br>
	 	<v-occurences v-if="afficheDialogOccurences" :datas_occurences="datasOccurences" @closeDialog="closeDialiogOcc"></v-occurences>	
	 	<br>
	  <div class ="containerLarge" id="divPanel6">
	  	 <span class="entete_date">Panel de sortie sur 6 derniers tirages</span><br>
	  	
	  	 <v-case v-for="item in panel6" :id="'case_' + item" :title="coolTitle(freqdatas, item)" :boule="item" :frequences="freqdatas">  </v-case>
	  	  <v-btn @click="occurence_panel('divPanel6')"
                icon
                color="green"
              >
              <v-icon>mdi-cached</v-icon>
        </v-btn>
	  	
	  </div><br>


	  <div class ="containerLarge" id="divPanel8">
	  	 <span class="entete_date">Panel de sortie sur 8 derniers tirages</span><br>
	  	  <v-case v-for="item in panel8" :id="'case_' + item" :title="coolTitle(freqdatas, item)" :boule="item" :frequences="freqdatas">  </v-case>
	  	  <v-btn @click="occurence_panel('divPanel8')"
                icon
                color="green"
              >
              <v-icon>mdi-cached</v-icon>
        </v-btn>

	  </div><br>

	  <div class ="containerLarge" id="divPanel10">
	  	 <span class="entete_date">Panel de sortie sur 10 derniers tirages</span><br>
	  	  <v-case v-for="item in panel10" :id="'case_' + item" :title="coolTitle(freqdatas, item)" :boule="item" :frequences="freqdatas">  </v-case>
	  	  <v-btn @click="occurence_panel('divPanel10')"
                icon
                color="green"
              >
              <v-icon>mdi-cached</v-icon>
        </v-btn>

          <v-btn @click="regle_des_trois(panel10)"
                icon
                color="green"
              >
              <v-icon>mdi-alert-decagram</v-icon>
        </v-btn>
           <v-btn @click="addTentative('divPanel10')"
                icon
                color="green"
              >
              <v-icon>mdi-alpha-a-circle</v-icon>
        </v-btn>
          <v-alert
      type="success"
      variant="outlined"
      v-if="afficheTentative"
    >
      Test enregistré, au prochain tirage, vous serez averti en cas de succès d'un test
    </v-alert>
	  </div><br>

	  <div class ="containerLarge" id="divPanelautre">
	  	 <span class="entete_date">Panel de sortie des numeros non sortis sur 10 tirages</span><br>
	  	  <v-case v-for="item in panelautre" :id="'case_' + item" :title="coolTitle(freqdatas, item)" :boule="item" :frequences="freqdatas">  </v-case>
	  	  <v-btn @click="occurence_panel('divPanelautre')"
                icon
                color="green"
              >
              <v-icon>mdi-cached</v-icon>
        </v-btn>



	  </div><br>

	  <v-span v-for="(item, index) in tir_datas" :key="index" 
 					
           :style="{ backgroundColor: item.backgroundColor }"
	  >

		  
		  <v-span 
            @click="occurencesTir(item, index)">{{ item.TIR_DATE }}</v-span>
		     
		  <v-case :title="coolTitle(freqdatas, item.TIR_1)" :boule="item.TIR_1" :frequences="freqdatas">  </v-case>
	  	<v-case :title="coolTitle(freqdatas, item.TIR_2)" :boule="item.TIR_2" :frequences="freqdatas">  </v-case>
	  	<v-case :title="coolTitle(freqdatas, item.TIR_3)" :boule="item.TIR_3" :frequences="freqdatas">  </v-case>
	  	<v-case :title="coolTitle(freqdatas, item.TIR_4)" :boule="item.TIR_4" :frequences="freqdatas">  </v-case>
	  	<v-case :title="coolTitle(freqdatas, item.TIR_5)" :boule="item.TIR_5" :frequences="freqdatas">  </v-case>
	  	  
		 
		  
		  <span  class="entete_date">
			  -
		  </span>
		  <span v-if="item.TIR_C>0" class="case">
			  {{ item.TIR_C }}
		  </span>
		  <span v-else-if="item.TIR_C<=0" class="case">
			  {{  }}
		  </span>
		  
		  <span class="entete_date" style="font-size:8px"> Distances pour chaque numéros depuis derniere sortie</span>
		   <span class="case">
			  {{ item.distances[0] }}
		  	</span>
		  	<span class="case">
			  {{ item.distances[1] }}
		  	</span>
		  	<span class="case">
			  {{ item.distances[2] }}
		  	</span>
				<span class="case">
			  {{ item.distances[3] }}
		  	</span>		  	
		  	<span class="case">
			  {{ item.distances[4] }}
		  	</span>
		  	 <span class="entete_date" style="font-size:8px"> Distance Max</span>
		  	 <span class="case">
			  {{ item.max_distance }}
		  	</span>
		  <br>
	
	  </v-span>
	   

	  </div>
</template>
<script setup>
import VCase from "@/components/v-case.vue"
import { ref, onMounted, inject, watch, computed } from 'vue';
import {ApiGetFromServer, 
        ApiPostToServer, 
        ApiPutToServer, 
        ApiPatchToServer} from '@/utils/general_vue.js';
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

//const occurencesLoader = () => import("./occurencesLoader.js")
const props = defineProps({

	tir_datas: Array,
		panel6: Array,
		panel8: Array,
		panel10: Array,
		panelautre: Array,
		freqdatas: Object,
		lesdistances: Object,
		
		uri: '',
		step: ''
})
const emits 										= defineEmits([])
const id 												= ref(null)
const isNotChecked 							= ref(true)
const isChecked 								= ref(false)
const datasOccurences 					= ref(null)
const	afficheDialogOccurences 	= ref(false)
const afficheTentative 					= ref(false)
const afficheTentativeGagnante 	= ref(false)
const isHovered 								= ref(false)
const hoveredIndex 							= ref(false)
const iid_memo 									= ref(0)
const regledestrois 						= ref(null) 

onMounted(()=>{
	afficheDialogOccurences.value = false;
	props.tir_datas[0].backgroundColor = '#FF0000';
})

function getBackgroundColor(index) {
      // Implement your logic to determine the background color based on index or other criteria
      // For example, alternating colors based on index:
      return index % 2 === 0 ? '#ff0000' : '#00ff00';
}
function coolTitle(element, i) {
		 	//ceck
		 	var msg = element.datas[i] + " Sorties / moy = " + element.moyenne_num; 
		 	msg += '\ndistance ' + props.lesdistances[i].distance + ", last : " + this.lesdistances[i].dernier;
		 	return msg

		 }
function  clickCasefunction(e) {
     		//alert(e);
     		isChecked.value = !isChecked.value;
				isNotChecked.value = !isNotChecked.value;

 }

function  closeDialiogOcc() {
     	afficheDialogOccurences.value = false;
}


/*


 regle_des_trois: function(items) {

     		var uri = "/myloto/includes/denombrement.php?panel=" + items.join(',');
      	 ApiGetFromServer(uri)
        .then(l_data => {
            if ('err_num' in l_data) {
             
              return;
            }
           
           // console.log("occurences brute : " + JSON.stringify(l_data));
            //console.log("occurences : " + JSON.stringify(l_data.datas));
            //cette variable est connectée à mon composant pagesLoader par le watcher
                
            this.regledestrois = l_data.datas;


            this.$emit("loadcombi",{'datas':l_data.datas});
        });


     },
     addTentative: function(range) {

     	var cases = document.getElementById(range).getElementsByClassName("casec");
     		
     		var tb = new Array();
     		Array.prototype.forEach.call(cases,function(el){
     			tb.push(el.innerText);
     		});
     		  	
			var uri = "/myloto/includes/tirages.php?action=tentative&pool=" + tb.join(',');
                
	        ApiGetFromServer(uri)
	        .then(l_data => {
	           
	           this.afficheTentative = true;
	          
	            setTimeout(() => {
		        	this.afficheTentative = false;
		      	}, 2000)

	           // this.datasOccurences = l_data.datas;
	           // this.afficheDialogOccurences = true;
	        });


     },
     occurencesTir: function(item, iid) {
     	  //:style="{ backgroundColor: getBackgroundColor(index) }"
     	this.tir_datas[iid].backgroundColor = '#FF0000';
     	this.tir_datas[this.iid_memo].backgroundColor = '#000000';
     	this.iid_memo = iid;
     	//Faire un rase event genre ici avec un param=iid ou plutot la date
     	//de l'autre coté intercepter l'event et lancer une nouvelle recherche
    
     	this.$emit("datechange",{'tir_date' :this.tir_datas[iid].TIR_DATE, 'index_base' : iid});
	     	var tb = new Array();
	     	tb.push(item.TIR_1);
	     	tb.push(item.TIR_2);
	     	tb.push(item.TIR_3);
	     	tb.push(item.TIR_4);
	     	tb.push(item.TIR_5);
	     	var uri = "/myloto/includes/tirages.php?action=occurences&pool=" + tb.join(',');
                
        ApiGetFromServer(uri)
        .then(l_data => {
            if ('err_num' in l_data) {
             
              return;
            }
            
            //cette variable est connectée à mon composant pagesLoader par le watcher
                
            this.datasOccurences = l_data.datas;
            this.afficheDialogOccurences = true;
        });

        

     },
     occurence_panel: function(range) {
     		var cases = document.getElementById(range).getElementsByClassName("casec");
     		
     		var tb = new Array();
     		Array.prototype.forEach.call(cases,function(el){
     			tb.push(el.innerText);
     		});
     		console.log("bouboules : " + tb);
     		
     	
				var uri = "/myloto/includes/tirages.php?action=occurences&pool=" + tb.join(',');
                
        ApiGetFromServer(uri)
        .then(l_data => {
            if ('err_num' in l_data) {
             
              return;
            }
            console.log("occurences brute : " + JSON.stringify(l_data));
            console.log("occurences : " + JSON.stringify(l_data.datas));
            //cette variable est connectée à mon composant pagesLoader par le watcher
                
            this.datasOccurences = l_data.datas;
            this.afficheDialogOccurences = true;
        });




     }

	}









*/
</script>
	
	
    
    