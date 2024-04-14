class Validator {
	constructor(formEl) {
		this.formEl = document.querySelector(formEl);
	}
	getParentSelect(el, parentElement) {
		while (el.parentElement) {
			if (el.parentElement.matches(parentElement)) {
				return el.parentElement;
			}
			el = el.parentElement;
		}
	}
	formRules = {};
	validatorRules = {
		required: (value) => {
			return value.trim().length > 0 ? undefined : "Please enter this field";
		},
		email: (value) => {
			const regex = /^([A-Za-z0-9_\-.]){4,}@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
			return regex.test(value) ? undefined : "Please enter a valid email address";
		},
		fullname: (value) => {
			const regex = /^[a-zA-Z\u00C0-\u1EF9\s]+/;
			return regex.test(value) ? undefined : "Please enter a valid full name .Please enter again!";
		},
		tel: (value) => {
			let regex = /^(\+\d{1,2})?\d{10}$/;
			return regex.test(value)
				? undefined
				: "Please enter a valid phone number .Please enter again!";
		},
		password: (value) => {
			let regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).+$/;
			return regex.test(value)
				? undefined
				: "Password must include number,capital letters and special characters.Please enter again!";
		},
		confirm: (value) => {
			return value.trim() === this.formEl.querySelector("[name='password']").value.trim()
				? undefined
				: "Password not match .Please enter again!";
		},
		min: (min) => {
			return (value) => {
				return value.trim().length >= min
					? undefined
					: "Length of password than " + min + ".Please enter again!";
			};
		},
		max: (max) => {
			return (value) => {
				return value.trim().length <= max
					? undefined
					: "Length of password less than " + max + ".Please enter again!";
			};
		},
	};
	validate() {
		if (this.formEl) {
			const fields = Array.from(this.formEl.querySelectorAll("[name][rules]"));
			for (let el of fields) {
				const rules = el.getAttribute("rules").split("|");
				for (let rule of rules) {
					let ruleFunc = this.validatorRules[rule];
					if (rule.includes(":")) {
						let ruleInfo = rule.split(":");
						rule = ruleInfo[0];
						ruleFunc = this.validatorRules[ruleInfo[0]](ruleInfo[1]);
					}
					if (this.formRules.hasOwnProperty(el.name)) {
						this.formRules[el.name].push(ruleFunc);
					} else {
						this.formRules[el.name] = [ruleFunc];
					}
				}
				el.onblur = handleValidate;
				el.oninput = handleClearInput;
			}
			let _this = this;
			function handleValidate(event) {
				let message = null;
				_this.formRules[event.target.name].some((rule) => {
					message = rule(event.target.value);
					return message;
				});
				if (message) {
					_this
						.getParentSelect(this || event.target, ".form-group")
						.querySelector(".form-message").innerText = message;
					_this.getParentSelect(this || event.target, ".form-group").classList.remove("valid");
					_this.getParentSelect(this || event.target, ".form-group").classList.add("invalid");
				} else {
					_this
						.getParentSelect(this || event.target, ".form-group")
						.querySelector(".form-message").innerText = "";
					_this.getParentSelect(this || event.target, ".form-group").classList.remove("invalid");
					_this.getParentSelect(this || event.target, ".form-group").classList.add("valid");
				}
				return message ? 1 : 0;
			}
			function handleClearInput(event) {
				_this
					.getParentSelect(this || event.target, ".form-group")
					.querySelector(".form-message").innerText = "";
				_this.getParentSelect(this || event.target, ".form-group").classList.remove("invalid");
			}
			this.formEl.onsubmit = function (event) {
				event.preventDefault();
				let countValid = 0;
				for (let el of fields) {
					countValid += handleValidate({ target: el });
				}
				if (countValid == 0) {
					if (typeof _this.onSubmit === "function") {
						let enableElement = Array.from(document.querySelectorAll("input[name]:not([disable])"));
						let formValues = enableElement.reduce((values, el) => {
							switch (el.type) {
								case "radio":
									if (el.checked) {
										values[el.name] = el.value;
									}
									break;
								case "checkbox":
									if (el.checked) {
										if (values.hasOwnProperty(el.name)) {
											values[el.name].push(el.value);
										} else {
											values[el.name] = [el.value];
										}
									}
									break;
								default:
									values[el.name] = el.value;
									break;
							}
							return values;
						}, {});
						_this.onSubmit(formValues);
					} else {
						_this.formEl.submit();
					}
				}
			};
		}
	}
}
