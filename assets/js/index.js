import { LocalStorage } from "./storage.js";
import PreviewCart from "./PreviewCart.js";
import renderProductInCart from "./checkout_page.js"
import { doc, updateDoc, firestore, getAuth } from "./auth.js";

document.addEventListener("DOMContentLoaded", function (e) {
	async function decrement_item_count(element) {
		const user = await getAuth().currentUser;
		let userInfoStorage = LocalStorage("infor_user");
		let id = element.dataset.id;
		let data = userInfoStorage.get("data");
		let index = data.products.findIndex((item) => item.id == id);
		if (index >= 0) {
			if (data.products[index].count > 1) {
				data.products[index].count--;
				userInfoStorage.set("data", data);
				await updateDoc(doc(firestore, "users/" + user.uid), {
					data: JSON.stringify(userInfoStorage.get("data")),
				});
			}
		}
	}
	async function increment_item_count(element) {
		const user = await getAuth().currentUser;
		let userInfoStorage = LocalStorage("infor_user");
		let id = element.dataset.id;
		let data = userInfoStorage.get("data");
		let index = data.products.findIndex((item) => item.id == id);
		if (index >= 0) {
			data.products[index].count++;
			userInfoStorage.set("data", data);
			await updateDoc(doc(firestore, "users/" + user.uid), {
				data: JSON.stringify(userInfoStorage.get("data")),
			});
		}
	}
	async function destroy_item(element) {
		const user = await getAuth().currentUser;
		let userInfoStorage = LocalStorage("infor_user");
		let id = element.dataset.id;
		let data = userInfoStorage.get("data");
		let index = data.products.findIndex((item) => item.id == id);
		if (index >= 0) {
			data.products.splice(index, 1);
			userInfoStorage.set("data", data);
			await updateDoc(doc(firestore, "users/" + user.uid), {
				data: JSON.stringify(userInfoStorage.get("data")),
			});
		}
	}
	if (!document.querySelector(".pop-up")) {
		let popupEl = document.createElement("div");
		popupEl.classList = "pop-up flex flex-col h-max fixed top-[70px] right-2 gap-3";
		popupEl.style.zIndex = 9999999;
		document.querySelector("body").appendChild(popupEl);
	}
	let header = document.querySelector("header");
	let preview_cart = document.querySelector(".preview_cart");
	let content_products = document.querySelector(".content-products");
	if (preview_cart) {
		preview_cart.addEventListener("click", async (e) => {
			let btn_remove_item = e.target.closest(".btn__remove--item");
			let btn_increment_item = e.target.closest(".increment_item");
			let btn_decrement_item = e.target.closest(".decrement_item");
			if (btn_decrement_item) {
				await decrement_item_count(btn_decrement_item);
				preview_cart.innerHTML = PreviewCart();
			}
			if (btn_increment_item) {
				await increment_item_count(btn_increment_item);
				preview_cart.innerHTML = PreviewCart();
			}
			if (btn_remove_item) {
				await destroy_item(btn_remove_item);
				preview_cart.innerHTML = PreviewCart();
			}
		});
	}
	if (content_products) {
		content_products.addEventListener("click", async (e) => {
			let btn_remove_item = e.target.closest(".checkout.btn__remove--item");
			let btn_increment_item = e.target.closest(".checkout.increment_item");
			let btn_decrement_item = e.target.closest(".checkout.decrement_item");
			if (btn_decrement_item) {
				await decrement_item_count(btn_decrement_item);
				preview_cart.innerHTML = PreviewCart();
				content_products.innerHTML = renderProductInCart()

			}
			if (btn_increment_item) {
				await increment_item_count(btn_increment_item);
				preview_cart.innerHTML = PreviewCart();
				content_products.innerHTML = renderProductInCart()
			}
			if (btn_remove_item) {
				await destroy_item(btn_remove_item);
				preview_cart.innerHTML = PreviewCart();
				content_products.innerHTML = renderProductInCart()
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
		if (toggle_preview_cart && preview_cart) {
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
