import { LocalStorage } from "./storage.js";
import PreviewCart from "./PreviewCart.js";
import Toast from "./toast.js";
import { doc, updateDoc, firestore, getAuth } from "./auth.js";
function renderProduct(content, id) {
	fetch(`https://product-api-qngh.onrender.com/products/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.then((product) => {
			sessionStorage.setItem("currentProduct", JSON.stringify(product));
			content.innerHTML = `
						<div class="mt-[60px] bg-white">
				<div
					class="container mx-auto flex flex-col pb-5 pt-[100px] md:flex-row md:px-5 xl:max-w-[1200px]"
				>
					<div
						class="m-3 mt-6 flex items-center justify-center overflow-hidden rounded-md border border-green-active transition-all sm:px-6 md:m-0 md:mx-auto md:min-w-[400px]"
					>
						<img
							src="${product && product.image}"
							alt="${product && product?.title}"
						/>
					</div>

					<div class="mx-auto flex max-w-2xl flex-col px-4 pb-16 pt-10 sm:px-6">
						<div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
							<h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
								${product && product.title[0].toUpperCase() + product.title.slice(1)}
							</h1>
						</div>

						<div class="mt-4 lg:row-span-3 lg:mt-0">
							<h2 class="sr-only">Product information</h2>
							<div>
								<div class="flex items-center">
									<p class="mt-1 text-sm font-medium text-gray-300 line-through">
										$${product && product.previousPrice}
									</p>
									<p class="ml-3 mt-1 text-lg font-medium text-gray-900">
										$${product && product.price}
									</p>
								</div>
							</div>
							<div class="mt-6">
								<h3 class="sr-only">Reviews</h3>
								<div class="flex items-center">
								<div class="flex items-center">
								<p class="sr-only">4</p>
									
											<svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
												<path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path>
											</svg>
										
											<svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
												<path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path>
											</svg>
										
											<svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
												<path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path>
											</svg>
										
											<svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
												<path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path>
											</svg>
										
											<svg class="text-gray-200 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
												<path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path>
											</svg>
										
									</div>
									
								<a href="#" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">9889 reviews</a>
						</div>
					</div>
						</div>

						<div class="mt-5 pb-10">
							<div class="mb-5 flex flex-col gap-3 sm:w-[300px]">
								<div
									class="flex w-max items-center overflow-hidden rounded-lg border border-solid border-primary-light"
								>
									<button
										class="decrement__count--items flex size-10 items-center justify-center bg-white px-2 py-2 text-dark hover:bg-primary-light disabled:bg-gray-400 disabled:text-[#C4CDD5]"
										disabled
									>
										<span class="size-4"><img src="${window.location.origin}/assets/icons/minus.png" /></span>
									</button>
									<span
										class="countItems text-md z-10 inline-flex size-10 items-center justify-center border-x-[1px] border-primary-light font-semibold text-dark"
										>1</span
									>
									<button
										class="increment__count--items flex size-10 items-center justify-center bg-white px-2 py-2 text-dark hover:bg-primary-light"
									>
										<span class="size-4"><img src="${window.location.origin}/assets/icons/plus.png" /></span>
									</button>
								</div>
								<div class="flex items-center gap-3">
									<button
										type="button"
										class="text-md btn__add--product flex flex-1 justify-center rounded-md bg-green-active px-5 py-1.5 font-semibold leading-6 text-white shadow-sm hover:opacity-[90%]"
									>
										Add to cart
									</button>
									<button
										type="button"
										class="flex size-[25px] flex-shrink-0 items-center justify-center"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon icon-tabler icon-tabler-heart btn__heart"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											stroke-width="2"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<path stroke="none" d="M0 0h24v24H0z" fill="none" />
											<path
												d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
											/>
										</svg>
									</button>
								</div>
							</div>
							<h3 class="sr-only">Description</h3>
							<div class="space-y-6">
								<p class="text-base text-gray-900">
									${product && product.description}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>`;
		});
}
window.addEventListener("DOMContentLoaded", () => {
	let currentId = window.location.hash.slice(1) === "" ? 1001 : window.location.hash.slice(1);
	const content = document.querySelector("main");
	renderProduct(content, currentId);
	content.addEventListener("click", async (e) => {
		let increment_button = e.target.closest(".increment__count--items");
		let decrement_button = e.target.closest(".decrement__count--items");
		let add_product = e.target.closest(".btn__add--product");
		if (increment_button) {
			const countItems = document.querySelector(".countItems");
			countItems.textContent = parseInt(countItems.textContent) + 1;
			content.querySelector(".decrement__count--items").removeAttribute("disabled");
		}
		if (decrement_button) {
			const countItems = document.querySelector(".countItems");
			let currentCount = countItems.textContent.trim();
			if (parseInt(currentCount) - 1 === 1) {
				decrement_button.setAttribute("disabled", "");
			}
			if (parseInt(currentCount) > 1) {
				countItems.textContent = parseInt(countItems.textContent) - 1;
			}
		}
		if (add_product) {
			try {
				if (!localStorage.getItem("infor_user")) {
					throw new Error("Please login to continue");
				}
				const user = await getAuth().currentUser;
				let userInfoStorage = LocalStorage("infor_user");
				let data = null;
				if (userInfoStorage.isEmpty()) {
					data = {
						products: [],
						likes_products: [],
					};
				} else {
					data = userInfoStorage.get("data");
				}
				let currentProduct = JSON.parse(sessionStorage.getItem("currentProduct"));
				const countItems = document.querySelector(".countItems");
				let indexItem = data.products.findIndex((item) => item.id === currentProduct.id);
				if (indexItem >= 0) {
					data.products[indexItem].count += parseInt(countItems.innerText);
				} else {
					data.products.push({
						...currentProduct,
						count: parseInt(countItems.innerText),
					});
				}
				userInfoStorage.set("data", data);
				await updateDoc(doc(firestore, "users/" + user.uid), {
					data: JSON.stringify(userInfoStorage.get("data")),
				});
				new Toast({
					message: "Add product to cart sussecsfully",
					type: "success",
					absoluteEl: document.querySelector(".pop-up"),
				}).init();
				document.querySelector(".preview_cart").innerHTML = PreviewCart();
			} catch (e) {
				await new Toast({
					message: e.message,
					type: "error",
					absoluteEl: document.querySelector(".pop-up"),
					time:1000,
				}).init();
				window.location.href = window.location.origin + "/pages/login_page.html";
			}
		}
	});
});
window.addEventListener("hashchange", (e) => {
	let currentId = window.location.hash.slice(1) === "" ? 1001 : window.location.hash.slice(1);
	const content = document.querySelector("main");
	renderProduct(content, currentId);
});
