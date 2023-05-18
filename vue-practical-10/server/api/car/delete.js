import Axios from "axios";
export default defineEventHandler(async (event) => {
	const id = await readBody(event);
	let headers = {};
	if (process.client) {
		headers.Authorization = `Bearer ${window.localStorage.getItem(
			"token"
		)}`;
	}
	const res = await Axios.delete(`${import.meta.env.VITE_CAR_URL}/${id}`, {
		headers,
	});
	if (res.status === 204) {
		return true;
	}
	return false;
});
