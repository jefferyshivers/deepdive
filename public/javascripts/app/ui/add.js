
$('.add-container').click(function(event){
	let x = event.pageX
	let y = event.pageY
	let pageW = document.getElementsByTagName('body')[0].scrollWidth
	let form = 500
	if (y > 50) {
		if (x < ((pageW - form) / 2) || x > (form + ((pageW - form) / 2)) || y > 570) {
			$('.add-container').css({
				'z-index':0,
				'visibility':'hidden',
			})
			$('.top-nav .add-content .material-icon').css({
				'color':'rgb(220,220,220)'
			})
		}
	}
})

$('#add-form-content-button').click(function(){
	console.log('content')
	$('.add-form .content').css({
		'visibility':'visible'
	})
	$('.add-form .moment').css({
		'visibility':'hidden'
	})
	$('.add-form').css({
		'height':'500px'
	})
	$('#add-form-content-button').css({
		'background':'rgb(120,120,120)'
	})
	$('#add-form-moment-button').css({
		'background':'none'		
	})
})


$('#add-form-moment-button').click(function(){
	console.log('moment')
	$('.add-form .moment').css({
		'visibility':'visible'
	})
	$('.add-form .content').css({
		'visibility':'hidden'
	})
	$('.add-form').css({
		'height':'300px'
	})
	$('#add-form-moment-button').css({
		'background':'rgb(120,120,120)'		
	})
	$('#add-form-content-button').css({
		'background':'none'		
	})
})

$('#add-form-add-moment-button').click(function(){
	let artist = document.getElementById('add-form-moment-artist_query').value
	artist = artist.toLowerCase()
	let moment = document.getElementById('add-form-moment-moment_query').value
	suggestMoment(artist,moment)
	document.getElementById('add-form-moment-artist_query').value = ""
	document.getElementById('add-form-moment-moment_query').value = ""

	$('.add-container').css({
		'z-index':0,
		'visibility':'hidden',
	})
	$('.top-nav .add-content .material-icon').css({
		'color':'rgb(80,80,80)'
	})	
})

$('.add-container .moment').keypress(function(e) {
	if (e.which == 13) {
		let artist = document.getElementById('add-form-moment-artist_query').value
		artist = artist.toLowerCase()
		let moment = document.getElementById('add-form-moment-moment_query').value
		suggestMoment(artist,moment)
		document.getElementById('add-form-moment-artist_query').value = ""
		document.getElementById('add-form-moment-moment_query').value = ""

		$('.add-container').css({
			'z-index':0,
			'visibility':'hidden',
		})
		$('.top-nav .add-content .material-icon').css({
			'color':'rgb(80,80,80)'
		})
	}
});

function suggestMoment(artist,moment) {
	var uid = firebase.auth().currentUser.uid
	var dbUser = firebase.database().ref('users/' + uid)
	dbUser.on('value', function(snapshot){
		var val = snapshot.val()
		var moments = val['moments']
		if (Object.keys(moments).includes(artist) && Object.keys(moments[artist]).includes(moment)) {
			console.log('no good!')
		} else {
			dbUser.off()
			var dbArtists = firebase.database().ref('artists')
			dbArtists.on('value', function(snapshot) {
				var val = snapshot.val()
				if (Object.keys(val).includes(artist)) {
					var this_artist = val[artist]
					var artist_moments = this_artist['moments']
					// add the moment to artist
					if (Object.keys(artist_moments).includes(moment)) {
						var moment_stuff = artist_moments[moment]
						var value = moment_stuff['vote']
						value += 1
						dbArtists.off()
						dbArtists.child(artist).child('moments').child(moment).child('vote').set(value)
						
					} else {
						dbArtists.off()
						///////////
						dbArtists.child(artist).child('moments').child(moment).set({content:{dummy:{contentName:'dummy'}}, vote:1})
						///////////
					}
					// add the moment to user
					var dbUser = firebase.database().ref('users/' + uid)
					dbUser.child('moments').child(artist).child(moment).set(true)
				} else {
					console.log('Sorry, but this artist is not even in the database.')
				}
			})
		}
	})
}

