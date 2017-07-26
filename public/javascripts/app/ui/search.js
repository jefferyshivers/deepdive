


$('.top-nav .search-icon').click(function(){
	var search_val = document.getElementById('top-search-field').value
	if (search_val != "") {
		window.location = "/search=" + search_val			
	}
})

$('.top-nav #top-search-field').keypress(function(e) {
	if (e.which == 13) {
		var search_val = document.getElementById('top-search-field').value
		if (search_val != "") {
			window.location = "/search=" + search_val			
		}
	}
});





function searchQuery() {
	loadpage()	
	var query = window.location.pathname.replace("/search\=","")
	query = query.replace(/\%20/g," ")
	loadpage_SEARCH(query)

	// from db/search.js

	// momentSearch(query)

  $('<div/>', {
  	'class':'results-inner-top',
		'text':'Artists',
		'style':'color:rgb(220,220,220)'
	}).appendTo('.search-page-main')	

  $('<div/>', {
		'class':'artist-results'
	}).appendTo('.search-page-main')
	
	artistSearch(query)




	// collections

  $('<div/>', {
  	'class':'results-inner-top',
		'text':'Collections',
		'style':'color:rgb(220,220,220)'
	}).appendTo('.search-page-main')	

  $('<div/>', {
		'class':'collection-results'
	}).appendTo('.search-page-main')
	
	collectionSearch(query)




	// content search

  $('<div/>', {
  	'class':'results-inner-top',
		'text':'Content',
		'style':'color:rgb(220,220,220)'
	}).appendTo('.search-page-main')	

  $('<div/>', {
		'class':'content-results'
	}).appendTo('.search-page-main')

	contentSearch(query)	




  $('<div/>', {
		'class':'bottom-padding'
	}).appendTo('.search-page-main')




}





// function searchQuery(input) {
// 	document.getElementById('top-search-field').value = null
// 	if (input !== null && input !== "") {
// 		var query = input.split(" ")

// 		var last_window = window.location.pathname

//     window.history.pushState(
//       {url: "/search"},
//       			"/search",
//       			"/search");

//     window.onpopstate = function() {
//     	loadpage()
//     }

//     loadpage("search",input)


// 		$('.add-container').css({
// 			'z-index':0,
// 			'visibility':'hidden'
// 		})    

// 	}
// }




function loadpage_SEARCH(input) {
	$('.main .body').empty()
	// $('.main .body').load("/javascripts/app/ui/pages/search.ejs .search-page-container")
  $('<div/>', {
		'class':'search-page-container'
	}).appendTo('.main .body')
  $('<div/>', {
		'class':'search-page-top'
	}).appendTo('.search-page-container')
  $('<div/>', {
		'class':'search-page-main'
	}).appendTo('.search-page-container')
  $('<div/>', {
		'class':'query-container'
	}).appendTo('.search-page-top')

	if (input == null) {
    $('.query-container').empty()
    $('<div/>', {
			'class':'query-prelude',
			'text':'Go ahead! Search your heart away. :)'
		}).appendTo('.query-container')
	} else {
    $('.query-container').empty()
    $('<div/>', {
			'class':'query-prelude',
			'text':'Showing top matches for:'
		}).appendTo('.query-container')
		input_string =  "\"" + input + "\""
    $('<div/>', {
			'class':'query',
			'text':input_string
		}).appendTo('.query-container')
	}
}