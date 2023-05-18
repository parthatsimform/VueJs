import Axios from "axios";
export default defineEventHandler(async (event) => {
	const { id } = event.context.params;
	let headers = {};
	let data = {};
	if (process.client) {
		headers.Authorization = `Bearer ${window.localStorage.getItem(
			"token"
		)}`;
	}
	const res = await Axios.get(`${import.meta.env.VITE_CAR_URL}/${id}`, {
		headers,
	});
	data = await res.data;
	return data;
});
