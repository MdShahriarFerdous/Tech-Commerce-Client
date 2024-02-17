export const getBasicUserData = () => {
	const data = localStorage.getItem("basic-user");
	if (data) {
		return JSON.parse(data);
	} else {
		console.error("User data not found in local storage");
		return null;
	}
};

export const unauthorized = (code) => {
	if (code === 401 || code === 400) {
		window.location.replace("/login");
	}
};

export const truncateString = (str, num) => {
	if (str.length > num) return str.slice(0, num) + " .... ";
	else return str;
};
