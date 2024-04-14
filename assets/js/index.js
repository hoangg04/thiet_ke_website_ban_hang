import { LocalStorage } from "./storage.js";
import PreviewCart from "./PreviewCart.js";
document.addEventListener("DOMContentLoaded", function (e) {
	if (!document.querySelector(".pop-up")) {
		let popupEl = document.createElement("div");
		popupEl.classList = "pop-up flex flex-col h-max fixed top-[70px] right-2 gap-3";
		popupEl.style.zIndex = 9999999
		document.querySelector("body").appendChild(popupEl);
	}
	let header = document.querySelector("header");
	let preview_cart = document.querySelector(".preview_cart");
	if (preview_cart) {
		preview_cart.addEventListener("click", (e) => {
			let userInfoStorage = LocalStorage("infor_user");
			let btn_remove_item = e.target.closest(".btn__remove--item");
			if (btn_remove_item) {
				let id = btn_remove_item.dataset.id;
				let data = userInfoStorage.get("data");
				let index = data.products.findIndex((item) => item.id == id);
				if (index >= 0) {
					data.products.splice(index, 1);
					userInfoStorage.set("data", data);
					preview_cart.innerHTML = PreviewCart();
				}
			}
		});
	}

	header.addEventListener("click", function (e) {
		let menuButton = e.target.closest(".toggle-menu");
		let toggle_preview_cart = e.target.closest(".toggle_preview-cart");
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
				navBar.classList.add("flex-col", "w-2/3", "bg-primary-light", "mt-[60px]", "opacity-100");
				navBar.classList.remove("w-0", "opacity-0");
				if (!preview_cart.classList.contains("hidden")) {
					preview_cart.classList.remove("flex");
					preview_cart.classList.add("hidden");
				}
			}
		}
		if (toggle_preview_cart) {
			if (!preview_cart.classList.contains("hidden")) {
				preview_cart.classList.remove("flex");
				preview_cart.classList.add("hidden");
			} else {
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
				}
				preview_cart.classList.remove("hidden");
				preview_cart.classList.add("flex");
			}
		}
	});
});
