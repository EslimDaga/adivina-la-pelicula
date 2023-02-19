import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { InfinitySpin } from "react-loader-spinner";
import "react-lazy-load-image-component/src/effects/blur.css";

const url_image = "https://image.tmdb.org/t/p/original";
const url_movies_by_gender = "https://api.themoviedb.org/3/discover/movie";

const Movie = () => {
	const router = useRouter();
	const [movie, setMovie] = useState({});
	const [loading, setLoading] = useState(true);
	const { gender_id } = router.query;
	const randomPage = Math.floor(Math.random() * 500) + 1;

	useEffect(() => {
		const getMovies = axios.get(
			`${url_movies_by_gender}?api_key=596241b05bdf73505bf12b0b05225055&with_genres=${gender_id}&language=es-ES&page=${randomPage}`
		);

		getMovies.then(response => {
			const randomMovie =
				response.data.results[
					Math.floor(Math.random() * response.data.results.length)
				];

			if (randomMovie.backdrop_path && randomMovie.original_language === "en") {
				setMovie(randomMovie);
				setLoading(false);
			} else {
				router.push("/");
			}
		});
	}, []);

	return (
		<div className="bg-yellow-500 w-screen h-screen px-4">
			<Head>
				<title>Películas con emojis 🥳</title>
			</Head>

			<Link href="/" className="fixed top-4 left-4 lg:bottom-8 lg:right-8 z-50">
				<button className="bg-white hover:bg-gray-700 text-gray-900 hover:text-white font-bold py-4 px-4 rounded-xl flex gap-2 items-center">
					<ArrowLeftIcon className="h-6 w-6" /> Volver al inicio
				</button>
			</Link>

			<div className="flex flex-col items-center justify-center h-full">
				{loading ? (
					<div className="w-screen h-screen flex items-center justify-center">
						<InfinitySpin width="200" color="#FFFFFF" />
					</div>
				) : (
					<LazyLoadImage
						effect="blur"
						src={`${url_image}${movie.backdrop_path}`}
						alt={`${url_image}${movie.backdrop_path}`}
						className="md:max-w-2xl lg:max-w-4xl rounded-xl shadow-xl"
					/>
				)}
			</div>
		</div>
	);
};

export default Movie;
