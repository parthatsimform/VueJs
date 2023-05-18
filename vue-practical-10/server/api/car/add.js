import Axios from "axios";
export default defineEventHandler(async (event) => {
	const car = await readBody(event);
	let headers = {};
	if (process.client) {
		headers.Authorization = `Bearer ${window.localStorage.getItem(
			"token"
		)}`;
	}
	const res = await Axios.post(import.meta.env.VITE_CAR_URL, car, {
		headers,
	});
	if (res.status === 201) {
		return true;
	}
	return false;
});
