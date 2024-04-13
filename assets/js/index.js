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
				navBar.classList.add("flex-col", "w-2/3", "bg-primary-light", "mt-[60px]", "opacity-100");
				navBar.classList.remove("w-0", "opacity-0");
			}
		}
	});
	// const productsContainer = document.querySelector(".main_content");
	// const API = "https://product-api-qngh.onrender.com/products/1004";
	// async function fetchandDisplayData() {
	// 	try {
	// 		const respone = await fetch(API);
	// 		const data = await respone.json();
	// 		console.log(data);
	// 		displayData(data);
	// 	} catch (err) {
	// 		console.log("!!!!!!!!!!", err);
	// 	}
	// }
	// // fetchandDisplayData();
	// function displayData(data) {
	// 	const productTemplate = `
	// 		<div class="product">
	// 						<div class="background" style="background-color:#088178;">
	// 							<img class="image" src="${data.image}" alt="sản phẩm"
	// 								style="border-radius: 4%;margin: 12px;" width="266px" height="315.42px">
	// 							<p style="color: white;margin:10px 12px;">${data.title}</p>
	// 							<p><span
	// 									style="text-decoration: line-through;color: white; margin: 10px 12px;">${data.price}</span></p>
	// 							<div class="content_swap" style="margin: 12px;">
	// 								<div class="circle"></div>
	// 								<div class="nd">Apple</div>
	// 							</div>
	// 							<a href="detail_product.html?id=${data.id}">view detail</a>
	// 						</div>
	// 		`;
	// productsContainer.insertAdjacentHTML("beforeend", productTemplate);
	// }
});
