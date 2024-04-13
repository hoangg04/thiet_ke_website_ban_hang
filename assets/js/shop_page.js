window.addEventListener("DOMContentLoaded", function () {
	let content = document.querySelector(".content1");
	let prev_page = document.querySelector(".prev-page");
	let next_page = document.querySelector(".next-page");
	let count_page = document.querySelector(".count-page");
	const option = {
		page: 1,
		limit: 12,
	};
	function getAllProduct(page = 1, limit = 12, params) {
		fetch(
			`https://product-api-qngh.onrender.com/products/?_page=${page}&_limit=${limit}${params}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.length < option.limit) {
					next_page.classList.add("disabled:bg-gray-400", "disabled:text-[#C4CDD5]");
					next_page.classList.remove("border-green-active", "border-[2px]");
					next_page.disable = true;
					next_page.setAttribute("disabled", "");
					option.page--;
					count_page.innerHTML = option.page;
				}
				if (data.length !== 0) {
					content.innerHTML = data
						.map((product) => {
							return `
                        <a class="content2 flex" href="detail_product.html" data-id=${product.id}>
                            <div class="background">
                                <img class="img" loading="lazy" src="${
																	product.image
																}" alt="sản phẩm" />
                                <p class="phonename">${
																	product.title[0].toUpperCase() + product.title.slice(1)
																}</p>
                                <p><span class="money">${product.previousPrice}$</span> ${
								product.price
							}$</p>
                                <div class="content_swap">
                                    <div class="circle"></div>
                                    <div class="nd">${product.brand}</div>
                                </div>
                            </div>
                        </a>`;
						})
						.join("\n");
				}
			});
	}
	(() => {
		if (option.page === 1) {
			prev_page.classList.add("disabled:bg-gray-400", "disabled:text-[#C4CDD5]");
			prev_page.classList.remove("border-green-active", "border-[2px]");
			prev_page.disable = true;
			prev_page.setAttribute("disabled", "");
		}
	})();
	getAllProduct();
	prev_page.addEventListener("click", function (e) {
		if (option.page > 1) {
			getAllProduct(option.page - 1, option.limit);
			option.page--;
			count_page.innerHTML = option.page;
		}
		if (next_page.getAttribute("disabled") !== null) {
			next_page.classList.remove("disabled:bg-gray-400", "disabled:text-[#C4CDD5]");
			next_page.classList.add("border-green-active", "border-[2px]");
			next_page.disabled = false;
			next_page.removeAttribute("disabled");
		}
	});
	next_page.addEventListener("click", async function (e) {
		getAllProduct(option.page + 1, option.limit);
		if (prev_page.getAttribute("disabled") !== null) {
			prev_page.classList.remove("disabled:bg-gray-400", "disabled:text-[#C4CDD5]");
			prev_page.classList.add("border-green-active", "border-[2px]");
			prev_page.disabled = false;
			prev_page.removeAttribute("disabled");
		}
        option.page++;
        count_page.innerHTML = option.page;
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 1000);
		});
	});
});
