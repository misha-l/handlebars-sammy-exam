this.get('#edit/:id', function(context){
    const { id } = context.params
  
    DB.collection(collectionName)
        .doc(id)
        .get()
        .then((response) => {
             context.offer = { id, ...response.data() };
             extendContex(context)
                .then(function () {
                    this.partial('./templates/edit.hbs');
                });
        });
  });