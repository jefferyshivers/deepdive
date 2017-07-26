function vote(musician, moment, ContentKey, entry){
	var uid = firebase.auth().currentUser.uid
	var dbUserContents = firebase.database().ref('users/' + uid + '/contents')
	var dbArtist = firebase.database().ref('artists/'+musician)
	dbUserContents.once('value').then(function(snapshot){
		var val = snapshot.val()
		var contentKeyList = Object.keys(val)

		if (!contentKeyList.includes(ContentKey)){
			console.log('not voted')
			dbUserContents.child(ContentKey).set({artist : musician, type : entry})
			dbUserContents.off()
				console.log("votes added!")
				dbArtist.once('value').then(function(snapshot){
					var artistval = snapshot.val()
					var allcontent = artistval['allcontent']
					var specificContent = allcontent[ContentKey]
					var value = specificContent['votes']
					value += entry
					dbArtist.child('allcontent').child(ContentKey).child('votes').set(value)
					dbArtist.off()
					dbArtist.child('moments').child(moment).child('content').child(ContentKey).child('vote').set(value)
					dbArtist.off()
					console.log("votes added! in Too")
				})
		}else if(entry != val[ContentKey]['type']) {

			dbUserContents.child(ContentKey).child('type').set(entry)
			dbUserContents.off()

			if(val[ContentKey]['type'] === 0){
				dbArtist.once('value').then(function(snapshot){
					var artistval = snapshot.val()
					var allcontent = artistval['allcontent']
					var specificContent = allcontent[ContentKey]
					var value = specificContent['votes']
					value += entry
					dbArtist.child('allcontent').child(ContentKey).child('votes').set(value)
					dbArtist.off()
					dbArtist.child('moments').child(moment).child('content').child(ContentKey).child('vote').set(value)
					dbArtist.off()
					console.log("votes added! in Too")
				}) 
			}else{
				dbArtist.once('value').then(function(snapshot){
					var artistval = snapshot.val()
					var allcontent = artistval['allcontent']
					var specificContent = allcontent[ContentKey]
					var value = specificContent['votes']
					value += 2*entry
					dbArtist.child('allcontent').child(ContentKey).child('votes').set(value)
					dbArtist.off()
					dbArtist.child('moments').child(moment).child('content').child(ContentKey).child('vote').set(value)
					dbArtist.off()
					console.log("votes added! in Too")
				})
			}					
		}else{
			dbUserContents.child(ContentKey).child('type').set(0)
			dbUserContents.off()

			dbArtist.once('value').then(function(snapshot){
				var artistval = snapshot.val()
				var allcontent = artistval['allcontent']
				var specificContent = allcontent[ContentKey]
				var value = specificContent['votes']
				value -= entry
				dbArtist.child('allcontent').child(ContentKey).child('votes').set(value)
				dbArtist.off()
				dbArtist.child('moments').child(moment).child('content').child(ContentKey).child('vote').set(value)
				dbArtist.off()
				console.log("votes added! in Too")
			})
		}
	})
}

// vote('justin bieber', 'lololol', '-KpQYkPCciafhdSfCvSY', -1)