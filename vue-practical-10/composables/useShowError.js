export default async (ref, errDiv, err) => {
	// console.log("Show", ref);
	ref.focus();
	ref.style.border = "1px solid red";
	document.getElementsByClassName(errDiv)[0].innerHTML = err;
};
