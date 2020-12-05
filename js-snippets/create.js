this.post('#create', function(context){
    const {title, artist, imageURL} = context.params;
    const likedBy = [];
  
    DB.collection(collectionName).add({
     title, artist, imageURL, likedBy,
     creator: getUserData().uid
    }).then((createSong) =>{
        this.redirect('#home');
        
    }).catch(errorHandler)
  })