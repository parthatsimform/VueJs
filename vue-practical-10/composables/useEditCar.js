export default async (car) => {
	const edited = await useFetch("/api/car/edit", {
		method: "PUT",
		body: car,
	});
	return edited;
};
