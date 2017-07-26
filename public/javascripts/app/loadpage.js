function loadpage() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user && !user.isAnonymous) {
      // console.log('is user')
      $('#dropdown-profile-container').css({
        'visibility':'visible'
      })      
      $('#dropdown-login-container').css({
        'visibility':'hidden'
      })
      $('.top-nav .add-and-user').css({'display':'block'})
      $('.top-nav .signup-or-login').css({'display':'none'})
    } else {
      // console.log('is not user')
      $('#dropdown-login-container').css({
        'visibility':'visible'
      })
      $('#dropdown-profile-container').css({
        'visibility':'hidden'
      })   
      $('.top-nav .add-and-user').css({'display':'none'})
      $('.top-nav .signup-or-login').css({'display':'block'})

      // fallback

      firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

      
    }
  });  

  // load the dropdown profile div
  // firebase.auth().signOut()
}





function addCSS(fileName) {

  var head = document.head
    , link = document.createElement('link')

  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = fileName

  head.appendChild(link)
}