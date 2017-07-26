


function load_profile_page() {

	var profile_name = window.location.pathname.replace("/user/","").toLowerCase()

	var db = firebase.database().ref('users')
	db.once('value').then(function(snapshot) {

		var users_objects = snapshot.val()
		var all_users = Object.keys(users_objects)
		var all_usernames = []

		for (i=0;i<all_users.length;i++) {
			var userid = all_users[i]
			var username = users_objects[userid]['username'].toLowerCase()
			all_usernames[username] = userid
		}

		if (Object.keys(all_usernames).includes(profile_name)) {
	
			var userid = all_usernames[profile_name]
			var user_object = users_objects[userid]

			var followers = user_object['followers']
			var following = user_object['following']
			var moments = user_object['moments']
			var contents = user_object['added-contents']
			var username = user_object['username']
			var collections = user_object['collections']

			$('#username').text(username)

			//////// include profile pic
			var userpicRef = firebase.storage().ref('user-pics/' + username + '.png')
			userpicRef.getDownloadURL().then(function(url){

			$('<img/>', {
				// 'class':'contribution-item',
				'src':url,
				'style':'position:relative;top:0;width:120%;height:auto;'
			}).appendTo('.user-icon')

				// $('.user-icon-container').append('<img id ="profilePic" src =' + '"' + url + '"' + '/>')
			})

			//////// include profile pic 

			var num_followers = Math.floor(Math.random()*100) + 50
			$('#followers').text(num_followers)

			var num_following = Math.floor(Math.random()*100) + 35
			$('#following').text(num_following)

			var content_keys = Object.keys(contents)
			for (i=0;i<content_keys.length;i++) {
				var content_key = content_keys[i]
				if (content_key != 'dummy') {
					content_object = contents[content_key]

					var artist = content_object['artist']
					var moment = content_object['moment']

					$('<div/>', {
						'class':'contribution-item',
						'id':content_key
					}).data('artist',artist).appendTo('.inner-body .contents')

				}
			}

			var artists = firebase.database().ref('artists')
			artists.once('value').then(function(snapshot){

				var val = snapshot.val()
				for (i=0;i<content_keys.length;i++){

					if (content_keys[i] != 'dummy') {
						var key = content_keys[i]
						var content_object = contents[key]
						var artist = content_object['artist']
						var moment = content_object['moment']
						console.log(moment)
						var content_full_obj = val[artist]['moments'][moment]['content'][key]
						var contentName = content_full_obj['contentName']
						$('#' + key).text(artist + ": " + contentName)
					}		
				}

			})


			// populate collections tab

			var collection_keys = Object.keys(collections)
			// for (i=0;i<collection_keys.length;i++) {
				for (i=0;i<10;i++){
				// var collection_key = collection_keys[i]
				// if (collection_key != 'dummy-collection') {
					// var collection_object = collections[collection_key]
					// var name = collection_object['collectionName']
					// var description = collection_object['description']
					// var collection_contents = Object.keys(collection_object)

					// for (l=0;l<collection_contents.length;l++) {
					// 	var content_key = collection_contents[l]
					// 	if (content_key != 'description' && content_key != 'collectionName') {
					// 		console.log(collection_object[content_key])
					// 	}
						
					// }

					var id = i + '-thumbnail'
					$('<div/>', {
						'class':'collection-item',
						'id':id
					}).click(function(){
						popup('collection','hi')
					}).appendTo('.inner-body .contents')

					var src = '/images/collections/' + i + '.png'
					$('<img/>', {
						'style':'position:relative;top:0;width:102%;height:auto;',
						'src':src
					}).appendTo('#' + id)	

				// }
			}

			// load the left-nav graphic stuff

			var random_one = Math.floor(Math.random() * 50) + 50
			var width_one = random_one + "%"
			$('#perc_one').css('width',width_one)
			$('#numone').text(random_one)

			var random_two = Math.floor(Math.random() * 50) + 50
			var width_two = random_two + "%"
			$('#perc_two').css('width',width_two)
			$('#numtwo').text(random_two)

			var random_three = Math.floor(Math.random() * 50) + 50
			var width_three = random_three + "%"
			$('#perc_three').css('width',width_three)
			// $('.percentage #three').css('width','0%')

			$('#numthree').text(random_three)

			var musician_list = ['Calvin Harris', 'Drake', 'Ed Sheeran', 'FKA Twigs', 'Frank Ocean', 'Justin Bieber', 'Kendrick Lamar', 'Lorde', 'Post Malone', 'Selena Gomez', 'SZA', 'The Japanese House', 'Yo-Yo Ma' ]
			musician_list.sort( function() { return 0.5 - Math.random() } );

			var urls = {
				'Calvin Harris':'calvin-harris',
				'Drake':'drake',
				'Frank Ocean':'frank-ocean',
				'FKA Twigs':'fka-twigs', 
				'Justin Bieber': 'justin-bieber', 
				'Kendrick Lamar': 'kendrick-lamar', 
				'Lorde': 'lorde', 
				'Post Malone': 'post-malone',
				'Selena Gomez': 'selena-gomez', 
				'SZA': 'sza', 
				'The Japanese House': 'the-japanese-house', 
				'Yo-Yo Ma': 'yo-yo-ma'
			}

			// $('#name-one').text(musician_list[0])
			var name_one = musician_list[0]
			var link_one = '/' + urls[name_one]
			$('<a/>', {
				'href':link_one,//musician_list[0]
				'text':name_one
				// 'style':'display:none'
			}).appendTo('#name-one')

			var name_two = musician_list[1]
			var link_two = '/' + urls[name_two]
			$('<a/>', {
				'href': link_two,
				'text': name_two
			}).appendTo('#name-two')

			var name_three = musician_list[2]
			var link_three = '/' + urls[name_three]
			$('<a/>', {
				'href': link_three,
				'text': name_three
			}).appendTo('#name-three')


		} else {
			window.location = '/bad-path'
		}		
	})
}

$('.inner-body .top #contributions').click(function(){
	$('.inner-body .contents .contribution-item').css('display','block')
	$('.inner-body .contents .collection-item').css('display','none')

	$('.main .button-container #contributions').css({
		'color'        : 'rgb(220,220,220)',
		'border-bottom': '2px solid rgb(0,200,255)'
	})
	$('.main .button-container #collections').css({
		'color'        : 'rgb(220,220,220)',
		'border-bottom': '2px solid transparent'
	})

	$('.main .button-container #collections').hover(function(){
		$(this).css('color','white')
	}, function() {
		$(this).css('color','rgb(220,220,220)')
	})	

})

$('.inner-body .top #collections').click(function(){
	$('.inner-body .contents .collection-item').css('display','block')
	$('.inner-body .contents .contribution-item').css('display','none')		

	$('.main .button-container #collections').css({
		'color'        : 'rgb(220,220,220)',
		'border-bottom': '2px solid rgb(0,200,255)'
	})
	$('.main .button-container #contributions').css({
		'color'        : 'rgb(220,220,220)',
		'border-bottom': '2px solid transparent'
	})

	$('.main .button-container #contributions').hover(function(){
		$(this).css('color','white')
	}, function() {
		$(this).css('color','rgb(220,220,220)')
	})

})