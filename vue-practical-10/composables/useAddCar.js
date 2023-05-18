export default async (car) => {
	const added = await useFetch("/api/car/add", {
		method: "POST",
		body: car,
	});
	return added;
};
