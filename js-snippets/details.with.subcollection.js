this.get('#details/:id', function(context) {
    const { id } = context.params;
    let likedByUser = false;
    let likes = 0;

    DB.collection(collectionName).doc(id).get()
        .then((response) => {
            const imCreator = response.data().creator === getUserData().uid
        
            DB.collection('offers').doc(id)
            .collection('likedBy') // .where("who", "==", getUserData().email)
            .get()
            .then((responseLikes) => {
                responseLikes.forEach((bla) => {
                    likes++
                    if (bla.data().who === getUserData().email) {
                        likedByUser = true;
                    }
                });

                context.offer = {...response.data(), imCreator, likes, id, likedByUser}

                extendContex(context)
                .then(function () {
                    this.partial('./templates/details.hbs');
                });
                
            })    
            

        });

  });