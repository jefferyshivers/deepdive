

function popup(type,id) {
	console.log('hi')
	var css_class = 'popup-' + type

  $('<div/>', {
		'id': 'popup-container'
	}).click(function() {
		let x = event.pageX
		let y = event.pageY
		var formW
		var pageW = document.getElementsByTagName('body')[0].scrollWidth

		if (type == 'content') {
			formW = 400
		} else {
			formW = 500
		}

		if (y < 150 || y > 550 || x < ((pageW - formW) / 2) || x > (formW + ((pageW - formW) / 2))) {
			$('div').remove('#popup-container')

		}

	}).appendTo('body')


  $('<div/>', {
		'id': 'popup-card',
		'class': css_class
	}).appendTo('#popup-container')


	$('<img/>', {
		// 'class': css_class
		'src':'/images/collections/collection-preview.png',
		'style':'position:relative;top:0;height:100%;width:auto;'
	}).appendTo('#popup-card')


  // for (i=0;i<12;i++) {
	 //  var color = Math.floor(Math.random()*100) + 155
	 //  var style = 'background:radial-gradient(rgba(0,200,' + color + ',.8), rgba(0,200,255,.5)'  

	 //  $('<div/>', {
		// 	'class': 'popup-inner',
		// 	// 'text':'testttt',
		// 	'style':style,
		// 	'id':id
		// }).appendTo('#popup-card')
  // }


}



