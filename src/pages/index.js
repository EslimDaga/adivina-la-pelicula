import Head from "next/head";
import styled from "styled-components";
import { PuzzleIcon } from "@heroicons/react/solid";

const BackgroundImage = styled.div`
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	height: 100vh;
	background-image: url("https://image.tmdb.org/t/p/original/9Rq14Eyrf7Tu1xk0Pl7VcNbNh1n.jpg");
	@media screen and (max-width: 768px) {
		background-image: url("https://image.tmdb.org/t/p/original/juoinefK6tMbjwJhRpRvbAAmrTB.jpg");
	}
`;

const ImageGradient = styled.div`
	position: absolute;
	background: linear-gradient(
		180deg,
		rgba(0, 0, 0, 0.8) 100%,
		rgba(0, 0, 0, 0.8) 100%
	);
	height: 100vh;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;

export default function Home() {
	return (
		<div>
			<Head>
				<title>Películas con emojis 🥳</title>
			</Head>
			<BackgroundImage />
			<ImageGradient />
			{/* Center title */}
			<div className="fixed flex flex-col gap-4 items-center justify-center w-full h-full top-0">
				<h1 className="text-6xl font-extrabold text-white text-center px-4">
					Películas con emojis 🥳
				</h1>
				<p className="text-3xl font-normal text-white text-center px-4">
					¡Descubre cuál es tu película favorita con solo emojis!
				</p>
				<button className="flex items-center gap-2 bg-white hover:bg-yellow-500 text-black font-bold py-4 px-6 rounded-full">
					<PuzzleIcon className="h-6 w-6" />
					¡Jugar ahora!
				</button>
			</div>
		</div>
	);
}
