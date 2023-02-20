import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ArrowLeftIcon, FilmIcon } from "@heroicons/react/solid";
import { InfinitySpin } from "react-loader-spinner";
import "react-lazy-load-image-component/src/effects/blur.css";

const url_image = "https://image.tmdb.org/t/p/original";
const url_movies_by_gender = "https://api.themoviedb.org/3/discover/movie";
const url_open_ai = "https://api.openai.com/v1/completions";

const Movie = () => {
	const router = useRouter();
	const [movie, setMovie] = useState({});
	const [loading, setLoading] = useState(true);

	const { gender_id } = router.query;

	const randomPage = Math.floor(Math.random() * 500) + 1;

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

	const getMovies = () => {
		axios
			.get(
				`${url_movies_by_gender}?api_key=596241b05bdf73505bf12b0b05225055&with_genres=${gender_id}&language=es-ES&page=${randomPage}`
			)
			.then(response => {
				const randomMovie =
					response.data.results[
						Math.floor(Math.random() * response.data.results.length)
					];

				if (
					randomMovie.backdrop_path &&
					randomMovie.original_language === "en"
				) {
					setMovie(randomMovie);
				}
				setLoading(false);
			});
	};

	useEffect(() => {
		getMovies();
	}, []);

	const handleNextMovie = () => {
		setLoading(true);
		setMovie({});

		getMovies();
	};

	return (
		<div className="bg-yellow-500 w-screen h-screen px-4">
			<Head>
				<title>Películas con emojis 🥳</title>
			</Head>

			<Link
				href="/"
				className="absolute max-w-max max-h-max top-4 left-4 lg:bottom-8 lg:right-8 z-50"
			>
				<button className="bg-white hover:bg-gray-700 text-gray-900 hover:text-white font-semibold text-sm py-4 px-4 rounded-xl flex gap-2 items-center">
					<ArrowLeftIcon className="h-6 w-6" /> Volver
				</button>
			</Link>

			<button
				onClick={handleNextMovie}
				className="absolute max-w-max max-h-max top-4 right-4 lg:bottom-8 lg:right-8 z-50 bg-white text-gray-900 font-semibold text-sm py-4 px-4 rounded-xl flex gap-2 items-center"
			>
				<FilmIcon className="h-6 w-6" /> Siguiente película
			</button>

			<div className="flex flex-col items-center justify-center h-screen">
				{loading ? (
					<div className="w-screen h-screen flex items-center justify-center">
						<InfinitySpin width="200" color="#FFFFFF" />
					</div>
				) : movie.backdrop_path ? (
					<>
						<LazyLoadImage
							effect="blur"
							src={`${url_image}${movie.backdrop_path}`}
							alt={`${url_image}${movie.backdrop_path}`}
							className="md:max-w-2xl lg:max-w-4xl rounded-xl shadow-3xl"
						/>
					</>
				) : (
					<>
						<LazyLoadImage
							effect="blur"
							src="https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/05/error-404-2716479.jpg"
							alt="Error 404"
							className="md:max-w-2xl lg:max-w-4xl rounded-xl shadow-3xl"
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default Movie;
