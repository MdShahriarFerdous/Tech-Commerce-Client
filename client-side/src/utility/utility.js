export const getBasicUserData = () => {
	const data = localStorage.getItem("basic-user");
	if (data) {
		return JSON.parse(data);
	} else {
		console.error("User data not found in local storage");
		return null;
	}
};
