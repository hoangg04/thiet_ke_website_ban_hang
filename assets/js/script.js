const productContainer = document.querySelector('#product-container');
console.log(productContainer);

async function fetchAndDisplaySingleProduct() {
	const productID = new URLSearchParams(window.location.search).get('id')
	const respone = await fetch(`https://product-api-qngh.onrender.com/products/${productID}`);
	const product = await respone.json();
	displayProduct(product);
}
fetchAndDisplaySingleProduct();
function displayProduct(product) {
	console.log(product);
	const imageWrapper = productContainer.querySelector(".picture");
	// imageWrapper?.innerHTML = `<img src=${product?.image} alt="">`;
	imageWrapper.querySelector("img").src = product?.image;
	// productContainer.innerHTML = `
	// 	<main>
	// 		<div class="picture">
	// 			<img src=${product.image} alt="">
	// 		</div>
	// 		<div class="wrapper">
	// 				<span class="minus1">-</span>
	// 				<span class="num1">01</span>
	// 				<span class="plus1">+</span>
	// 		</div>
	// 		<script>
	// 			const plusBtn = document.querySelector(".plus1"),
	// 			  minusBtn = document.querySelector(".minus1"),
	// 			  numOfProd = document.querySelector(".num1");
	// 			let init_countProd = 1;
	// 			plusBtn.addEventListener("click", (e) => {
	// 			  init_countProd++;
	// 			  init_countProd =
	// 				init_countProd < 10 ? "0" + init_countProd : init_countProd;
	// 			  numOfProd.innerText = init_countProd;
	// 			});
	// 			minusBtn.addEventListener("click", () => {
	// 			  if (init_countProd > 1) {
	// 				init_countProd--;
	// 				init_countProd = a < 10 ? "0" + init_countProd : init_countProd;
	// 				numOfProd.innerText = init_countProd;
	// 			  }
	// 			});
	// 		  </script>
	// 	</main>
	// `;
}
document.addEventListener("DOMContentLoaded", function() {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star) => {
        const randomIndex = Math.floor(Math.random() * 5);
        star.classList.add(`star${randomIndex}`);
    });
});
