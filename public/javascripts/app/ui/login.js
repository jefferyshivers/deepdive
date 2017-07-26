

// login from main screen
// function frontLogin() {
// 	// let is_visible = document.getElementsByClassName('signup-container')[0].style.visibility

// 	$('.login-container').css({
// 		'z-index':54,
// 		'visibility':'visible'
// 	})
// 	$('.signup-container').css({
// 		'z-index':0,		
// 		'visibility':'hidden'
// 	})


// 	// hide the others
// 	$('.dropdown-user').css({
// 		'visibility':'hidden'
// 	})
// 	$('.dropdown-notifications').css({
// 		'visibility':'hidden'
// 	})
// 	$('.add-container').css({
// 		'visibility':'hidden'
// 	})
// }






// login from dropdown icon

$('#dropdown-login-container').keypress(function(e) {
	if (e.which == 13) {
		console.log('you just tried to login')
		var email = document.getElementById('submit-login-name').value
		var password = document.getElementById('submit-login-password').value
		loginVerifiedEmailAccount(email,password)
		$('.dropdown-container').css({
			'z-index':0
		})
		$('.dropdown-user').css({
			'visibility':'hidden'
		})
		document.getElementById('submit-login-name').value = ""
		document.getElementById('submit-login-password').value = ""
	}
});



function userSignOut() {
	$('.dropdown-container').css({
		'z-index':0
	})	
	$('.dropdown-user').css({
		'visibility':'hidden'
	})

	firebase.auth().signOut()
	if (window.location.pathname !== "/") {
		window.location = "/";
	}

}