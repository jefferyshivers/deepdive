///search for moments////

//1. get the string from the user
//2. make a list of all the moments 
	//2-1: make an empty list for total moments
	//2-2: get moments from each artist 
	//2-3: append it to the list 
//3. search for it by looking at javascript .search 
//// ? - > will it work with partial search? /// 



function momentSearch(moment) {
	var all_results = []
	var moment_split = moment.split(" ")
	var totalMoments = [];
	var artistsDB = firebase.database().ref('artists')
	artistsDB.once('value').then(function(snapshot){
		var val = snapshot.val()
		var artistsList = Object.keys(val)

		// console.log(artistsList)
		for (i = 0; i < artistsList.length; i++) {
			var artist_name = artistsList[i]
			var artist = val[artist_name]
			var artist_moments = artist['moments']
			var moments = Object.keys(artist['moments'])
			var full_moment_results = []
			var moment_split_results = []

			for (j = 0; j<moments.length; j++) {
				var moment_name = moments[j]
				if (moment_name.includes(moment)) {
					full_moment_results.push(moment_name)
					all_results.push({
						artist : artist_name,
						moment : moment_name
					})
				} else {

					// later we can extend the search to include similar recommendations

					// for (k = 0; k < moment_split.length; k++) {
					// 	var this_split = moment_split[k]
					// 	if (moment_name.includes(this_split)) {
					// 		moment_split_results.push(this_split)
					// 		console.log('yes')
					// 	}
					// }

				}

			}

		}

		// console.log(all_results)

		if (all_results.length > 0) {

			// add the moment search result container
	    $('<div/>', {
				'class':'moment-results'
			}).appendTo('.search-page-main')

	    // add each result
	    for (i=0; i<all_results.length; i++) {
	    	var result = all_results[i]
	    	var name = result['artist'] + ": " + result['moment']
	    	var nospace_name = name.replace(/\s/g,"")
	    	var nospace_name = nospace_name.replace(/\:/g,"")
	    	var id = "moment-" + nospace_name

	    	var col = Math.floor(Math.random() * 80)
	    	col += 80
	    	var bg = 'background:rgb(' + col + ',' + col + ',' + '155' + ');'
	    	var cursor = 'cursor:pointer;'
	    	var style = bg + cursor

		    $('<div/>', {
					'class': 'result-item-container',
					'id': id,
					'style': style
				}).data("ref",result['moment']).click(function(event){
						popup( "moment",  $('#' + this.id).data("ref")   )
				}).appendTo('.moment-results')

				var innerID = id + '-inner'
		    $('<div/>', {
					'class': 'result-item-inner',
					'id': innerID
				}).appendTo('#' + id)

		    $('<div/>', {
					'class': 'result-item-inner-top',
					'text': result['artist']
				}).appendTo('#' + innerID)
		    $('<div/>', {
					'class': 'result-item-inner-rest',
					'text': result['moment']
				}).appendTo('#' + innerID)

	    }

		}
		has_loaded_search = true
	})
}










