function addToCollection(artist, moment, contentKey, collectionName){ 
	var uid = firebase.auth().currentUser.uid
	var dbUserContents = firebase.database().ref('users/' + uid)
	// set in collection
	artist = artist.toLowerCase()
	dbUserContents.child('collections').child(collectionName).child(contentKey).set({
		artist : artist,
		moment : moment
	})
	dbUserContents.off()

	// add one vote to content in artist all-contents
	var dbArtist = firebase.database().ref('artists/' + artist)
	dbArtist.once('value').then(function(snapshot){
		var val = snapshot.val()
		var allcontent = val['allcontent']
		// for some reason, it needs the '-' at the beginning of the key
		var content = allcontent['-' + contentKey]
		var votes = content['votes']
		votes += 1
		dbArtist.child('allcontent').child('-' + contentKey).child('votes').set(votes)
	})
}


// addToCollection('Frank Ocean', 'asdfh', 'Kp_MZ95PIikGSKD53nv','my new collection')

function removeFromCollection(artist, moment, contentKey, collectionName){
	var uid = firebase.auth().currentUser.uid
	var dbUserContents = firebase.database().ref('users/' + uid)
	var dbArtist = firebase.database().ref('artists/' + artist)
	artist = artist.toLowerCase()
	// remove from collection
	dbUserContents.child('collections').child(collectionName).child(contentKey).remove()

	// subtract one vote from content in artist all-contents
	var dbArtist = firebase.database().ref('artists/' + artist)
	dbArtist.once('value').then(function(snapshot){
		var val = snapshot.val()
		var allcontent = val['allcontent']
		// for some reason, it needs the '-' at the beginning of the key
		var content = allcontent['-' + contentKey]
		var votes = content['votes']
		votes -= 1
		dbArtist.child('allcontent').child('-' + contentKey).child('votes').set(votes)
	})
}