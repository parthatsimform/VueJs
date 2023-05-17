export default async () => {
	const { data, error } = await useFetch("/api/car/all");
	if (error.value) {
		return console.log("Error:", error.value);
	}
	return { data };
};
