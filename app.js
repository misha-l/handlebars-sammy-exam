const UserModel = firebase.auth();
const DB = firebase.firestore();

const collectionName = 'songs';

const app = Sammy('#container', function() {

    this.use('Handlebars', 'hbs');


    /* user related functionality: register, login, logout */
    this.get('#register', function(context) {
        extendContex(context)
             .then(function () {
                 this.partial('./templates/register.hbs');
        });
    });

    this.post('#register', function(context) {
        const { email, password} = context.params;
        console.log(context.params)
        UserModel.createUserWithEmailAndPassword(email, password)
                 .then((userData) => {
                     console.log(userData);
                     this.redirect('#login');
                  })
                  .catch((error) => console.log(error));
      });
  
    this.get('#login', function(context) {
        extendContex(context)
             .then(function () {
                 this.partial('./templates/login.hbs');
        });
    });

    this.post('#login', function(context) {
        const {email, password} = context.params;
        UserModel.signInWithEmailAndPassword(email, password)
        .then((userData) => {
          saveUserData(userData);
          this.redirect('#home');
        })
        .catch(errorHandler);
      })

    this.get('#logout', function(context) {
        UserModel.signOut()
                .then((response) => {
                    clearUserData();
                    this.redirect('#home')
                }).catch(errorHandler);
    });
 

    /* home */
    this.get('#home', function(context) {
        extendContex(context)
             .then(function () {
                 this.partial('./templates/home.hbs');
        });
    });
    
    /* list */
    this.get('#allItems', function(context) {

    });
    

    /* create */
    this.get('#create', function(context) {
        extendContex(context)
        .then(function () {
            this.partial('./templates/create.hbs');
       });
      
    });

    this.post('#create', function(context) {
  
    })

    /* additional functionality */

    this.get('#like/:id', function(context) {
        
    });

    /* delete */

    this.get('#delete/:id', function(context) {

        const { id } = context.params
        DB.collection(collectionName).doc(id).delete()
        .then(() => {
            this.redirect('#home');
        }).catch(errorHandler)

    });


});
  
  (() => {
    app.run('#home')
  })();

  /* helper functions */

  function getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  
  function extendContex(context) {
    const user = getUserData();
    context.isLoggedIn = Boolean(user);
    context.userEmail = user ? user.email : "";
  
    return context.loadPartials({
     'header': './partials/header.hbs',
     'footer': './partials/footer.hbs'
    })
  }

  function saveUserData(data) {
    const {user: {email, uid }} = data;
    localStorage.setItem('user', JSON.stringify({email, uid}))
  }
  
  function getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  function errorHandler(error) {
    console.log(error)
  }

  function clearUserData() {
    this.localStorage.removeItem('user')
  }