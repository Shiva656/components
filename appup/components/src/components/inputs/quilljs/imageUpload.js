/**
 * Custom module for quilljs to allow user to drag images from their file system into the editor
 * and paste images from clipboard (Works on Chrome, Firefox, Edge, not on Safari)
 * @see https://quilljs.com/blog/building-a-custom-module/
 */

import axios from "axios";
export class ImageUpload {

	/**
	 * Instantiate the module given a quill instance and any options
	 * @param {Quill} quill
	 * @param {Object} options
	 */
	constructor(quill, options = {}) {
		// save the quill reference
		this.quill = quill;
		// save options
		this.options = options;
		// listen for drop and paste events
		this.quill.getModule('toolbar').addHandler('image', this.selectLocalImage.bind(this));
	}


	/**
	 * Select local image
	 */
	selectLocalImage() {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.click();

		// Listen upload local image and save to server
		input.onchange = () => {
			const file = input.files[0];

			// file type is only image.
			if (/^image\//.test(file.type)) {
				const checkBeforeSend = this.options.checkBeforeSend || this.checkBeforeSend.bind(this);
				checkBeforeSend(file, this.sendToServer.bind(this));
			} else {
				console.warn('You could only upload images.');
			}
		};
	}

	/**
	 * Check file before sending to the server
	 * @param {File} file 
	 * @param {Function} next 
	 */
	checkBeforeSend(file, next) {
		next(file);
	}

	/**
	 * Send to server
	 * @param {File} file
	 */
	sendToServer(file) {
		const url = this.options.url || 'your-url.com',
			method = this.options.method || 'POST',
			headers = this.options.headers || {},
			callbackOK = this.options.callbackOK || this.uploadImageCallbackOK.bind(this),
			callbackKO = this.options.callbackKO || this.uploadImageCallbackKO.bind(this),



			fd = new FormData();
		// fd.append('image', file);

		// const xhr = new XMLHttpRequest();
		// init http query
		// xhr.open(method, url, true);
		// add custom headers
		// for (var index in headers) {
		// 	xhr.setRequestHeader(index, headers[index]);
		// }

		// listen callback
		// xhr.onload = () => {
		// 	if (xhr.status === 200) {
		// 		callbackOK(JSON.parse(xhr.responseText), this.insert.bind(this));
		// 	} else {
		// 		callbackKO({
		// 			code: xhr.status,
		// 			type: xhr.statusText,
		// 			body: xhr.responseText
		// 		});
		// 	}
		// };

		// xhr.send(fd);

		let _this = this;

		axios.put(url, file,{ withCredentials: true, credentials: 'include' }).then(function (response) {

			console.log("response" + response);
			if (response.status === 200) {
				if (!response.data) {
					response.data = {
						image_url: _this.options.s3url
					};
				}

				callbackOK(response, (_this.insert.bind(_this)));
			} else {
				callbackKO({
					code: response.status,
					type: response.statusText
				});
			}
		}).catch(function (error) {
			console.log(error);
		});
	}

	/**
	 * Insert the image into the document at the current cursor position
	 * @param {String} dataUrl  The base64-encoded image URI
	 */
	insert(dataUrl) {
		const selection = this.quill.getSelection();
		const index = selection ? selection.index : this.quill.getLength();
		this.quill.insertEmbed(index, 'image', dataUrl, 'user');
	}

	/**
	 * callback on image upload succesfull
	 * @param {Any} response http response
	 */
	uploadImageCallbackOK(response, next) {
		next(response);
	}

	/**
	 * callback on image upload failed
	 * @param {Any} error http error
	 */
	uploadImageCallbackKO(error) {
		alert(error);
	}


}