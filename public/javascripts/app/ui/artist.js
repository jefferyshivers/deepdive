


var name_exceptions = {
	'yo yo ma': 'yo-yo ma'
}

function load_artist_page() {
	var artist_name = window.location.pathname.replace(/\-/g," ").replace("/","")


	var db = firebase.database().ref('artists')
	db.once('value').then(function(snapshot) {
		var artists_objects = snapshot.val()
		var name_hyphenated = artist_name.replace(/\s/g,"-")

		if (artists_objects[artist_name] != undefined || Object.keys(name_exceptions).includes(artist_name)) {
	
			// important !!!!
			if (Object.keys(name_exceptions).includes(artist_name)) {
				artist_name = name_exceptions[artist_name]
			}

			$('.meta .name').text(artists_objects[artist_name]['name'].toUpperCase())
			$('.meta .genre').text(artists_objects[artist_name]['genre'].toUpperCase())
			var num_deepfans = Math.floor(Math.random() * 20000) + 5000
			$('#deepfans').text(num_deepfans)
			var num_trending = Math.floor(Math.random() * 20) + 1
			$('#trending').text('#' + num_trending)


			var icons
			var random_num = Math.random()
			if (random_num < .33) {
				icons = ['facebook','spotify','apple-music']
			} else {
				if (random_num < .66) {
					icons = ['spotify','facebook','apple-music']
				} else {
					icons = ['apple-music','spotify','facebook']
				}
			}

			img_one = '/images/icons/' + icons[0] + '.png'
	    $('<img/>', {
	    	'src':img_one,
	    	'style':'position:relative;top:5px;width:50%;height:auto;'
			}).appendTo('#meta-icon-one')

			img_two = '/images/icons/' + icons[1] + '.png'
	    $('<img/>', {
	    	'src':img_two,
	    	'style':'position:relative;top:5px;width:50%;height:auto;'
			}).appendTo('#meta-icon-two')

			img_three = '/images/icons/' + icons[2] + '.png'
	    $('<img/>', {
	    	'src':img_three,
	    	'style':'position:relative;top:5px;width:50%;height:auto;'
			}).appendTo('#meta-icon-three')


		  // var storage = firebase.storage()
	    // var storageRef = storage.ref('artist-pics')
			// var artistPic = storageRef.child(artist_name.replace(" ","-") + '.png');
			var artistPic = '/images/' + name_hyphenated + '.png'

				// artistPic.getDownloadURL().then(function(url) {
					style = 'position: absolute; top: 0; left: 0; width: 100%; height: auto; min-height: 100%;'
			    $('<img/>', {
						'style': style,
						'src': artistPic
					}).appendTo('.top .artist-icon')

				// }).catch(function(error) {
				// })


				var usernames = {
					'opyTWqnX6iRAccyri7FThLogR6H2':'jefferyshivers',
					'v0WNpwej8XZSbwG0WImXBnhB2Hp1':'fangtinggu',
					'dBDrJZwyE4QTn7TPksy2mBibhGt1':'j3819443',
					'Sud3iuAcfCVoKMrQn9WFd1RLpMJ2':'jaboone',
					'FygjzogB4mMsoc19AlpRm1J2ASD3':'gjsponderosa'
				}

				var artist_obj = artists_objects[artist_name]
				var allcontent = artist_obj['allcontent']
				var contentKeys = Object.keys(allcontent)
				for (i=0; i<contentKeys.length; i++) {
					var key = contentKeys[i]

					if (key != 'dummy-key') {


						var moment = allcontent[key]['parent-moment']
						var content_obj = artist_obj['moments'][moment]['content'][key]
						var userkey = content_obj['uid']
						var username = usernames[userkey]
						if (content_obj['platform'] == 'youtube') {
							console.log('it is a video!!!')
							var src = 'https://www.youtube.com/embed/' + content_obj['url']


							/// left section

							$('<div/>', {
					    	'class':'youtube-content-item',
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



							// video section

							$('<iframe/>', {
					    	'style':'float:left;width:400px;height:250px;frameborder:none;allowfullscreen;box-shadow:rgba(0,0,0,.2) 0 0 10px;',
					    	'src':src
							}).appendTo('#' + key)




							/// right section

							// var content_right_id = key + 'content-right'
							// $('<div/>', {
					  //   	'class':'content-right',
					  //   	'id':content_right_id
							// }).appendTo('#' + key)	

							// $('<div/>', {
					  //   	'text':username
							// }).appendTo('#' + content_right_id)


						} else {

							if (content_obj['platform'] == 'soundcloud') {

								/////// IMGUR ///////

								// var src = 'https://www.youtube.com/embed/' + content_obj['url']


// <iframe width="100%" height="450" scrolling="no" frameborder="no" 
// src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/215638478&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true">
// </iframe>


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



							} else {

								if (content_obj['platform'] == 'instagram') {



// <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-version="7" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:28.125% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://www.instagram.com/p/BCYQxy7AfPL/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">The making of #ntnfipuddung  link to full video in bio.</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A post shared by Daniel Mcgregor (@chinomcgregor) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2016-02-29T17:47:25+00:00">Feb 29, 2016 at 9:47am PST</time></p></div></blockquote>
// <script async defer src="//platform.instagram.com/en_US/embeds.js"></script>


									
								}












								// $('<p/>', {
						  //   	'class':'content-item',
						  //   	'text':key
								// }).appendTo('.inner-body .contents')

							}

						}




					}
				}
				// console.log(allcontent)


				key = key.replace("-","")

				// load top contributors
				// db.off()
				var users = firebase.database().ref('users')
				users.once('value').then(function(snap){
					val = snap.val()
					users_keys = Object.keys(val)
					for (i=0;i<users_keys.length;i++){


						var key = users_keys[i]
						var user_obj = val[key]
						var username = user_obj['username']

						var this_id = username + '-container'
						$('<div/>', {
				    	'class':'other-rank',
				    	'id':this_id
						}).appendTo('.cont-rest .inner')




						var fake_rank = Math.floor((13 - i*0.7) + 0.7)
						var this_rank_id = this_id + '-rank'
						$('<div/>', {
				    	'class':'rank',
				    	'id':this_rank_id,
				    	'text':fake_rank
						}).appendTo('#' + this_id)




						// icon
						var this_left_id = this_id + '-left'

						$('<div/>', {
				    	'class':'left',
				    	'id':this_left_id
						}).appendTo('#' + this_id)

						var this_icon_id = this_left_id + '-icon'

						$('<div/>', {
				    	'class':'icon',
				    	'id':this_icon_id
						}).appendTo('#' + this_left_id)

						var this_name_id = this_id + '-name'
						var href = '/user/' + username
						$('<div/>', {
				    	'class':'name',
				    	'id':this_name_id
						}).appendTo('#' + this_id)
						$('<a/>', {
				    	'class':'name',
				    	'text':username,
				    	'href':href
						}).appendTo('#' + this_name_id)

					}




					for (i=0;i<users_keys.length;i++){
						var key = users_keys[i]
						var user_obj = val[key]
						var username = user_obj['username']
						var userpicRef = firebase.storage().ref('user-pics/' + username + '.png')
						userpicRef.getDownloadURL().then(function(url){

							var user_name = url.split('%2F')[1].split('.png?alt=media')[0]
							var this_id = user_name + '-container'
							var this_left_id = this_id + '-left'
							var this_icon_id = this_left_id + '-icon'

							$('<img/>', {
								'src':url,
					    	'style':'position:relative:top:0;width:120%;height:auto;z-index:49;'
							}).appendTo('#' + this_icon_id)

						})


					}


				})







		} else {
			window.location = 'bad-path'
		}		
	})

}

// contentSortObject(artist) is from db/search.js
