import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const url_movies_by_gender = "https://api.themoviedb.org/3/discover/movie";

const movie = () => {
	const router = useRouter();
	const [movie, setMovie] = useState({});
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

			if (randomMovie.backdrop_path) {
				if (
					randomMovie.original_language === "en" ||
					randomMovie.original_language === "es"
				) {
					setMovie(randomMovie);
				}
			}
		});
	}, []);

	return (
		<>
			<Head>
				<title>Películas con emojis 🥳</title>
			</Head>
		</>
	);
};

export default movie;
