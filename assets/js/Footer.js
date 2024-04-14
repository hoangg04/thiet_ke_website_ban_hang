const socialIcon = [
	{
		icon: '<ion-icon name="logo-facebook" class="w-5 h-5"></ion-icon>',
		href: "http://www.facebook.com",
	},
	{
		icon: '<ion-icon name="logo-instagram" class="w-5 h-5"></ion-icon>',
		href: "http://www.instagram.com",
	},
	{
		icon: '<ion-icon name="logo-github" class="w-5 h-5"></ion-icon>',
		href: "http://www.github.com",
	},
	{
		icon: '<ion-icon name="logo-twitter" class="w-5 h-5"></ion-icon>',
		href: "http://www.twitter.com",
	},
];
function Footer() {
	return `
        <div class=" flex">
          <div class="w-full p-6">
            <div>
              <h3 class="mb-3 flex items-center">
                <span class="mr-3"
                  ><img
                    src="${window.location.origin}/assets/images/envelope-outline.svg"
                    alt="Image"
                    class="img-fluid" /></span
                ><span class="text-md font-semibold text-green-active"
                  >Subscribe to Newsletter</span
                >
              </h3>

              <form action="#" class="flex flex-wrap gap-4">
								<div class="h-12 border-[#ced4da] border rounded-lg overflow-hidden w-[246px] flex-grow-0 flex-shrink-0">

									<input type="text" class="w-full py-2 outline-none text-[#212529] px-3 h-full" placeholder="Enter your name">
								</div>
								<div class="h-12 border-[#ced4da] border rounded-lg overflow-hidden w-[246px] flex-grow-0 flex-shrink-0">
									<input type="text" class="w-full py-2 outline-none text-[#212529] px-3 h-full" placeholder="Enter your email">
								</div>
                
                <div class="h-12">
                  <button
                    class="flex h-full items-center justify-center rounded-lg bg-green-active px-7 py-3 bg-green-600"
                  >
                    <ion-icon
                      name="paper-plane"
                      class="h-5 w-5 text-white"
                    ></ion-icon>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="mb-5 flex flex-col gap-5 md:flex-row">
          <div class="mt-12 flex w-full flex-col px-6 md:w-4/12">
            <div class="mb-6">
              <a
                class="flex h-full flex-shrink-0 flex-grow-0 items-center justify-start"
                href="#"
              >
                <img src="${window.location.origin}/assets/images/logo.png" alt="logo" />
              </a>
            </div>
            <p class="text-md mb-6 text-[#6a6a6a]">
              Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio
              quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam
              vulputate velit imperdiet dolor tempor tristique. Pellentesque
              habitant
            </p>

            <ul class="flex gap-3">

            </ul>
          </div>
          <div class="mt-6 flex flex-1 px-6 md:mt-[112px]">
            <div class="w-1/2 md:w-3/12">
              <ul class="flex flex-col gap-3 text-sm">
                <li><a href="#" class="hover:text-[#6a6a6a]">About us</a></li>
                <li><a href="#" class="hover:text-[#6a6a6a]">Services</a></li>
                <li><a href="#" class="hover:text-[#6a6a6a]">Blog</a></li>
                <li><a href="#" class="hover:text-[#6a6a6a]">Contact us</a></li>
              </ul>
            </div>

            <div class="w-1/2 md:w-3/12">
              <ul class="flex flex-col gap-3 text-sm">
                <li><a href="#" class="hover:text-[#6a6a6a]">Support</a></li>
                <li>
                  <a href="#" class="hover:text-[#6a6a6a]">Knowledge base</a>
                </li>
                <li><a href="#" class="hover:text-[#6a6a6a]">Live chat</a></li>
              </ul>
            </div>

            <div class="w-1/2 md:w-3/12">
              <ul class="flex flex-col gap-3 text-sm">
                <li><a href="#" class="hover:text-[#6a6a6a]">Jobs</a></li>
                <li><a href="#" class="hover:text-[#6a6a6a]">Our team</a></li>
                <li><a href="#" class="hover:text-[#6a6a6a]">Leadership</a></li>
                <li>
                  <a href="#" class="hover:text-[#6a6a6a]">Privacy Policy</a>
                </li>
              </ul>
            </div>

            <div class="w-1/2 md:w-3/12">
              <ul class="flex flex-col gap-3 text-sm">
                <li>
                  <a href="#" class="hover:text-[#6a6a6a]">Nordic Chair</a>
                </li>
                <li><a href="#" class="hover:text-[#6a6a6a]">Kruzo Aero</a></li>
                <li>
                  <a href="#" class="hover:text-[#6a6a6a]">Ergonomic Chair</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="flex flex-col pt-4 md:flex-row">
          <div class="md:w-6/12">
            <p class=" mb-2 text-center text-sm">
              Copyright ©
              <script>
                document.write(new Date().getFullYear());
              </script>
              2023. All Rights Reserved. — Designed with love by Hoang
            </p>
          </div>

          <div class="text-center text-sm md:w-6/12">
            <ul class="ml-auto flex justify-center">
              <li class="me-4">
                <a href="#" class="hover:text-[#6a6a6a]"
                  >Terms &amp; Conditions</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-[#6a6a6a]">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
  `;
}
document.querySelector("footer").innerHTML = Footer();
