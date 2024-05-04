class Toast {
	// #time = 2000;
	#config = {
		success: {
			color: "#4daf54",
			backgroundColor: "#92c496",
		},
		warning: {
			color: "#ffa502",
			backgroundColor: "#c4c292",
		},
		error: {
			color: "red",
			backgroundColor: "#c49292",
		},
	};
	constructor({ message, type, absoluteEl, time }) {
		if (!message || !type) {
			throw Error("Invalid message or type. Please provide a message or type!");
		} else {
			this.message = message;
			this.type = type;
			this.absoluteEl = absoluteEl;
			this.time = time ?? 2000;
		}
	}
	renderToast() {
		let toastEl = document.createElement("div");
		toastEl.classList =
			"after:animate-timeMessage relative flex w-[300px] translate-x-[400px] flex-col justify-center items-center overflow-hidden rounded-md p-3 before:absolute before:left-0 before:top-0 before:block before:h-full before:w-[5px] before:bg-[currentColor] after:absolute after:bottom-0 after:left-0 after:h-[5px] after:w-full after:bg-[currentColor] active_toast z-20";
		toastEl.style.color = `${this.#config[this.type].color}`;
		toastEl.style.backgroundColor = `${this.#config[this.type].backgroundColor}`;
		toastEl.style.zIndex = 1000;
		toastEl.innerHTML = `<p class="message text-md font-medium text-white">${this.message}</p>`;
		return toastEl;
	}
	delay(ms) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, ms);
		});
	}
	async init() {
		let el = this.renderToast();
		if (!this.absoluteEl) {
			this.absoluteEl = document.createElement("div");
			this.absoluteEl.classList = "pop-up flex flex-col h-max fixed top-[70px] right-2 gap-3";
			this.absoluteEl.style.zIndex = 9999999;
			document.querySelector("body").appendChild(this.absoluteEl);
		}
		this.absoluteEl.appendChild(el);
		await this.delay(this.time);
		el.classList.remove("active_toast");
		el.classList.add("hide_toast");
		await this.delay(1100);
		el.remove();
		return el;
	}
}
export default Toast;
