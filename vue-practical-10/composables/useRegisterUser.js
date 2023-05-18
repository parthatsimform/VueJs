export default async (newUser) => {
	const registered = await useFetch("/api/user/signup", {
		method: "POST",
		body: newUser,
	});
	return registered;
};
