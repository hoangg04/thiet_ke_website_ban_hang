

window.addEventListener("DOMContentLoaded", function () {
	let content = document.querySelector(".content1");
	let prev_page = document.querySelector(".prev-page");
	let next_page = document.querySelector(".next-page");
	let count_page = document.querySelector(".count-page");
	let form_filter = document.querySelector("[name=form-filter]");
	const filterOptions = {
		search: "&title_like=",
		status: "&isNew=",
		minPrice: "&price_gte=",
		maxPrice: "&price_lte=",
		category: "&category=",
	};
	const option = {
		page: 1,
		limit: 12,
	};
	(() => {
		if (option.page === 1) {
			prev_page.classList.add("disabled:bg-gray-400", "disabled:text-[#C4CDD5]");
			prev_page.classList.remove("border-green-active", "border-[2px]");
			prev_page.disable = true;
			prev_page.setAttribute("disabled", "");
		}
		getAllProduct();
	})();
	function getAllProduct(page = 1, limit = 12, params = "") {
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
					count_page.innerHTML = option.page;
				}else{
					next_page.classList.remove("disabled:bg-gray-400", "disabled:text-[#C4CDD5]");
					next_page.classList.add("border-green-active", "border-[2px]");
					next_page.disabled = false;
					next_page.removeAttribute("disabled");
				}
				if (data.length !== 0) {
					content.innerHTML = data
						.map((product) => {
							return `
								<a href="detail_product.html#${product.id}" class="group relative bg-green-active p-3 overflow-hidden rounded-xl product__item" data-id=${
									product.id
								}>
									<div class=" aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-200">
										<img loading="lazy" src="${
											product.image
										}" alt="Lorem ipsum dolor si" class="max-h-[300px] h-full w-full object-cover object-center group-hover:opacity-75">
									</div>
									<h3 class="mt-4 text-lg text-white">${product.title[0].toUpperCase() + product.title.slice(1)}</h3>
									<div class="flex items-center">
										<p class="mt-1 text-sm font-medium text-gray-300 line-through">${product.previousPrice}$</p>
										<p class="ml-3 mt-1 text-md font-medium text-gray-900">${product.price}$</p>
									</div>
									<div class="flex items-center mt-3">
										<span class="w-[30px] h-[30px] rounded-full bg-pink-300 block"></span>
										<span class="ml-2 text-sm text-gray-700">${product.brand}</span>
									</div>
								</a>
						`;
						})
						.join("\n");
				}
			});
	}

	form_filter.addEventListener("submit", function (e) {
		e.preventDefault();
		e.stopPropagation();
		let fields = [...form_filter.querySelectorAll("[name]")];
		const params = fields
			.reduce((acc, field) => {
				if (field.value.trim().length) {
					acc = [...acc, filterOptions[field.name] + field.value.trim()];
				}
				return acc;
			}, [])
			.join("");
		getAllProduct(option.page, option.limit, `&${params}`);
	});
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
