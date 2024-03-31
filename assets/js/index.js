document.addEventListener("DOMContentLoaded", function (e) {
	let header = document.querySelector("header");
	let menuButton = null;
	header.addEventListener("click", function (e) {
		menuButton = e.target.closest(".toggle-menu");
		if (menuButton) {
			let navBar = document.querySelector(".nav__bar");
			if (!navBar.classList.contains("w-0")) {
				navBar.classList.remove(
					"flex-col",
					"w-2/3",
					"bg-primary-light",
					"mt-[60px]",
					"opacity-100",
				);
				navBar.classList.add("w-0", "opacity-0");
			} else {
				navBar.classList.add(
					"flex-col",
					"w-2/3",
					"bg-primary-light",
					"mt-[60px]",
					"opacity-100",
				);
				navBar.classList.remove("w-0", "opacity-0");
			}
		}
	});
});
