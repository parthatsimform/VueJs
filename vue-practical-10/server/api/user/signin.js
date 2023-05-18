import Axios from "axios";
export default defineEventHandler(async (event) => {
	const res = await Axios.get(import.meta.env.VITE_USER_URL);
	const data = await res.data.data;
	return data;
});