$('#add-form-add-content-button').click(function(){
	let artist = document.getElementById('add-form-content-artist_query').value
	artist = artist.toLowerCase()

	let moment = document.getElementById('add-form-content-moment_query').value
	moment = moment.toLowerCase()

	let url = document.getElementById('add-form-content-url_query').value

	let type = document.getElementById('add-form-content-type_query').value
	type = type.toLowerCase()

	let platform = document.getElementById('add-form-content-platform_query').value
	platform = platform.toLowerCase()

	let contentName = document.getElementById('add-form-content-title_query').value
	contentName = contentName.toLowerCase()

	addContent(artist,moment,url,type,platform,contentName)

	document.getElementById('add-form-content-artist_query').value = ""
	document.getElementById('add-form-content-moment_query').value = ""
	document.getElementById('add-form-content-url_query').value = ""
	document.getElementById('add-form-content-type_query').value = ""
	document.getElementById('add-form-content-platform_query').value = ""
	document.getElementById('add-form-content-title_query').value = ""

	$('.add-container').css({
		'z-index':0,
		'visibility':'hidden',
	})
	$('.top-nav .add-content .material-icon').css({
		'color':'rgb(80,80,80)'
	})
})

$('.add-container .content').keypress(function(e) {
	if (e.which == 13) {
		let artist = document.getElementById('add-form-content-artist_query').value
		artist = artist.toLowerCase()

		let moment = document.getElementById('add-form-content-moment_query').value
		moment = moment.toLowerCase()

		let url = document.getElementById('add-form-content-url_query').value

		let type = document.getElementById('add-form-content-type_query').value
		type = type.toLowerCase()

		let platform = document.getElementById('add-form-content-platform_query').value
		platform = platform.toLowerCase()

		let contentName = document.getElementById('add-form-content-title_query').value
		contentName = contentName.toLowerCase()

		addContent(artist,moment,url,type,platform,contentName)

		document.getElementById('add-form-content-artist_query').value = ""
		document.getElementById('add-form-content-moment_query').value = ""
		document.getElementById('add-form-content-url_query').value = ""
		document.getElementById('add-form-content-type_query').value = ""
		document.getElementById('add-form-content-platform_query').value = ""
		document.getElementById('add-form-content-title_query').value = ""

		$('.add-container').css({
			'z-index':0,
			'visibility':'hidden',
		})
		$('.top-nav .add-content .material-icon').css({
			'color':'rgb(80,80,80)'
		})
	}
});


function addContent(artist, moment, url, type, platform, contentName) {

	var dbArtists = firebase.database().ref('artists')

	dbArtists.on('value', function(snapshot) {
		var val = snapshot.val()
		if (Object.keys(val).includes(artist)) {
			var this_artist = val[artist]
			var artist_moments = this_artist['moments']

			// add the moment to artist
			if (Object.keys(artist_moments).includes(moment)) {
				var moment_stuff = artist_moments[moment]
				var value = moment_stuff['vote']
				value += 1
				dbArtists.off()
				dbArtists.child(artist).child('moments').child(moment).child('vote').set(value)
			} else {
				dbArtists.off()
				dbArtists.child(artist).child('moments').child(moment).child('vote').set(1)
			}

			// go to the artist/'moments'/moment/ -> set 'content'
			// set {url{'type' : type , 'media', media}}
			// var safe_title = contentName.replace(/"/g,"&quot;")
			var uid = firebase.auth().currentUser.uid;
			var obj = {type : type ,url : url, platform: platform, artist: artist, uid: uid, contentName: contentName, vote: 1};

			var pushID = dbArtists.child(artist).child('moments').child(moment).child('content').push(obj)
			var pushID_key = pushID.key
			dbArtists.child(artist).child('allcontent').child(pushID_key).set({"parent-moment": moment, "votes": 1})

			dbArtists.off()
			var user = firebase.database().ref('users/' + uid)

			// add the content to the user, and set an initial vote as 1
			user.child('contents').child(pushID.key).set({artist : artist, moment : moment, type : 1})
			user.child('added-contents').child(pushID.key).set({artist : artist, moment : moment})

		} else {
			console.log('Sorry, but this artist is not even in the database.')
		}
	})
} 
