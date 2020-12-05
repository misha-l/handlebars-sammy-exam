this.get('#home', function(context){
    DB.collection(collectionName)
        .get()
        .then((response) => {
            context.offers = [];
            response.forEach((offer) => {
                context.offers.push({ id: offer.id, ...offer.data() });
            });
            extendContex(context)
                .then(function () {
                    this.partial('./templates/home.hbs');
            });
          })
          .catch(errorHandler)
  });