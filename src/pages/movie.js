import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ArrowLeftIcon, RefreshIcon } from "@heroicons/react/solid";
import { InfinitySpin } from "react-loader-spinner";
import "react-lazy-load-image-component/src/effects/blur.css";

const url_image = "https://image.tmdb.org/t/p/original";
const url_movies_by_gender = "https://api.themoviedb.org/3/discover/movie";
const url_open_ai = "https://api.openai.com/v1/completions";

const Movie = () => {
	const router = useRouter();
	const [movie, setMovie] = useState({});
	const [loading, setLoading] = useState(true);
	const [loadingOpenAi, setLoadingOpenAi] = useState(false);
	const [showTitle, setShowTitle] = useState(false);
	const [emoji, setEmoji] = useState("");

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
			}
			setLoading(false);
		});
	}, []);

	const handleConvertToEmoji = title => {
		setLoadingOpenAi(true);
		axios
			.post(
				url_open_ai,
				{
					model: "text-davinci-002",
					prompt: `Convert the movie ${title} to emojis, only respond with emojis`,
					temperature: 0.5,
					stop: "none",
					max_tokens: 1024,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization:
							"Bearer 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",
					},
				}
			)
			.then(response => {
				const title_convert = response.data.choices[0].text;

				if (title_convert.length > 10) {
					setEmoji(title_convert.slice(0, 10));
				} else {
					setEmoji(title_convert);
				}

				setLoadingOpenAi(false);
			});
	};

	const handleNextMovie = () => {
		router.reload();
	};

	const handleShowTitle = () => {
		setShowTitle(true);
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
				<button className="bg-white hover:bg-gray-700 text-gray-900 hover:text-white font-bold py-4 px-4 rounded-xl flex gap-2 items-center">
					<ArrowLeftIcon className="h-6 w-6" /> Volver al inicio
				</button>
			</Link>

			<div className="flex flex-col gap-8 items-center justify-center h-full">
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
						<button
							onClick={() => handleConvertToEmoji(movie.original_title)}
							disabled={loadingOpenAi}
							className={`px-4 py-4 bg-white hover:bg-gray-700 text-gray-900 hover:text-white font-semibold rounded-xl ${
								loadingOpenAi && "cursor-not-allowed"
							}`}
						>
							{loadingOpenAi ? "🤖 Convirtiendo..." : "🚀 Convertir a emojis"}
						</button>
						{emoji && <p className="text-gray-900 text-4xl">{emoji}</p>}
						{showTitle && (
							<p className="text-gray-900 font-semibold text-3xl">
								{movie.title}
							</p>
						)}
						<button
							onClick={handleNextMovie}
							className="px-4 py-4 bg-white hover:bg-gray-700 text-gray-900 hover:text-white font-semibold rounded-xl"
						>
							Siguiente película
						</button>
						<button
							onClick={handleShowTitle}
							className="px-4 py-4 bg-white hover:bg-gray-700 text-gray-900 hover:text-white font-semibold rounded-xl"
						>
							Ver resultado
						</button>
					</>
				) : (
					<>
						<LazyLoadImage
							effect="blur"
							src="https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/05/error-404-2716479.jpg"
							alt="Error 404"
							className="md:max-w-2xl lg:max-w-4xl rounded-xl shadow-3xl"
						/>
						<p className="text-gray-900">
							La película no tiene imagen de fondo. Intenta otra vez.
						</p>
						<button
							onClick={() => router.reload()}
							className="bg-white hover:bg-gray-700 text-gray-900 hover:text-white font-bold py-4 px-4 rounded-xl flex gap-2 items-center"
						>
							Reintentar <RefreshIcon className="h-6 w-6" />
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default Movie;
