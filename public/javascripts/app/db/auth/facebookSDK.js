window.fbAsyncInit = function() {
    FB.init({
      appId      : '122276358384168',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();   
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

//The SDK should be the one we are using. This is my own SDK for testing purpose 
//This script should be right after the <body> tag 


//facebook authentication 

//Go to firebase console and activate Facebook auth
//should get App ID and App Secret in Facebook for Developers 
//https://youtu.be/8XnUs2xY5c4
//the link above tells you how to do it 

// FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
// });

var provider = new firebase.auth.FacebookAuthProvider();

function writeFacebookUserData(userID, username) {
  firebase.database().ref('users/' + userID).set({
      'uid': userID,
      'username': username,
      'followers' : {
        'dummy-useruid' : 'dummy-username'
      },
      'collections' : {
        'dummy-collection' : true
      },
      'following' : {
        'dummy-useruid' : 'dummy-username'
      },
      'contents' : {
        'dummy' : true
      },
      'added-contents' : {
        'dummy' : true
      },
      'moments' : {
        'dummy' : {
          'dummy' : true
        }
      }
    });
}



function facebookSignin() {
  firebase.auth().signInWithPopup(provider)
   
   .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;

      console.log(token)
      console.log(user)

      var userRef = firebase.database().ref('users');
        userRef.on('value', function(snapshot) {
          var uid = firebase.auth().currentUser.uid;
          var username = firebase.auth().currentUser.displayName;

          var usernameList = username.split('')
          cleanUserNameList = []
          for(i=0; i<usernameList.length; i++){
            if(usernameList[i] != ' '){
              cleanUserNameList.push(usernameList[i])
            }
          }
          var realUsername = cleanUserNameList.join('')

          var key = Object.keys(snapshot.val());
          if (key.includes(uid) === false){
            writeFacebookUserData(uid,realUsername)

            // console.log('user info newly added to database')
          }else{
            // console.log('userID already included in database')  
          }
        });

   }).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
   });
}

function facebookSignout() {
   firebase.auth().signOut()
   .then(function() {
      console.log('Signout successful!')
   }, function(error) {
      console.log('Signout failed')
   });
}

// NOTE: ----------------------------------------
// $(function(){
//   $('#testfbsubmit').click(function(){
//     facebookSignin();
//   });
// });
// You have to run the function this way to make
// it work when clicking a button
// ----------------------------------------------