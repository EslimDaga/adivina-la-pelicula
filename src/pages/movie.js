import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ArrowLeftIcon, FilmIcon, HeartIcon } from "@heroicons/react/solid";
import { InfinitySpin } from "react-loader-spinner";
import { toast, Toaster } from "react-hot-toast";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "react-lazy-load-image-component/src/effects/blur.css";

const url_image = "https://image.tmdb.org/t/p/original";
const url_movies_by_gender = "https://api.themoviedb.org/3/discover/movie";
const url_open_ai = "https://api.openai.com/v1/completions";

const renderTime = ({ remainingTime }) => {
	if (remainingTime === 0) {
		return <div className="timer"> 🙁 </div>;
	}

	return (
		<div className="timer">
			<div className="text-gray-900 font-bold">{remainingTime}</div>
		</div>
	);
};

const Movie = () => {
	const router = useRouter();
	const [movie, setMovie] = useState({});
	const [posibleMovies, setPosibleMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [score, setScore] = useState(0);
	const [lifes, setLifes] = useState(3);

	const { gender_id } = router.query;

	const randomPage = Math.floor(Math.random() * 500) + 1;

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
					randomMovie?.backdrop_path &&
					randomMovie.original_language === "en"
				) {
					const posibleMovies = response.data.results
						.filter(
							movie =>
								movie.id !== randomMovie.id && movie.original_language === "en"
						)
						.sort(() => Math.random() - 0.5)
						.slice(0, 3);

					posibleMovies.push(randomMovie);
					posibleMovies.sort(() => Math.random() - 0.5);

					setPosibleMovies(posibleMovies);

					setMovie(randomMovie);
				} else {
					getMovies();
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

	const handleSelectMovie = selected_movie => {
		if (selected_movie === movie.title) {
			toast.success("¡Correcto! 🎉", {
				position: "top-center",
				style: {
					borderRadius: "10px",
					background: "#48BB78",
					color: "#fff",
				},
			});

			setTimeout(() => {
				handleNextMovie();
				setScore(score + 1);
			}, 2000);
		} else {
			setLifes(lifes - 1);

			toast.error("¡Incorrecto! 😢", {
				position: "top-center",
				style: {
					borderRadius: "10px",
					background: "#F56565",
					color: "#fff",
				},
				duration: 1000,
			});

			setTimeout(() => {
				router.push("/");
			}, 1000);
		}
	};

	useEffect(() => {
		if (lifes === 0) {
			router.push("/");
		}
	}, [lifes]);

	return (
		<div className="bg-yellow-500 w-screen h-screen px-4">
			<Head>
				<title>Películas con emojis 🥳</title>
			</Head>

			<div>
				<Link
					href="/"
					className="absolute max-w-max max-h-max top-4 left-4 lg:bottom-8 lg:right-8 z-50"
				>
					<button className="bg-white text-gray-900 font-semibold text-sm py-4 px-4 rounded-xl flex gap-2 items-center">
						<ArrowLeftIcon className="h-6 w-6" /> Volver
					</button>
				</Link>

				{movie.backdrop_path && (
					<div className="flex items-center gap-5 absolute max-w-max max-h-max top-4 right-4 lg:bottom-8 lg:right-8 z-50">
						<div className="flex gap-2">
							{[...Array(lifes)].map((life, index) => (
								<HeartIcon key={index} className="h-6 w-6 text-red-500" />
							))}
						</div>
						<h1 className="text-gray-900 font-extrabold">{score}</h1>
						<CountdownCircleTimer
							isPlaying
							size={65}
							duration={10}
							colors={["#22c55e", "#f97316", "#ca8a04", "#b91c1c"]}
							colorsTime={[10, 6, 3, 0]}
							onComplete={() => {
								setLifes(lifes - 1);

								handleNextMovie();
							}}
						>
							{renderTime}
						</CountdownCircleTimer>
					</div>
				)}
			</div>

			<div className="flex flex-col gap-14 items-center justify-center h-screen">
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
						<div className="flex flex-col lg:flex-row gap-6 lg:gap-7">
							{posibleMovies.map(movie => (
								<button
									key={movie.id}
									onClick={() => handleSelectMovie(movie.title)}
									className="bg-white text-gray-900 font-semibold text-sm px-4 py-4 rounded-xl shadow-3xl"
								>
									{movie.title}
								</button>
							))}
						</div>
					</>
				) : (
					<>
						<div className="w-screen h-screen flex items-center justify-center">
							<InfinitySpin width="200" color="#FFFFFF" />
						</div>
					</>
				)}
			</div>
			<Toaster />
		</div>
	);
};

export default Movie;
