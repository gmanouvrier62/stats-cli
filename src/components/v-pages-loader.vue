<template>
	 <iframe :src="currentPage" @load="iframeLoaded()" id="my_frame_base" width="100px" height="20px" style="display:none"></iframe>
</template>
<script setup>

import { ref, onMounted, inject, watch, computed } from 'vue';

const props = defineProps({
	links: Array,
	modelValue : Array,
	uri: String
})
const emits = defineEmits(['encours','complete1'])
const currentPageIdx = ref(0)
const currentPage = ref('')
const step = ref(1)
const tbDatas = ref([])

 //ex links qui contient donc les liens
/* ne marche pas en l'etat
 watch(() => props.modelValue, (value) => {
 	 if(value != null) {
  		console.log('LANCEMENT PROCESS');
  		console.log('nb pages' + props.modelValue.length);
  		console.log(' une url : ' + props.uri + newValue[currentPageIdx.value]);
  		currentPage.value = props.uri + newValue[currentPageIdx.value];   
    }
 }, { deep: true })
*/
onMounted(()=>{
	currentPage.value = props.uri + props.modelValue[currentPageIdx.value];   

});
function iframeLoaded(){
   console.log('frame loaded with ' + currentPage.value);
          
   var iframe = document.getElementById("my_frame_base");
   var iWindow = iframe.contentWindow;
	var iDocument = iWindow.document;

					
	//traitement de la premiere page telechargée
	if (step.value == 1) {
							
		//je récupère les divs
		var allDiv = iDocument.getElementsByTagName("div");
		       			
		for(var cptDiv=0;cptDiv<allDiv.length;cptDiv++) {
			//console.log("dans le for");
			if(allDiv[cptDiv].className == "row stripped odd d-flex align-items-center" || allDiv[cptDiv].className == "row stripped even d-flex align-items-center") {
				       		
				var concernedDiv = allDiv[cptDiv];
	 			//pb il y a des odd et even, a revoir
	 			var lienD = concernedDiv.children[0].getElementsByTagName("a");
	 			lienD = lienD[0].href;
	    		console.log("1 lien : " + lienD);
	    		//stockage pour lien2 du tirage 2
	    		tbDatas.value.push(lienD);
	    		var tbL = lienD.split("-");
	    		var Y = tbL[7];
	    		Y = Y.replace(".htm","");
	    		Y = Y.replace(".html","");
	    		var dt = tbL[5] + " " + tbL[6] + " " + Y;  
	    		dt += " : ";
    			
    		}
		}
		currentPageIdx.value ++;
		if(currentPageIdx.value<props.modelValue.length){
		currentPage.value = props.uri + props.modelValue[currentPageIdx.value];  
			var tom = 1;
		} else {
			//on rebascule au server le tableau tbDatas.value
			console.log("tbDatas : " + tbDatas.length);
			emits('complete1', tbDatas.value);

		}        			
   }

  
       			



      		
}
</script>