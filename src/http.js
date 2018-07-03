/**
 * Easy HTTP Library
 * Library for making HTTP requests
 * 
 * @version 3.0.0
 * @author Saumya Majumder
 * @license GPL
 * 
**/

// Create the EasyHTTP class
class EasyHTTP {
	// Method for making HTTP GET requests
	async get(url) {
		// Set up a try catch block
		try {
			// Set await for getting the fetch response
			const serverResponse = await fetch(url);
			// Check if the response if OK - Only execute after the Fetch() is finish
			if(serverResponse.ok) {
				// Get the data out of the server response and await for it
				const data = await serverResponse.json();
				// now return the data - Only execute after the system get the data
				return data;
			} else {
				// if the response is not OK, throw a new error with the error code
				throw new Error(`The network is returning ERROR: ${serverResponse.status}`);
			}
		} catch(err) {
			throw new Error(err.message);
		}
	}

	// Method for making HTTP POST request
	async post(url, inputData) {
		// Set up the try-catch block
		try {
			// Make the fetch request and make it await
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(inputData)
			});

			// Check if the response is OK else throw error
			if(response.ok) {
				// Get the new data and await for it
				const data = await response.json();
				// now lets return the data
				return data;
			} else {
				// Response is not OK throw error
				throw new Error(`The network is returning ERROR: ${response.status}`);
			}
		} catch(err) {
			throw new Error(err.message);
		}
	}

	// Method for making HTTP PUT request i.e. updating the data
	async put(url, data) {
		// set up a try-catch block
		try {
			// Make a fetch request to the url and await for it
			const response = await fetch(url, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			// Check if the response is OK, else throw error
			if(response.ok) {
				// Get the new data and await for it
				const responseData = await response.json();
				// return the response data
				return responseData;
			} else {
				throw new Error(`The network is returning ERROR: ${response.status}`);
			}
		} catch(err) {
			throw new Error(err.message);
		}
	}

	// Method for making HTTP DELETE request
	async delete(url) {
		// set up the try-catch block
		try {
			// Make a fetch request to the url and await for it
			const response = await fetch(url, {
				method: 'DELETE'
			});
			// Check if the Response is OK else throw ERROR
			if(response.ok) {
				return 'The data has been deleted...';
			} else {
				throw new Error(`The network is returning ERROR: ${response.status}`);
			}
		} catch(err) {
			throw new Error(err.message);
		}
	}
}

export const http = new EasyHTTP();