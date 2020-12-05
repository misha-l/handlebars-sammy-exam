this.post('#edit/:id', function(context) {
    const { id, productName, price, brand, description, imageUrl } = context.params

    clients = [];
    
    DB.collection(collectionName)
         .doc(id)
         .get()
         .then((response) => {
            return DB.collection('offers')
            .doc(id)
            .set({
               ...response.data(),
               productName,
               price,
               brand,
               description,
               imageUrl,
               clients
            })
         })
         .then((response) => {
         this.redirect(`#details/${id}`)
         .catch(errorHandler)})
 });