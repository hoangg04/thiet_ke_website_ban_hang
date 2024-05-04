import { LocalStorage } from "./storage.js";
import PreviewCart from "./PreviewCart.js";

function renderProductInCart() {
	let userInfoStorage = LocalStorage("infor_user");
	let products = [];
	if (userInfoStorage.get("data")) {
		products = userInfoStorage.get("data").products;
	}
	let header = document.querySelector("header");
	if (header.querySelector(".count_products")) {
		header.querySelector(".count_products").textContent = products.length;
	}
	let subtotal_price = document.querySelector(".subtotal_price");
	let total_price = document.querySelector(".total_price");
	let total = 0;
	if (products.length == 0 && subtotal_price && total_price) {
		subtotal_price.textContent = total;
		total_price.textContent = 0;
	}
	return products
		.map(function (product) {
			total += parseFloat(product.price) * parseFloat(product.count);
			subtotal_price.textContent = total.toFixed(2);
			total_price.textContent = (total + 32).toFixed(2);
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
						<div
									class="flex flex-row justify-end gap-3 my-2 items-center"
								>
									<div class="isolate inline-flex  gap-2 -space-x-px rounded-md">
										<button
											class="relative flex h-[30px] w-[30px] items-center justify-center rounded-l-md px-2 py-2 text-dark border-[2px] border-indigo-600 checkout decrement_item" data-id="${
												product.id
											}"
										>
											<span><img src="../assets/icons/minus.png" /></span>
										</button>
										<span
											class="text-md relative z-10 inline-flex h-[30px] w-[30px] items-center justify-center rounded-md border-[2px] border-indigo-600 font-semibold text-dark checkout count_item"
											>${product.count}</span
										>
										<button
											class="hover:bg-primary-light bg-white border-indigo-600 border-[2px] relative flex h-[30px] w-[30px] items-center justify-center rounded-r-md px-2 py-2 text-dark checkout increment_item" data-id="${
												product.id
											}"
										>
											<span><img src="../assets/icons/plus.png" /></span>
										</button>
								</div>
							</div>
						<div class="flex flex-1 items-end justify-between text-sm">
							<p class="text-gray-500">Qty ${product.count}</p>

							<div class="flex">
								<button
									type="button"
									class="font-medium text-indigo-600 hover:text-indigo-500 checkout btn__remove--item"
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
	if (contentProducts) {
		contentProducts.innerHTML = renderProductInCart();
	}
});

export default renderProductInCart;
