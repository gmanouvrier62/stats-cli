/* eslint-disable */
import axios from 'axios';


// Fonction de vérification que les données ajax reçues du serveur sont valides
// Argument
// data : correspond aux données reçues suite à un appel AJAX au serveur

export function isValid(data) {
var status = {};
	if (typeof data == "object") {
		status.error = false;
		return status;
	}
	if (typeof data == "string") {
		var strTest = data.substring(0, 2000);
		// console.log("strTest = "+strTest);
		if (strTest.indexOf('testajax="LoginAjax"') != -1) {
			console.log("Not logged anymore ");
			status.error = true;
			status.cause = "logout";
			return status;
		}
		if (strTest.indexOf('testajax="NmErrConnect"') != -1) {
			console.log("Connection failure ");
			status.error = true;
			status.cause = "dbAccessError";
			return status;
		}
		if (strTest.indexOf('location.reload') != -1) {
			console.log("location.reload(true)");
			status.error = true;
			status.cause = "reload";
			return status;
		}
		status.error = false;
		return status;
	}
	console.log("undefined type of result data ");
	status.error = true;
	status.cause = "undefinedError";
	return status;
}

export function ApiGetFromServer(uri) {

	return new Promise((resolve, reject) => {
		//je constate que le payload est vide, je ne sais pas quoi mettre dedans donc je mets "rcsvalidator" en base64 comme recommandé
        //token = token.replace("..","ewogICJuYW1lIjogImdpbGxlcy5tYW5vdXZyaWVyIiwKICAibGFzdCI6ICJtYW5vdXZyaWVyIgp9");
		axios.get(uri).then((result) => {
			// console.log("Result.data =", result.data);
			var status = isValid(result.data);
			if (status.error == false) {
				return resolve(result.data);
			} else {
				if (status.cause == 'logout') {
					top.postMessage('logout', window.location.href);
				} else if (status.cause == 'dbAccessError') {
					top.postMessage('dbAccessError', window.location.href);
				} else if (status.cause == 'reload') {
					top.postMessage('reload', window.location.href);
				} else {
					top.postMessage('badData', window.location.href);
					console.log("Server badData or not logged anymore");
				}
				return reject(new Error("badData"));
			}
		})
		.catch( (error) => {
			console.log("Server error (GET)", error);
			top.postMessage('Erreur du serveur : '+ error, window.location.href);
			return reject(new Error("Server Error"));
		});
	});

}

export function ApiPostToServer(uri, datas) {
	//token = token.replace("..",".");
	return new Promise((resolve, reject) => {
		axios.post(uri, datas).then((result) => {
			// console.log("Result.data =", result.data);
			var status = isValid(result.data);
			if (status.error == false) {
				return resolve(result.data);
			} else {
				if (status.cause == 'logout') {
					top.postMessage('logout', window.location.href);
				} else if (status.cause == 'dbAccessError') {
					top.postMessage('dbAccessError', window.location.href);
				} else if (status.cause == 'reload') {
					top.postMessage('reload', window.location.href);
				} else {
					top.postMessage('badData', window.location.href);
					console.log("Server badData or not logged anymore");
				}
				return reject(new Error("badData"));
			}
		})
		.catch( (error) => {
			console.log("Server error (POST)", error);
			top.postMessage('Erreur du serveur : '+ error, window.location.href);
			return reject(new Error("Server Error"));
		});
	});

}
export function ApiPutToServer(uri, datas) {
	//token = token.replace("..",".");
	return new Promise((resolve, reject) => {
		axios.put(uri, datas).then((result) => {
			// console.log("Result.data =", result.data);
			var status = isValid(result.data);
			if (status.error == false) {
				return resolve(result.data);
			} else {
				if (status.cause == 'logout') {
					top.postMessage('logout', window.location.href);
				} else if (status.cause == 'dbAccessError') {
					top.postMessage('dbAccessError', window.location.href);
				} else if (status.cause == 'reload') {
					top.postMessage('reload', window.location.href);
				} else {
					top.postMessage('badData', window.location.href);
					console.log("Server badData or not logged anymore");
				}
				return reject(new Error("badData"));
			}
		})
		.catch( (error) => {
			console.log("Server error (POST)", error);
			top.postMessage('Erreur du serveur : '+ error, window.location.href);
			return reject(new Error("Server Error"));
		});
	});

}

export function ApiPatchToServer(uri, datas) {
	//token = token.replace("..",".");
	return new Promise((resolve, reject) => {
		axios.patch(uri, datas).then((result) => {
			// console.log("Result.data =", result.data);
			var status = isValid(result.data);
			if (status.error == false) {
				return resolve(result.data);
			} else {
				if (status.cause == 'logout') {
					top.postMessage('logout', window.location.href);
				} else if (status.cause == 'dbAccessError') {
					top.postMessage('dbAccessError', window.location.href);
				} else if (status.cause == 'reload') {
					top.postMessage('reload', window.location.href);
				} else {
					top.postMessage('badData', window.location.href);
					console.log("Server badData or not logged anymore");
				}
				return reject(new Error("badData"));
			}
		})
		.catch( (error) => {
			console.log("Server error (POST)", error);
			top.postMessage('Erreur du serveur : '+ error, window.location.href);
			return reject(new Error("Server Error"));
		});
	});

}

export function ApiNativePostToServer(uri, datas) {

	return new Promise((resolve, reject) => {

		axios.post(uri, datas).then((result) => {
			// console.log("Result.data =", result.data);
			var status = isValid(result.data);
			if (status.error == false) {
				return resolve(result.data);
			} else {
				if (status.cause == 'logout') {
					top.postMessage('logout', window.location.href);
				} else if (status.cause == 'dbAccessError') {
					top.postMessage('dbAccessError', window.location.href);
				} else if (status.cause == 'reload') {
					top.postMessage('reload', window.location.href);
				} else {
					top.postMessage('badData', window.location.href);
					console.log("Server badData or not logged anymore");
				}
				return reject(new Error("badData"));
			}
		})
		.catch( (error) => {
			console.log("Server error (POST)", error);
			top.postMessage('Erreur du serveur : '+ error, window.location.href);
			return reject(new Error("Server Error"));
		});
	});

}
export function ApiUploadToServer(uri, formData) {

	var mutlipartInfo = {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	};

	return new Promise((resolve, reject) => {

		axios.post(uri, formData, mutlipartInfo).then((result) => {
			// console.log("Result.data =", result.data);
			var status = isValid(result.data);
			if (status.error == false) {
				return resolve(result.data);
			} else {
				if (status.cause == 'logout') {
					top.postMessage('logout', window.location.href);
				} else if (status.cause == 'dbAccessError') {
					top.postMessage('dbAccessError', window.location.href);
				} else if (status.cause == 'reload') {
					top.postMessage('reload', window.location.href);
				} else {
					top.postMessage('badData', window.location.href);
					console.log("Server badData or not logged anymore");
				}
				return reject(new Error("badData"));
			}
		})
		.catch( (error) => {
			console.log("Server error (POST)", error);
			top.postMessage('Erreur du serveur : '+ error, window.location.href);
			return reject(new Error("Server Error"));
		});
	});

}
export function isCookieSet() {
	return true;

	 const authCookieName = 'VotreNomDeCookieAuth0';

     // Utilisation de js-cookie pour récupérer le cookie par son nom
     const authCookie = Cookies.get(authCookieName);


}
