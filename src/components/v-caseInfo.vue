export default {
  template:
	`
	  	 <span :id="l_id" :class="type" 
	  	 > {{boule}} </span>

`,
props: {
		id: String,
		boule: String,
		type: String,
		
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
		
      handleDragStart(index) {
      // Enregistrer l'index de l'élément glissé
      event.dataTransfer.setData("index", index);
    },
    handleDrop(targetIndex) {
      // Récupérer l'index de l'élément glissé
      const sourceIndex = event.dataTransfer.getData("index");
      // Réorganiser les éléments dans le tableau
      const draggedItem = this.items.splice(sourceIndex, 1)[0];
      this.items.splice(targetIndex, 0, draggedItem);
    }

	}

};