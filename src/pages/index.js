import { useEffect, useState } from "react";
import { PuzzleIcon } from "@heroicons/react/solid";
import Head from "next/head";
import styled from "styled-components";
import axios from "axios";

const url_image = "https://image.tmdb.org/t/p/original";
const url = "https://api.themoviedb.org/3/movie/popular";

const BackgroundImage = styled.div`
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	height: 100vh;
	background-image: url("${url_image}/${props => props.backdrop_path}");
	@media screen and (max-width: 768px) {
		background-image: url("${url_image}/${props => props.portrait_path}");
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
	const [backdrop, setBackdrop] = useState("");
	const [portrait, setPortrait] = useState("");

	useEffect(() => {
		const randomPage = Math.floor(Math.random() * 500) + 1;

		const getMovies = axios.get(
			`${url}?api_key=596241b05bdf73505bf12b0b05225055&language=es-ES&page=${randomPage}`
		);
		getMovies.then(response => {
			const randomMovie =
				response.data.results[
					Math.floor(Math.random() * response.data.results.length)
				];
			setBackdrop(randomMovie.backdrop_path);
			setPortrait(randomMovie.poster_path);
		});
	}, []);

	return (
		<div>
			<Head>
				<title>Películas con emojis 🥳</title>
			</Head>
			<BackgroundImage backdrop_path={backdrop} portrait_path={portrait} />
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
