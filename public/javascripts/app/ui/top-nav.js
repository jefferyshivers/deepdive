

 // dropdown menus

$('.top-nav .user .material-icon').click(function(){
	var new_vis
	var z
	var color

	let is_visible = document.getElementsByClassName('dropdown-user')[0].style.visibility
	if (is_visible === 'visible') {
		new_vis = 'hidden'
		z = 0
		color = "rgb(220,220,220)"
	} else {
		new_vis = 'visible'
		z = 55
		color = "rgb(0,200,255)"
	}

	$('.dropdown-container').css({
		'z-index':z
	})
	$('.top-nav .notifications .material-icon').css({
		'color':"rgb(220,220,220)"
	})	
	$('.dropdown-user').css({
		'visibility':new_vis
	})
	$('.top-nav .user .material-icon').css({
		'color':color
	})
	$('.dropdown-notifications').css({
		'visibility':'hidden'
	})
})


$('.signup-or-login .login').click(function() {
	var new_vis
	var z
	var color

	let is_visible = document.getElementsByClassName('dropdown-user')[0].style.visibility
	if (is_visible === 'visible') {
		new_vis = 'hidden'
		z = 0
		color = "rgb(220,220,220)"
	} else {
		new_vis = 'visible'
		z = 55
		color = "rgb(0,200,255)"
	}

	$('.dropdown-container').css({
		'z-index':z
	})
	$('.top-nav .notifications .material-icon').css({
		'color':"rgb(220,220,220)"
	})	
	$('.dropdown-user').css({
		'visibility':new_vis
	})
	$('.top-nav .user .material-icon').css({
		'color':color
	})
	$('.dropdown-notifications').css({
		'visibility':'hidden'
	})

	$('.signup-container').css({
		'z-index':0,
		'visibility':'hidden',
	})
	signing_up = false

})




$('.signup-or-login .signup').click(function() {

	document.getElementsByClassName('dropdown-user')[0].style.visibility = "hidden"
	$('.top-nav .material-icon').css({
		'color':"rgb(220,220,220)"
	})	
	$('.dropdown-user').css({
		'visibility':'hidden'
	})

	// from signup.js
	frontSignup()
})










// $('.top-nav .notifications .material-icon').click(function(){
// 	var new_vis
// 	var z
// 	var color

// 	let is_visible = document.getElementsByClassName('dropdown-notifications')[0].style.visibility
// 	if (is_visible === 'visible') {
// 		new_vis = 'hidden'
// 		z = 0
// 		color = "rgb(220,220,220)"		
// 	} else {
// 		new_vis = 'visible'
// 		z = 55
// 		color = "rgb(0,200,255)"		
// 	}

// 	$('.dropdown-container').css({
// 		'z-index':z
// 	})
// 	$('.top-nav .user .material-icon').css({
// 		'color':"rgb(220,220,220)"
// 	})
// 	$('.dropdown-notifications').css({
// 		'visibility':new_vis
// 	})
// 	$('.top-nav .notifications .material-icon').css({
// 		'color':color
// 	})
// 	$('.dropdown-user').css({
// 		'visibility':'hidden'
// 	})
// })




$('.top-nav .add-and-user .add-content .material-icon').click(function(){
	var new_vis
	var z
	var color

	let is_visible = document.getElementsByClassName('add-container')[0].style.visibility
	if (is_visible === 'visible') {
		new_vis = 'hidden'
		z = 0
		color = 'rgb(220,220,220)'
	} else {
		new_vis = 'visible'
		z = 54
		color = 'rgb(0,200,255)'
	}

	$('.dropdown-notifications').css({
		'z-index':0,
		'visibility':'hidden'
	})
	$('.dropdown-container').css({
		'z-index':0
	})	
	$('.dropdown-user').css({
		'z-index':0,
		'visibility':'hidden'
	})
	$('.top-nav .material-icon').css({
		'color':"rgb(220,220,220)"
	})
	$('.top-nav .add-content .material-icon').css({
		'color':color
	})
	$('.add-container').css({
		'z-index':z,
		'visibility':new_vis
	})

})