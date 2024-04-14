import { LocalStorage } from "./storage.js";
import PreviewCart from "./PreviewCart.js";

function renderProductInCart() {
	let userInfoStorage = LocalStorage("infor_user");
	let products = userInfoStorage.get("data").products;
	let header = document.querySelector("header");
	if (header.querySelector(".count_products")) {
		header.querySelector(".count_products").textContent = products.length;
	}
	let subtotal_price = document.querySelector(".subtotal_price");
	let total_price = document.querySelector(".total_price");
	let total = 0;
	return products
		.map(function (product) {
			total += parseFloat(product.price) * parseFloat(product.count);
			subtotal_price.textContent = total;
			total_price.textContent = total + 32;
			return `
			<div class="mb-4 bg-white p-6">
				<div class="flex py-6">
					<div
						class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
					>
						<img
							loading="lazy"
							src="${product.image}"
							alt="${product.title}"
							class="h-full w-full object-cover object-center"
						/>
					</div>
					<div class="ml-4 flex flex-1 flex-col">
						<div>
							<div class="flex justify-between text-base font-medium text-gray-900">
								<h3>
									<a href="${
										window.location.origin
									}/detail_product.html#${product.id}" class="el__match--route">${product.title[0].toUpperCase() + product.title.slice(1)}</a>
								</h3>
								<p class="ml-4">$${product.price}</p>
							</div>
							<p class="mt-1 text-sm text-gray-500">${product.brand}</p>
						</div>
						<div class="flex flex-1 items-end justify-between text-sm">
							<p class="text-gray-500">Qty ${product.count}</p>

							<div class="flex">
								<button
									type="button"
									class="font-medium text-indigo-600 hover:text-indigo-500 btn__remove--item"
									data-id="${product.id}"
								>
									Remove
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
		})
		.join("\n");
}

window.addEventListener("DOMContentLoaded", function () {
	let contentProducts = this.document.querySelector(".content-products");
	contentProducts.innerHTML = renderProductInCart();
	contentProducts.addEventListener("click", (e) => {
		let userInfoStorage = LocalStorage("infor_user");
		let btn_remove_item = e.target.closest(".btn__remove--item");
		if (btn_remove_item) {
			let id = btn_remove_item.dataset.id;
			let data = userInfoStorage.get("data");
			let index = data.products.findIndex((item) => item.id == id);
			if (index >= 0) {
				data.products.splice(index, 1);
				userInfoStorage.set("data", data);
				contentProducts.innerHTML = renderProductInCart();
			}
		}
	});
});
