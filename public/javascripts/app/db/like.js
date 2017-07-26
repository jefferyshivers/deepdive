function selectLike(contentKey, artist){
	var uid = firebase.auth().currentUser.uid
	var dbUser = firebase.database().ref('users/' + uid)
	var dbArtist = firebase.database().ref('artists/' + artist)
	dbUser.once('value').then(function(snapshot){
		var val = snapshot.val()
		var likesVal = val['likes']
		delete likesVal['dummy']
		var likesKeys = Object.keys(likesVal)

		if(!likesKeys.includes(contentKey)){
			dbUser.child('likes').child(contentKey).set(true)
			dbUser.off()
			dbArtist.once('value').then(function(snapshot){
				var valArtist = snapshot.val()
				var contentObject = valArtist['allcontent'][contentKey]
				var contentMoment = contentObject['parent-moment']
				var contentVote = contentObject['votes']
				contentVote += 1
				dbArtist.child('allcontent').child(contentKey).child('votes').set(contentVote)
				dbArtist.off()
				dbArtist.child('moments').child(contentMoment).child('content').child(contentKey).child('vote').set(contentVote)
				dbArtist.off()
			})	

		}else{
			dbUser.child('likes').child(contentKey).set(null)
			dbUser.off()
			dbArtist.once('value').then(function(snapshot){
				var valArtist = snapshot.val()
				var contentObject = valArtist['allcontent'][contentKey]
				var contentMoment = contentObject['parent-moment']
				var contentVote = contentObject['votes']
				contentVote -= 1
				dbArtist.child('allcontent').child(contentKey).child('votes').set(contentVote)
				dbArtist.off()
				dbArtist.child('moments').child(contentMoment).child('content').child(contentKey).child('vote').set(contentVote)
				dbArtist.off()
			})	
		}
	})
}

// selectLike('-Kp_V4xB6y1DXjEyGrrz', 'frank ocean')
