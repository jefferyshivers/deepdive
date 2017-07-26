// authentication stuff
//User makes an account //change the css id of the frontend 

function makeEmailAccount(email, password){
	//make an account
	//log in
	//send verification email
	//if it's verified login
	firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
	  console.log('account made')

	  firebase.auth().onAuthStateChanged(function(user) {
		console.log('first logged in')
			if(user){
				user.sendEmailVerification().then(function() {
			  		console.log('email sent')
			  		// console.log(firebase.auth().currentUser)
			  		firebase.auth().signOut().then(function() {
						console.log('signout successful')
						}).catch(function(error) {
						// An error happened.
						});
				}, function(error) {
			  		var errorCode = error.code;
				  	var errorMessage = error.message;
				  	console.log(errorCode)
				  	console.log(errorMessage)
				});
			}else{
				console.log('verification email not sent')
			}
		  	

		  // ...	
		}, function(error){
			var errorCode = error.code;
		  	var errorMessage = error.message;
		  	console.log(errorCode)
		  	console.log(errorMessage)
		});
	  // ...
	}, function(error) {
		var errorCode = error.code;
	  	var errorMessage = error.message;
	  	console.log(errorCode)
	  	console.log(errorMessage)
	  	if(errorMessage = "The email address is already in use by another account."){
	  		alert(errorMessage)
	  	}
	});

}

function loginVerifiedEmailAccount(email, password){
	firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
		if (firebase.auth().currentUser.emailVerified === false){
			firebase.auth().signOut().then(function() {
				alert('You are not verified')
				}).catch(function(error) {
					var errorCode = error.code;
				  	var errorMessage = error.message;
				  	console.log(errorCode)
				  	console.log(errorMessage)
				});



		} else{
				// ask: does user data exist in /user
				// if so, then do nothing
				// if not, then: writeInitialUserData(userID,email)
				var userRef = firebase.database().ref('users');
				userRef.on('value', function(snapshot) {
					var uid = firebase.auth().currentUser.uid;
					var email = firebase.auth().currentUser.email;
					var email_split_list = firebase.auth().currentUser.email.split('@')
					var emailUsername = email_split_list[0].toLowerCase()
					var key = Object.keys(snapshot.val());
					if (key.includes(uid) === false){
						writeInitialUserData(uid, email, emailUsername)

						// console.log('user info newly added to database')
					} else {
						// console.log('userID already included in database')	
					}
				});
			// console.log('you are logged in')
		}
	})
}



function writeInitialUserData(userID,email, username) {
	firebase.database().ref('users/' + userID).set({
    'uid': userID,
    'email' : email,
    'username' : username,
    'followers' : {
    	'dummy-useruid' : 'dummy-username'
    },
    'following' : {
    	'dummy-useruid' : 'dummy-username'
    },
    'collections' : {
        'dummy-collection' : true
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


function signOut(){
	firebase.auth().signOut().then(function() {
  // Sign-out successful.
  	console.log("signed out successfuly")
	}, function(error) {
	  var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode)
		console.log(errorMessage)
	});
}

////////////////////////




