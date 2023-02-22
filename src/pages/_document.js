import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<link
					rel="icon"
					href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧩</text></svg>"
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
					rel="stylesheet"
				/>
				<meta
					name="description"
					content="📱🎥🔍 ¿Eres un experto en películas? Pone a prueba tu conocimiento con nuestro nuevo juego de adivinar películas con una sola imagen. Te mostraremos una imagen de una película y tendrás que adivinar de qué se trata. Desde las clásicas hasta las últimas películas de éxito, este juego es una divertida y fácil manera de demostrar tu conocimiento. ¿Serás capaz de adivinarla? Así que sientate, pon un poco de palomitas y prepárate para el gran reto de tu conocimiento cinematográfico. 🎬🕵️‍♀️💡"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
