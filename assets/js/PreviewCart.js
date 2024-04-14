import { LocalStorage } from "./storage.js";
function PreviewCart() {
	let userInfoStorage = LocalStorage("infor_user");
	let preview_data = userInfoStorage.get("data").products;
	let header = document.querySelector("header")
	if(header.querySelector(".count_products")){
		header.querySelector(".count_products").textContent = preview_data.length
	}
	let total = 0
	return `
	<div class="bg-dark-transparent z-20 fixed inset-0 mt-[60px]"></div>
	<div class="z-20 flex h-full flex-col bg-white">
		<div class="h-max flex-1 overflow-x-hidden overflow-y-scroll p-3">
			
			${preview_data.map((product) => {
				total += parseFloat(product.price) * parseInt(product.count)
				return `
				<div class="flex py-6">
						<div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
							<img loading="lazy" src="${
								product.image
							}" alt="iphone 14" class="h-full w-full object-cover object-center">
						</div>
						<div class="ml-4 flex flex-1 flex-col">
							<div>
								<div class="flex justify-between text-base font-medium text-gray-900">
									<h3>
										<a href="/#/detail-product/1002" class="el__match--route" "="">${
											product.title[0].toUpperCase() + product.title.slice(1)
										}</a>
									</h3>
									<p class="ml-4">$${product.price}</p>
								</div>
								<p class="mt-1 text-sm text-gray-500">Apple</p>
							</div>
							<div class="flex flex-1 items-end justify-between text-sm">
								<p class="text-gray-500">Qty ${product.count}</p>
		
								<div class="flex">
									<button type="button" class="font-medium text-indigo-600 hover:text-indigo-500 btn__remove--item" data-id="${product.id}">
										Remove
									</button>
								</div>
							</div>
						</div>
					</div>`;
			})}
			
		
			</div>
			
		<div class="mt-auto flex-shrink-0 flex-grow-0 border-t border-gray-200 px-4 py-6 sm:px-6">
			<div class="flex justify-between text-base font-medium text-gray-900">
				<p>Subtotal</p>
				<p>$${total}</p>
			</div>
			<div class="mt-6">
				<a href="/#/checkout" class="flex items-center justify-center rounded-md border border-transparent bg-green-active px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-90 el__match--route">Checkout</a>
			</div>
			<div class="mt-6 flex justify-center text-center text-sm text-gray-500">
				<p>
					or
					<button type="button" class="font-medium text-green-active hover:opacity-90">
						Continue Shopping
						<span aria-hidden="true"> →</span>
					</button>
				</p>
			</div>
		</div>
	</div>
	`;
}

document.querySelector(".preview_cart").innerHTML = PreviewCart();
export default PreviewCart;