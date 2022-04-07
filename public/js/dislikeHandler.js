async function dislikeHandler(event) {
	// make sure form doesn't get submitted
	event.preventDefault()
	// value of currentTarget
	const { value } = event.currentTarget
	// create an object with a property that has the currentTarget.value as value
	const likeValue = {
		dislike: value
	}

	// find all elements with class .user-card
	const users = document.querySelectorAll('.user-card')
	// convert NodeList to Array
	const usersArray = [...users]

	// filter liked users from usersArray
	const likedUsers = usersArray.filter(user => user.dataset.id === value)

	// add to each likedUser the class liked, and after a second the class .like-remove
	likedUsers.forEach(user => user.classList.add('liked'))
	setTimeout(() => likedUsers.forEach(user => user.classList.add('like-remove')), 1000)
	
	// post to the route /dislike-user the body of the likeValue. and return this response.
	const response = await fetch('/dislike-user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(likeValue)
	})
	return response
}

export default dislikeHandler