<template>
  <v-toolbar  color="#0075a1" class=" d-flex justify-end fluid corporatebg">
              
    <v-btn class="elevation-6 "  @click="launchImport">
      Import
    </v-btn>
     <v-btn class="elevation-6 "  @click="getAll">
      Get tirages
    </v-btn>
  </v-toolbar>
  <div v-if="flagImport">
  <v-pages-loader  v-model="tbLinks" :step="leStep" :uri="baseDomain" @encours ="progression_import" @complete1="allComplete1"></v-pages-loader>
   <v-progress-linear v-if="afficheProgress"
        color="success"
        :value="progress"
        height="25">
      </v-progress-linear>
  </div>


</template>

<script setup>
    import { ref, onMounted, inject, watch, computed } from 'vue';
  import {ApiGetFromServer, 
        ApiPostToServer, 
        ApiPutToServer, 
        ApiPatchToServer} from '@/utils/general_vue.js';
  
  import moment from 'moment';
  import 'moment/dist/locale/fr.js'; // Chemin correct pour les locales avec Vite

  moment.locale('fr'); // Définir la localisation sur le français
  const tbLinks = ref([])
  const leStep = ref(1)
  const progress = ref(0)
  const afficheProgress = ref(true)
  const baseDomain = ref('/assets/datas/')
  const flagImport = ref(false);
  // Convertir la date ISO en objet Date
  //const isoDate = "2024-01-20T21:00:00+00:00";
  //const date = new Date(isoDate);
  //const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss', { locale: fr });



// Formater la date
//const formattedDate = format(date, 'PPPPpp', { locale: fr });

  //import VBacTest from "@/components/v-bac-test.vue"
  import VPageLoader from "@/components/v-pages-loader.vue"
  //import VTiragesLoader from "@/components/v-tirages-loader.vue"
  //pour les images
  /*
    //import de la resource
    import logo from '@/assets/LogoLNB.png';
    // creation variable d'access à la resource
    const logoPath = ref(logo)

    //chargement plus loin dans le code : 
    //<v-img :src="logoPath"
  */
  onMounted(async ()=>{
    //var uri = import.meta.env.DOMAIN_API + "/api/tirages/";
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    /*
      base url https://www.lesbonsnumeros.com/loto/resultats/tirages-septembre-2024.htm
      
      donc 
      https://www.lesbonsnumeros.com/loto/resultats/tirages-
      + mois + -
      + année 
      + .htm

    */
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////

    var uri = "https://127.0.0.1:8000" + "/api/tirages/";
    let l_data = await ApiGetFromServer(uri);
    //console.log("les valids : " + JSON.stringify(l_data))
    if (l_data && l_data.length>0) {
        const formattedDate = moment(l_data[0].tir_date);
        var currentFile = frenchMonth("LOTO_ Tous les tirages et résultats de " + formattedDate.format('MMMM yyyy') + ".html");
        console.log("on aura : " + currentFile);
        
        const now = moment();
        console.log ("en base = " + formattedDate);  
        console.log ("now = " + now);  

        const diffInMonths = (now.diff(formattedDate, 'months')) + 1;
        console.log("soir un diff month de " + diffInMonths);
        
        tbLinks.value.push(currentFile);
        let newDate = formattedDate;
        for (var cpt=1;cpt<=diffInMonths;cpt++) {
          newDate = formattedDate.add(1, 'months');
          var lm = newDate.format("MMMM");
          var moisRefact = "";
          //SI BUG CE SERA ICI, ATTENTION, très fragile aux changements dans le site côté lesbons numeros
          if (lm=='août' || lm=='aout' || lm=='avril' || lm=='octobre') 
            moisRefact = "d'" + newDate.format('MMMM yyyy');
          else 
            moisRefact = "de " + newDate.format('MMMM yyyy');
          
          let chaine = frenchMonth("LOTO_ Tous les tirages et résultats " + moisRefact + ".html");
          tbLinks.value.push(chaine);
          
        }
        //A ce stade j'ai les noms des fichiers dont j'aurais besoin pour mettre à jour les tirages
        var tt = 1;
    }
  })

  async function allComplete1(links) {
    //le coposant m'a retourné la liste des pages journaliere à sauvegarder sur le server
    var uri = "https://127.0.0.1:8000" + "/api/tiragess/import";
    console.log("dans index vue links " + links.length);
    //attention à bien lire, ici, ce n'est pas un array que je dois envoyer mais un json dont la clef links à pour valeur un array
    const postArray= {
      links: links
    };
    
    let l_data = await ApiPostToServer(uri, postArray);

  }
  function progression_import(status_import){progress.value = status_import;}
  function launchImport() {
    flagImport.value = true;
  }
  function frenchMonth(content) {
    // très mais alors très sale mais flemme de faire des recherches approfondies d'autant plus que le moment.setlocale de marche pas
    return content;
  }
  async function getAll(){
    var uri = "https://127.0.0.1:8000" + "/api/tirages/toto";
    let l_data = await ApiGetFromServer(uri);
    //console.log("les valids : " + JSON.stringify(l_data))
    if (l_data ) {
      console.log("ok" + l_data);
    }

  }
</script>
