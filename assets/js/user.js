import { LocalStorage } from "./storage.js";
import {
  auth,
  signOut,
} from "./auth.js";
function User() {
	let userInfoStorage = LocalStorage("infor_user");
	if (userInfoStorage.isEmpty()) {
		window.location.href = window.location.origin + "/pages/login_page.html";
		return "Not logged in";
	}
	return `
	<div class="flex w-full flex-col rounded-lg bg-slate-200 md:w-1/2 p-4">
		<div class="flex items-center justify-start">
			<div class="size-[50px] flex-shrink-0 overflow-hidden rounded-full ring-1 ring-black">
				<img loading="lazy" src="https://picsum.photos/200" alt="avatar-Anhanh1kk@" class="w-full h-full object-cover">
			</div>
			<div class="ml-3">
				<span class="text-md font-medium text-dark">${userInfoStorage.get("fullName")}</span>
			</div>
		</div>
		<p class="flex items-end">
			<span class="text-md font-medium text-dark">Email:</span><span class="text-md ml-2 text-dark">${userInfoStorage.get(
				"email",
			)}</span>
		</p>
		<button class="m-2 flex h-full flex-shrink-0 flex-grow-0 items-center justify-center rounded-lg bg-green-active px-5 py-3 text-white" name="logout">
			Logout
		</button>
	</div>
	<div class="flex w-full flex-col rounded-lg bg-slate-200 md:w-1/2 p-4">
		<h2 class="text-lg font-medium my-3">Password information</h2>
		<form id="form-1">
			
					<div class="form-group group mb-4 flex flex-col">
						<label for="currentPassword" class="form-label">Enter your current password</label>
						
<input type="password" name="currentPassword" class="w-full text-[#212529] h-[40px] px-3 py-2 border-[#ced4da] border rounded-lg  outline-none text-base mt-2 group-[.invalid]:text-red-500 group-[.invalid]:border-red-500 group-[.valid]:text-green-active group-[.valid]:border-green-active form-control" placeholder="Enter your current password" autocomplete="" value="" rule="required|min:6|max:30|password">

						<span class="form-message text-[12px] group-[.invalid]:text-red-500 group-[.valid]:text-green-active"></span>
					</div>
				
					<div class="form-group group mb-4 flex flex-col">
						<label for="password" class="form-label">Enter your new password</label>
						
<input type="password" name="password" class="w-full text-[#212529] h-[40px] px-3 py-2 border-[#ced4da] border rounded-lg  outline-none text-base mt-2 group-[.invalid]:text-red-500 group-[.invalid]:border-red-500 group-[.valid]:text-green-active group-[.valid]:border-green-active form-control" placeholder="Enter your password" autocomplete="" value="" rule="required|min:6|max:30|password">

						<span class="form-message text-[12px] group-[.invalid]:text-red-500 group-[.valid]:text-green-active"></span>
					</div>
				
					<div class="form-group group mb-4 flex flex-col">
						<label for="confirmPassword" class="form-label">Confirm your password</label>
						
<input type="password" name="confirmPassword" class="w-full  text-[#212529] h-[40px] px-3 py-2 border-[#ced4da] border rounded-lg  outline-none text-base mt-2 group-[.invalid]:text-red-500 group-[.invalid]:border-red-500 group-[.valid]:text-green-active group-[.valid]:border-green-active form-control" placeholder="Confirm your password" autocomplete="" value="" rule="required|confirmPassword">

						<span class="form-message text-[12px] group-[.invalid]:text-red-500 group-[.valid]:text-green-active"></span>
					</div>
				
			<div class="mt-8">
				<button class="text-md w-full rounded bg-green-active px-4 py-2 text-white transition duration-300 hover:opacity-90" name="changePassword">
					Change Password
				</button>
			</div>
		</form>
	
</div>
	`;
}

window.addEventListener("DOMContentLoaded", function () {
	let content_user = document.querySelector(".content_user");
	content_user.innerHTML = User();
	content_user.addEventListener("click", async function (e) {
		let btn_logout = e.target.closest("button[name='logout']");
		if (btn_logout) {
			localStorage.removeItem("infor_user")
			await signOut(auth);
			window.location.href = window.location.origin + "/index.html"
		}
	});
});
