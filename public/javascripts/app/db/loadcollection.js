// function load_collection(){
// 	var profile_name = window.location.pathname.replace("/user/","").toLowerCase()
// 	var usersDB = firebase.database().ref('users')
// 	var collection_list = []

// 	usersDB.once('value').then(function(snapshot){
// 		var users_objects = snapshot.val()
// 		var all_users = Object.keys(users_objects)
// 		var all_usernames = []
// 		// console.log(all_users)

// 		for (i=0;i<all_users.length;i++) {
// 			var userid = all_users[i]
// 			var username = users_objects[userid]['username'].toLowerCase()
// 			all_usernames[username] = userid
// 		}
// 		if (Object.keys(all_usernames).includes(profile_name)) {
// 			var userid = all_usernames[profile_name]
// 			var user_object = users_objects[userid]
// 			var user_collection = user_object['collections']
// 			delete user_collection['dummy-collection']
// 			var collection_values = Object.values(user_collection)
// 			for(k=0; k<collection_values.length; k++){
// 				collection_list.push(collection_values[k])
// 			}
// 		}
// 	console.log(collection_list)		
// 	})
// }

// load_collection()