function artistSearch(artist){
	var artistsDB = firebase.database().ref('artists')
	var artistResult = []

	artistsDB.once('value').then(function(snapshot){
		var val = snapshot.val()
		var artistsList = Object.keys(val)
		for (i = 0; i<artistsList.length; i++) {
			if (artistsList[i].includes(artist)) {
				artistResult.push(artistsList[i])
			} else {
				//later we can extend the search to include similar recommendations
			}
		}
		if (artistResult.length > 0) {
	  //   $('<div/>', {
			// 	'class':'artist-results'
			// }).appendTo('.search-page-main')

	    // add each result
	    for (i=0; i<artistResult.length; i++) {

	    	if (i < 5) {

		    	var result = artistResult[i]
		    	var href = '/' + result.replace(/\s/g,"-")

		    	var nospace_name = result.replace(/\s/g,"-")
		    	nospace_name = nospace_name.replace(/\:/g,"")
		    	var id = "artist-" + nospace_name

			    $('<a/>', {
						'class':'result-item-container',
						'id': id,
						'href': href
						// 'style': style
					}).appendTo('.artist-results') 

					var innerID = id + '-inner'
			    $('<div/>', {
						'class': 'result-item-inner',
						'id':innerID
					}).appendTo('#' + id)

			    $('<div/>', {
						'class': 'result-item-inner-rest'
					}).appendTo('#' + innerID)
			    $('<div/>', {
						'class': 'result-item-inner-top',
						'text': val[result]['name']
					}).appendTo('#' + innerID)

	    	}

	    }

	    // var storage = firebase.storage()
	    // var storageRef = storage.ref('artist-pics')

	    for (i=0; i<artistResult.length; i++) {
	    	// var artistPic = storageRef.child(artistResult[i].replace(/\s/g,"-") + '.png');
				var result = artistResult[i]
				// console.log(artistResult[i])
	    	var nospace_name = result.replace(/\s/g,"-")
	    	// console.log(nospace_name)
	    	nospace_name = nospace_name.replace(/\:/g,"")
	    	var id = "artist-" + nospace_name
				var innerID = id + '-inner'


				// artistPic.getDownloadURL().then(function(url) {
					// var artist_name = url.split('%2F')[1].split('.png?alt=media')[0]
					var artist_name = nospace_name
					var parent_id = "artist-" + artist_name + "-inner"
					var img_id = "artist-" + artist_name + "-img"
					var img_url = '/images/' + nospace_name + '.png'

			    $('<div/>', {
			    	'class':'.img-container',
			    	'id':img_id,
						'style': 'position:absolute;left:0px;top:0;width:100%;height:auto;'
					}).appendTo('#' + parent_id)

			    $('<img/>', {
						// 'style': 'position:relative;height:120px;width:auto;margin 0 auto;',
						'src': img_url
					}).appendTo('#' + img_id)

				// }).catch(function(error) {
				// })

			}
		} else {
			$('.artist-results').replaceWith( $('<p>no artist results for this search</p>') )
		}
	})
}

