this.get('#like/:id', function(context) {

    const { id } = context.params

    DB.collection(collectionName).doc(id).get()
    .then((response) => {
        
        console.log(response.data());
        const currentLikedBy = response.data().likedBy;
        const realLikedBy = [];
        currentLikedBy.forEach(likedByEmail => {
            if (likedByEmail && likedByEmail != getUserData().email) 
                realLikedBy.push(likedByEmail)
        });
        realLikedBy.push(getUserData().email);
        console.log("realLikedBy: ", realLikedBy);
    
        DB.collection(collectionName).doc(id).update(
            { likedBy : realLikedBy}
        )
        .then(() => {
            this.redirect('#allSongs');
        }).catch(errorHandler)

    });


    
});