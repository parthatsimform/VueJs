export default async (id) => {
	const deleted = await useFetch("/api/car/delete", {
		method: "DELETE",
		body: id,
	});
	return deleted;
};
