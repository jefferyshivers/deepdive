function follow(followingID){
	var uid = firebase.auth().currentUser.uid
	var dbUser = firebase.database().ref('users')
	dbUser.once('value').then(function(snapshot){
		var val = snapshot.val()
		var followerUsername = val[uid]['username']
		var followingUsername = val[followingID]['username']
		// console.log(followerUsername)
		// console.log(followingUsername)
		dbUser.child(uid).child('following').child(followingID).set(followingUsername)
		dbUser.off()
		dbUser.child(followingID).child('followers').child(uid).set(followerUsername)
		dbUser.off()
	})
}

function unfollow(followingID){
	var uid = firebase.auth().currentUser.uid
	var dbUser = firebase.database().ref('users')
	dbUser.once('value').then(function(snapshot){
		var val = snapshot.val()
		var followerUsername = val[uid]['username']
		var followingUsername = val[followingID]['username']
		// console.log(followerUsername)
		// console.log(followingUsername)
		dbUser.child(uid).child('following').child(followingID).set(null)
		dbUser.off()
		dbUser.child(followingID).child('followers').child(uid).set(null)
		dbUser.off()
	})
}	


//unfollow('opyTWqnX6iRAccyri7FThLogR6H2')
//follow('opyTWqnX6iRAccyri7FThLogR6H2')