

var signing_up = false

// calls the signup form
function frontSignup() {
	signing_up = true

	$('.signup-container').css({
		'z-index':54,
		'visibility':'visible'
	})
	$('.login-container').css({
		'z-index':0,		
		'visibility':'hidden'
	})

	// hide the others
	$('.dropdown-user').css({
		'visibility':'hidden'
	})
	$('.dropdown-notifications').css({
		'visibility':'hidden'
	})
	$('.add-container').css({
		'visibility':'hidden'
	})


	$('.dropdown-container').css({
		'z-index':0,
		'visibility':'hidden'
	})

}



$('.signup-container .email').keypress(function(e) {
	if (e.which == 13) {
		console.log('you just tried to login')
		var email = document.getElementById('signup-form-email').value
		var password = document.getElementById('signup-form-password').value
		// from auth/email.js
		makeEmailAccount(email,password)
		document.getElementById('signup-form-email').value = ""
		document.getElementById('signup-form-password').value	= ""
	}
	signing_up = false
});




$(function(){
	$('.signup-container #signup-with-facebook').click(function(){
		facebookSignin()
		signing_up = false
	})
})






$('body').click(function(event){
	if (signing_up) {
		let x = event.pageX
		let y = event.pageY
		let pageW = document.getElementsByTagName('body')[0].scrollWidth
		let form = 500
		if (y > 50) {
			if (x < ((pageW - form) / 2) || x > (form + ((pageW - form) / 2)) || y > 320) {
				$('.signup-container').css({
					'z-index':0,
					'visibility':'hidden',
				})
				signing_up = false
			}
		}
	}
})