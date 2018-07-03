import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

function getPosts() {
	http.get('http://localhost:3000/posts')
	.then(data => ui.showPosts(data))
	.catch(err => console.log(err));
}

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

function submitPost() {
	// Get the form data
	const title = document.querySelector('#title').value,
				body = document.querySelector('#body').value,
				id = document.querySelector('#id').value;
	// Validate input
	if(title === '' || body === '') {
		ui.showAlert('Please fill up all the fields.', 'alert alert-danger');
	} else {
		const data = {
			title,
			body
		};

		// Check if there is any id in the hidden field value
		if(id === '') {
			// Create Post
			http.post('http://localhost:3000/posts', data)
				.then(data => {
					ui.showAlert('Post Added!', 'alert alert-success');
					ui.clearFields();
					getPosts();
				})
				.catch(err => ui.showAlert(err, 'alert alert-danger'));
		} else {
			// Update Post
			http.put(`http://localhost:3000/posts/${id}`, data)
			.then(data => {
				ui.showAlert('Post Updated!', 'alert alert-success');
				ui.changeFormState('add');
				getPosts();
			})
			.catch(err => ui.showAlert(err, 'alert alert-danger'));
		}
	}
}

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

function enableEdit(e) {
	// Handel Edit Content
	if(e.target.parentElement.classList.contains('edit')) {
		const id = e.target.parentElement.dataset.id,
					title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent,
					body = e.target.parentElement.previousElementSibling.textContent,
					data = {id, title, body};

		// Fill the form with the current post
		ui.fillForm(data);
	}

	// Handel Delete Comtent
	if(e.target.parentElement.classList.contains('delete')) {
		// confirm if the user really wanna delete the item 
		if(confirm('Do you really want to delete this post?')) {
			const id = e.target.parentElement.dataset.id;
			http.delete(`http://localhost:3000/posts/${id}`)
			.then(data => {
				ui.showAlert('This post has been successfully deleted', 'alert alert-success');
				getPosts();
			})
			.catch(err => ui.showAlert(err, 'alert alert-danger'));
		}
	}

	e.preventDefault();
}

// Listen for cancel edit button click
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function cancelEdit(e) {
	if(e.target.classList.contains('post-cancel')) {
		ui.changeFormState('add');
	}
	e.preventDefault();
}