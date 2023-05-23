export default function navToggle() {
	toggleIcon();
}

function toggleIcon() {
	document.querySelector('.nav-menu .fa-solid').onclick = (e) => {
		e.target.classList.toggle('fa-bars');
		e.target.classList.toggle('fa-xmark');
	};
}
