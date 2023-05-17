import Axios from "axios";
export default defineEventHandler(async (event) => {
	let headers = {};
	let data = {};
	if (process.client) {
		headers.Authorization = `Bearer ${window.localStorage.getItem(
			"token"
		)}`;
	}
	const res = await Axios.get(import.meta.env.VITE_CAR_URL, { headers });
	data = await res.data.data;
	return data;

	// const res = await Axios.get(import.meta.env.VITE_CAR_URL, {
	// 	headers: {
	// 		Authorization: `Bearer ${window.localStorage.getItem("token")}`,
	// 	},
	// });
	// const data = await res.data.data;
	// return data;
});
