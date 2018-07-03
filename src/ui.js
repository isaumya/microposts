import { domainToASCII } from "url";

class UI {
	constructor() {
		this.post = document.querySelector('#posts');
		this.titleInput = document.querySelector('#title');
		this.bodyInput = document.querySelector('#body');
		this.idInput = document.querySelector('#id');
		this.postSubmit = document.querySelector('.post-submit');
		this.formState = 'add';
	}

	showPosts(posts) {
		let output = '';

		posts.forEach((post) => {
			output += `<div class="card mb-3">
				<div class="card-body">
					<h4 class="card-title">${post.title}</h4>
					<p class="card-text">${post.body}</p>
					<a href="#" class="edit card-link" data-id="${post.id}">
						<i class="fa fa-pencil"></i>
					</a>
					<a href="#" class="delete card-link" data-id="${post.id}">
						<i class="fa fa-remove"></i>
					</a>
				</div>
			</div>`;
		});

		this.post.innerHTML = output;
	}

	showAlert(msg, className) {
		this.clearAlert();
		const div = document.createElement('div');
		div.className = className;
		div.appendChild(document.createTextNode(msg));
		// get parent
		const container = document.querySelector('.postsContainer');
		// posts div
		const postDiv = document.querySelector('#posts');
		container.insertBefore(div, postDiv);
		// timeout after 3s
		setTimeout(() => {
			this.clearAlert();
		}, 3000);
	}

	clearAlert() {
		const currentAlert = document.querySelector('.alert');
		if(currentAlert) {
			currentAlert.remove();
		}
	}

	clearFields() {
		this.titleInput.value = '';
		this.bodyInput.value = '';
	}

	fillForm(data) {
		this.titleInput.value = data.title;
		this.bodyInput.value = data.body;
		this.idInput.value = data.id;

		// Change Form Satet to Edit State
		this.changeFormState('edit');
	}

	changeFormState(stateType) {
		if(stateType === 'edit') {
			this.postSubmit.textContent = 'Update Post';
			this.postSubmit.classList.remove('btn-primary');
			this.postSubmit.classList.add('btn-warning');

			// Create cancel button
			const cancelBtn = document.createElement('button');
			cancelBtn.className = 'post-cancel btn btn-info btn-block';
			cancelBtn.appendChild(document.createTextNode('Cancel Edit'));

			// Get parent
			const cardForm = document.querySelector('.card-form');
			// Get the element to insert before
			const formEnd = document.querySelector('.form-end');
			// Insert the the cancel button
			cardForm.insertBefore(cancelBtn, formEnd);
		} else {
			// When we are in add state
			this.postSubmit.textContent = 'Post It';
			this.postSubmit.classList.remove('btn-warning');
			this.postSubmit.classList.add('btn-primary');
			// Remove cancel button if it is there
			if(document.querySelector('.post-cancel')) {
				document.querySelector('.post-cancel').remove();
			}
			// Clear ID from the hidden field
			this.clearHiddenFieldID();
			// Clear the text fields
			this.clearFields();
		}
	}

	// Cler the id from the hidden field
	clearHiddenFieldID() {
		this.idInput.value = '';
	}
}

export const ui = new UI;