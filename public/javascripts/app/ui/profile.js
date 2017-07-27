


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

			var num_likes = Math.floor(Math.random()*400) + 400
			$('#likes').text(num_likes)			





			// populate the contens

			var contents = users_objects['opyTWqnX6iRAccyri7FThLogR6H2']['added-contents']
			var content_keys = Object.keys(contents)
			content_keys.sort( function() { return 0.5 - Math.random() } );


			// get contents via artists

			var artists = firebase.database().ref('artists')
			artists.once('value').then(function(snapshot){
				var val = snapshot.val()

				for (i=0;i<content_keys.length;i++){

					if (content_keys[i] != 'dummy' && i < 10) {
						var key = content_keys[i]
						var content_object = contents[key]
						var artist = content_object['artist']
						var moment = content_object['moment']
						var content_obj = val[artist]['moments'][moment]['content'][key]







// from here
						if (content_obj['platform'] == 'youtube') {

							var src = 'https://www.youtube.com/embed/' + content_obj['url']

							$('<div/>', {
					    	'class':'youtube-content-item',
					    	'id':key
							}).appendTo('.inner-body .contents')

							/// left section
							var content_left_id = key + 'content-left'
							$('<div/>', {
					    	'class':'content-left',
					    	'id':content_left_id
							}).appendTo('#' + key)	

							var inner_div_id = content_left_id + '-inner'
							$('<div/>', {
					    	'class':'inner-div',
					    	'id':inner_div_id
							}).appendTo('#' + content_left_id)

							// up
							var up_id = inner_div_id + '-up'
							$('<div/>', {
					    	'class':'micro',
					    	'id':up_id
							}).appendTo('#' + inner_div_id)
							$('<i/>', {
					    	'class':'material-icons',
					    	'text':'arrow_drop_up',
					    	'style':'font-size:36pt;'
							}).appendTo('#' + up_id)

							// number of votes
							var vote_num = 3100 - (i * 150 + Math.floor(Math.random()*58))
							$('<div/>', {
					    	'class':'micro',
					    	'text':vote_num
							}).appendTo('#' + inner_div_id)

							// down
							var down_id = inner_div_id + '-down'
							$('<div/>', {
					    	'class':'micro',
					    	'id':down_id
							}).appendTo('#' + inner_div_id)
							$('<i/>', {
					    	'class':'material-icons',
					    	'text':'arrow_drop_down',
					    	'style':'font-size:36pt;'
							}).appendTo('#' + down_id)

							// gutter
							$('<div/>', {
					    	'class':'micro'
							}).appendTo('#' + inner_div_id)

							// like
							var like_id = inner_div_id + '-like'
							$('<div/>', {
					    	'class':'micro',
					    	'id':like_id
							}).appendTo('#' + inner_div_id)
							$('<i/>', {
					    	'class':'material-icons',
					    	'text':'favorite'
							}).appendTo('#' + like_id)



							// video section

							$('<iframe/>', {
					    	'style':'float:left;width:400px;height:250px;frameborder:none;allowfullscreen;box-shadow:rgba(0,0,0,.2) 0 0 10px;',
					    	'src':src
							}).appendTo('#' + key)


							// // right section

							// var content_right_id = key + 'content-right'
							// $('<div/>', {
					  //   	'class':'content-right',
					  //   	'id':content_right_id
							// }).appendTo('#' + key)	

							// $('<div/>', {
					  //   	'text':username
							// }).appendTo('#' + content_right_id)

						// ends if (youtube)
						} else {

							if (content_obj['platform'] == 'soundcloud') {

								/////// IMGUR ///////

								// var src = 'https://www.youtube.com/embed/' + content_obj['url']

								/// left section
								$('<div/>', {
						    	'class':'imgur-content-item',
						    	'id':key
								}).appendTo('.inner-body .contents')


								var content_left_id = key + 'content-left'
								$('<div/>', {
						    	'class':'content-left',
						    	'id':content_left_id
								}).appendTo('#' + key)	

								var inner_div_id = content_left_id + '-inner'
								$('<div/>', {
						    	'class':'inner-div',
						    	'id':inner_div_id
								}).appendTo('#' + content_left_id)

								// up
								var up_id = inner_div_id + '-up'
								$('<div/>', {
						    	'class':'micro',
						    	'id':up_id
								}).appendTo('#' + inner_div_id)
								$('<i/>', {
						    	'class':'material-icons',
						    	'text':'arrow_drop_up',
						    	'style':'font-size:36pt;'
								}).appendTo('#' + up_id)

								// number of votes
								var vote_num = 3100 - (i * 150 + Math.floor(Math.random()*58))
								$('<div/>', {
						    	'class':'micro',
						    	'text':vote_num
								}).appendTo('#' + inner_div_id)

								// down
								var down_id = inner_div_id + '-down'
								$('<div/>', {
						    	'class':'micro',
						    	'id':down_id
								}).appendTo('#' + inner_div_id)
								$('<i/>', {
						    	'class':'material-icons',
						    	'text':'arrow_drop_down',
						    	'style':'font-size:36pt;'
								}).appendTo('#' + down_id)

								// gutter
								$('<div/>', {
						    	'class':'micro'
								}).appendTo('#' + inner_div_id)

								// like
								var like_id = inner_div_id + '-like'
								$('<div/>', {
						    	'class':'micro',
						    	'id':like_id
						    	// 'text':'lk'
								}).appendTo('#' + inner_div_id)
								$('<i/>', {
						    	'class':'material-icons',
						    	'text':'favorite'
						    	// 'text':'lk'
								}).appendTo('#' + like_id)



								// audio section
								var src = content_obj['url']
								var block_id = key + '-block'
								$('<iframe/>', {
									'src':src,
									'style':'width:400px; height:250px; scrolling:no; frameborder:no;'
								}).appendTo('#' + key)



							// ends if (soundcloud)
							} else {

								if (content_obj['platform'] == 'instagram') {

									/// left section

									$('<div/>', {
							    	'class':'instagram-content-item',
							    	'id':key
									}).appendTo('.inner-body .contents')

									var content_left_id = key + 'content-left'
									$('<div/>', {
							    	'class':'content-left',
							    	'id':content_left_id
									}).appendTo('#' + key)	

									var inner_div_id = content_left_id + '-inner'
									$('<div/>', {
							    	'class':'inner-div',
							    	'id':inner_div_id
									}).appendTo('#' + content_left_id)

									// up
									var up_id = inner_div_id + '-up'
									$('<div/>', {
							    	'class':'micro',
							    	'id':up_id
									}).appendTo('#' + inner_div_id)
									$('<i/>', {
							    	'class':'material-icons',
							    	'text':'arrow_drop_up',
							    	'style':'font-size:36pt;'
									}).appendTo('#' + up_id)

									// number of votes
									var vote_num = 3100 - (i * 150 + Math.floor(Math.random()*58))
									$('<div/>', {
							    	'class':'micro',
							    	'text':vote_num
									}).appendTo('#' + inner_div_id)

									// down
									var down_id = inner_div_id + '-down'
									$('<div/>', {
							    	'class':'micro',
							    	'id':down_id
									}).appendTo('#' + inner_div_id)
									$('<i/>', {
							    	'class':'material-icons',
							    	'text':'arrow_drop_down',
							    	'style':'font-size:36pt;'
									}).appendTo('#' + down_id)

									// gutter
									$('<div/>', {
							    	'class':'micro'
									}).appendTo('#' + inner_div_id)

									// like
									var like_id = inner_div_id + '-like'
									$('<div/>', {
							    	'class':'micro',
							    	'id':like_id
									}).appendTo('#' + inner_div_id)
									$('<i/>', {
							    	'class':'material-icons',
							    	'text':'favorite'
									}).appendTo('#' + like_id)


									// tweet section
									var mid_id = key + '-mid'
									$('<i/>', {
							    	'class':'instagram-mid',
							    	'id':mid_id
									}).appendTo('#' + key)
									$('#' + mid_id).append(content_obj['url'])

								} else {

									if (content_obj['platform'] == 'twitter') {


										/// left section

										$('<div/>', {
								    	'class':'twitter-content-item',
								    	'id':key
										}).appendTo('.inner-body .contents')

										var content_left_id = key + 'content-left'
										$('<div/>', {
								    	'class':'content-left',
								    	'id':content_left_id
										}).appendTo('#' + key)	

										var inner_div_id = content_left_id + '-inner'
										$('<div/>', {
								    	'class':'inner-div',
								    	'id':inner_div_id
										}).appendTo('#' + content_left_id)

										// up
										var up_id = inner_div_id + '-up'
										$('<div/>', {
								    	'class':'micro',
								    	'id':up_id
										}).appendTo('#' + inner_div_id)
										$('<i/>', {
								    	'class':'material-icons',
								    	'text':'arrow_drop_up',
								    	'style':'font-size:36pt;'
										}).appendTo('#' + up_id)

										// number of votes
										var vote_num = 3100 - (i * 150 + Math.floor(Math.random()*58))
										$('<div/>', {
								    	'class':'micro',
								    	'text':vote_num
										}).appendTo('#' + inner_div_id)

										// down
										var down_id = inner_div_id + '-down'
										$('<div/>', {
								    	'class':'micro',
								    	'id':down_id
										}).appendTo('#' + inner_div_id)
										$('<i/>', {
								    	'class':'material-icons',
								    	'text':'arrow_drop_down',
								    	'style':'font-size:36pt;'
										}).appendTo('#' + down_id)

										// gutter
										$('<div/>', {
								    	'class':'micro'
										}).appendTo('#' + inner_div_id)

										// like
										var like_id = inner_div_id + '-like'
										$('<div/>', {
								    	'class':'micro',
								    	'id':like_id
										}).appendTo('#' + inner_div_id)
										$('<i/>', {
								    	'class':'material-icons',
								    	'text':'favorite'
										}).appendTo('#' + like_id)


										// tweet section
										var mid_id = key + '-mid'
										$('<i/>', {
								    	'class':'twitter-mid',
								    	'id':mid_id
										}).appendTo('#' + key)
										$('#' + mid_id).append(content_obj['url'])

									// ends if (twitter)
									}
								// end else from instagram
								}
							// ends else from soundcloud
							}
						// ends else from (youtube)	
						}
					}		
				}
			})
// 



			// populate collections tab

			var collection_keys = Object.keys(collections)
			// for (i=0;i<collection_keys.length;i++) {
				for (i=0;i<11;i++){
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
	$('.inner-body .contents .youtube-content-item').css('display','block')	
	$('.inner-body .contents .instagram-content-item').css('display','block')
	$('.inner-body .contents .twitter-content-item').css('display','block')
	$('.inner-body .contents .soundcloud-content-item').css('display','block')

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
	$('.inner-body .contents .youtube-content-item').css('display','none')
	$('.inner-body .contents .instagram-content-item').css('display','none')
	$('.inner-body .contents .twitter-content-item').css('display','none')
	$('.inner-body .contents .soundcloud-content-item').css('display','none')

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