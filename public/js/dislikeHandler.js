const dislikeHandler = async (event) => {
	event.preventDefault()
	const { value } = event.currentTarget
	const likeValue = {
		dislike: value
	}

	const users = document.querySelectorAll('.user-card')
	const usersArray = [...users]

	const likedUsers = usersArray.filter(user => user.dataset.id === value)

	likedUsers.forEach(user => user.classList.add('liked'))
	setTimeout(() => likedUsers.forEach(user => user.classList.add('like-remove')), 1000)
	
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