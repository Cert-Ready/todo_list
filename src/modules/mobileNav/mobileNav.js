export default function navToggle() {
	const navIcon = document.querySelector('.pri-nav-icon');
	const priNav = document.querySelector('.pri-nav');

	navIcon.addEventListener('click', () => {
		// toggle icon
		navIcon.classList.toggle('fa-bars');
		navIcon.classList.toggle('fa-xmark');

		// toggle nav
		priNav.classList.toggle('nav-active');
	});
}