function contentSearch(content){
	var artistsDB = firebase.database().ref('artists')
	var selectedContentResult = []
	artistsDB.once('value').then(function(snapshot){
		var val = snapshot.val()
		var artistsList = Object.keys(val)
		for(i=0; i<artistsList.length; i++){
			var momentObjects = val[[artistsList[i]]]['moments']
			var momentValues = Object.values(momentObjects)
			var momentKeys = Object.keys(momentObjects)
			for(k=0; k<momentKeys.length; k++){
				if (momentKeys[k] != 'dummy') {
					var contentList = Object.values(momentValues[k]['content'])
					for(j=0; j<contentList.length; j++){
						var contentObject = contentList[j]
						if(contentObject['contentName'] != 'dummy'){
							if (contentObject['artist'].includes(content) || contentObject['contentName'].includes(content)) {
								selectedContentResult.push(contentObject)
							} else {
								//later we can extend the search to include similar recommendations
							}
						}
					}
				}
			}
		}
		// console.log(selectedContentResult[0]['contentName'])


		if (selectedContentResult.length > 0) {

	  //   $('<div/>', {
			// 	'class':'content-results'
			// }).appendTo('.search-page-main')

	    // add each result
	    for (i=0; i<selectedContentResult.length; i++) {

	    	if (i < 3) {



		    	var this_content = selectedContentResult[i]
		    	var contentName = this_content['contentName']

		    	var nospace_name = contentName.replace(/\s/g,"-")
		    	nospace_name = nospace_name.replace(/\:/g,"")
		    	var id = "content-" + nospace_name
		    	id = id.replace(/\"|\s|\'|\&|\;|\:/g,"")

		    	var col = Math.floor(Math.random() * 80)
		    	col += 80
		    	var bg = 'background:rgb(' + '155' + ',' + col + ',' + col + ');'
		    	var cursor = 'cursor:pointer;'
		    	var style = bg + cursor


			    $('<div/>', {
						'class':'result-item-container',
						'id': id,
						'style': style
					}).data("ref",contentName).click(function(event){
							popup( "content",  $('#' + this.id).data("ref")   )
					}).appendTo('.content-results')

					var innerID = id + '-inner'

			    $('<div/>', {
						'class': 'result-item-inner',
						'id':innerID,
						'text': contentName
					}).appendTo('#' + id)

			    $('<div/>', {
						'class': 'result-item-inner-rest'
					}).appendTo('#' + innerID)
			    $('<div/>', {
						'class': 'result-item-inner-top',
					}).appendTo('#' + innerID)


	    	}

			}

		} else {
			$('.content-results').replaceWith( $('<p>no content results for this search</p>') )
		}

	})
}



function contentSortKey(artist){
	var artistsDB = firebase.database().ref('artists/' + artist)
	artistsDB.child('allcontent').once('value').then(function(snapshot){
		var val = snapshot.val()
		// console.log(val)
		delete val['dummy-key']
		/// It doesn't delete dummy-key from the database. Only from the val in this function
		// console.log(val)
		var valKeys = Object.keys(val)
		valKeys.sort(function(a,b){return val[b]['votes'] - val[a]['votes']})
		console.log(valKeys) 
	})
}


function contentSortObject(artist){
	var artistsDB = firebase.database().ref('artists/' + artist)
	var sortedContentList = []
	artistsDB.child('moments').once('value').then(function(snapshot){
		var val = snapshot.val()
		// console.log(val)
		delete val['dummy']
		// // It doesn't delete dummy from the database. Only from the val in this function
		// console.log(val)
		var momentsObject = Object.values(val)
		for(i=0; i<momentsObject.length; i++){
			var contentByObject = momentsObject[i]['content']
			var contentList = Object.values(contentByObject)
			for(j=0; j<contentList.length; j++){
				// console.log(contentList[j])
				sortedContentList.push(contentList[j])
			}

			
		}
		sortedContentList.sort(function(a,b){return b['vote'] - a['vote']})
		console.log(sortedContentList)
	})
}


function collectionSearch(collection){
	var usersDB = firebase.database().ref('users')
	var collectionList = []
	usersDB.once('value').then(function(snapshot){
		var val = snapshot.val()
		var userObjects = Object.values(val)
		
		// for(i=0; i<userObjects.length; i++){
		// 	var collectionObject = userObjects[i]['collections']
		// 	delete collectionObject['dummy-collection']
		// 	// console.log(collectionObject)
		// 	var collectionValue = Object.values(collectionObject)
		// 	// console.log(collectionValue)
		// 	for(k=0; k<collectionValue.length; k++){
		// 		// console.log(collectionValue[k])
		// 		if(collectionValue[k]['collectionName'].includes(collection)){
		// 			collectionList.push(collectionValue[k])
		// 		}
		// 	}
		// }




		// if (collectionList.length > 0) {

		// 	for (c=0;c<collectionList.length;c++){

		// 		if (c < 5) {

		// 			collection = collectionList[c]
		// 			name = collection['collectionName']




		// 	    $('<div/>', {
		// 				'class':'result-item-container',
		// 				'id': 'id',
		// 				'text': name
		// 			}).data("ref",name).click(function(event){
		// 					popup( "content",  $('#' + this.id).data("ref")   )
		// 			}).appendTo('.collection-results')



		// 			console.log(name)

		// 		}

		// 	}
		// } else {
		// 	$('.collection-results').replaceWith( $('<p>no collection results for this search</p>') )
		// }



		for (i=0;i<5;i++) {
					var id = i + '-thumbnail'
 					// or 'collection-item'?
			    $('<div/>', {
						'class':'result-item-container',
						'id': id
					}).click(function(event){
							popup('collection','hi')
					}).appendTo('.collection-results')

					var src = '/images/collections/' + i + '.png'
					$('<img/>', {
						'style':'position:relative;top:0;width:102%;height:auto;',
						'src':src
					}).appendTo('#' + id)	
		}




	})
}



