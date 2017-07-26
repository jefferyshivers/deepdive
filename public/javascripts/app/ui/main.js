
// var link = document.createElement( "link" );
// link.type = "text/css";
// link.rel = "stylesheet";
// link.media = "screen,print";

// if (screen.width <= 800) {
//   alert('You are using the mobile version of this app.')
// 	link.href = "/stylesheets/mobile/main.css";
// 	document.getElementsByTagName( "head" )[0].appendChild( link );
// } else {
// 	link.href = "/stylesheets/desktop/main.css";
// 	document.getElementsByTagName( "head" )[0].appendChild( link );
// }

// placeholder for "user", which returns "false" (for anonymous) if not authenticated/logged-in

top_artists = [
	"Frank Ocean","Yo-Yo Ma","Chino","The Japanese House",
	"SZA","Kendrick Lamar","Lorde",
	"FKA Twigs","Drake","Selena Gomez","Ed Sheeran","Post Malone","Justin Bieber"]

function loadpage_MAIN() {

	var cells = document.getElementsByClassName('front-page-cell')

	for (i=0;i<top_artists.length;i++){
		var artist_name = top_artists[i]
		artist_name = artist_name.replace(/\s/g,"-").toLowerCase()
		cells[i].id = artist_name


		// $('#' + artist_name + ' .item').text(artist_name)



	}



  var storage = firebase.storage()
  var storageRef = storage.ref('artist-pics')

	for (i=0;i<top_artists.length;i++){
		var artist_name = top_artists[i]
		artist_name = artist_name.replace(/\s/g,"-").toLowerCase()
		// var artistPic = storageRef.child(artist_name + '.png');
		var artistPic = '/images/' + artist_name + '.png'

		// artistPic.getDownloadURL().then(function(url) {

			// var artist_name = url.split('%2F')[1].split('.png?alt=media')[0]
			var parent_id = "#" + artist_name + " .item"

	    $('<img/>', {
				'src': artistPic,
				'style': 'position: relative; top: 0; height: 100%; width: auto;'
			}).appendTo(parent_id)
			$(parent_id).attr('href', artist_name)

		// }).catch(function(error) {
		// })

	}


	// console.log(cells)

}