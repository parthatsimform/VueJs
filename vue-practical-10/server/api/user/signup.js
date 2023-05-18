import Axios from "axios";
export default defineEventHandler(async (event) => {
	const newUser = await readBody(event);
	const res = await Axios.post(import.meta.env.VITE_USER_URL, newUser);
	if (res.status === 201) {
		return true;
	}
	return false;
});
