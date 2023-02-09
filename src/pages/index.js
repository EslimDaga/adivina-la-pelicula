import Head from "next/head";
import { useTheme } from "next-themes";

export default function Home() {
	const { theme, setTheme } = useTheme();
	return (
		<div>
			<Head>
				<title>Peliculas con emojis 🥳🎉</title>
				<link
					rel="icon"
					href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🙂</text></svg>"
				/>
				<meta
					name="description"
					content="📱🎥🔍 ¡Descubre cuál es tu película favorita con solo emojis! Con nuestro producto digital, podrás adivinar películas mientras te diviertes. Simplemente elige los emojis que mejor representen la película que tienes en mente y déjanos adivinar qué es. ¿Estás listo para un juego emocionante? 🎬🕵️‍♀️💡"
				/>
			</Head>
			Movie to Emoji
			<button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
				toggle
			</button>
		</div>
	);
}
