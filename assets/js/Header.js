import { LocalStorage } from "./storage.js";
const linkActions = [
	{
		title: "Home",
		target: "/",
	},
	{
		title: "Shop",
		target: "/pages/shop_page.html",
	},
];
function Header() {
  let userInfoStorage = LocalStorage("infor_user");

	return `
      <a
        class="el__match--route flex h-full flex-shrink-0 flex-grow-0 items-center justify-center"
        href="/#/"
      >
        <img

          src="${window.location.origin}/assets/images/logo.png"
          alt="test"
        />
      </a>
      <ul
      class="nav__bar fixed bottom-0 right-0 top-0 z-[100] w-0 gap-3 pl-4 opacity-0 shadow-md md:relative md:ml-auto md:mr-7 md:flex md:w-[unset] md:opacity-100 md:shadow-none flex"
    >
      ${linkActions
				.map((linkAction) => {
					return `<li
        class="flex items-center justify-start md:justify-center md:flex-1 md:h-[unset]"
      >
        <a
          href="${linkAction.target}"
          class="relative block md:w-[80px] px-3 md:text-center font-semibold text-dark transition-all duration-300 ease-in-out before:bg-green-active hover:text-green-active h-full cursor-pointer el__match--route"
          >${linkAction.title}</a
        >
      </li>`;
				})
				.join(" ")}
  </ul>
      <div class="ml-auto mr-3 flex gap-2 md:ml-0 md:mr-0">
        <div
          class="font-sm relative mr-2 flex h-[30px] w-[30px] cursor-pointer items-center justify-center md:m-0 toggle_preview-cart"
        >
          <span
            class="absolute right-[-4px] top-0 z-50 h-[15px] w-[15px] rounded-full bg-red-500 text-center text-[11px] leading-[15px] text-white count_products"
            >${userInfoStorage.isEmpty() ? 0 : userInfoStorage.get("data").products.length}</span
          >
          <ion-icon
            name="cart-outline"
            class="text-[25px] hover:text-green-active"
          ></ion-icon>
        </div>
      </div>
      
        <div
          class="toggle-menu relative flex h-[30px] w-[30px] cursor-pointer items-center justify-center md:hidden"
        >
          <ion-icon
            class="text-[25px] hover:text-green-active"
            name="menu-outline"
          ></ion-icon>
        </div>
      </div>
  `;
}

document.querySelector("header").innerHTML = Header();
