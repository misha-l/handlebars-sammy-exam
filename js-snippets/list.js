this.get('#allSongs', function(context) {

    DB.collection(collectionName)
        .get()
        .then((response) => {
            
            const { uid } = getUserData();
             context.songs = [];
             response.forEach((song) => {
                console.log(song.data())
                 const createdByMe = song.data().creator === getUserData().uid ;
                 const numLikes = song.data().likedBy.length;
                 context.songs.push({ id: song.id, ...song.data(), createdByMe, numLikes }); 
             });

            
             
             extendContex(context)
                .then(function () {
                     this.partial('./templates/allSongs.hbs');
             });
        })
        .catch(errorHandler)

});