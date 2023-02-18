import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PuzzleIcon } from "@heroicons/react/solid";
import toast, { Toaster } from "react-hot-toast";
import ReactSelect from "react-select";
import Head from "next/head";
import styled from "styled-components";
import axios from "axios";
import "react-lazy-load-image-component/src/effects/blur.css";

const url_image = "https://image.tmdb.org/t/p/original";
const url = "https://api.themoviedb.org/3/movie/popular";
const url_genders = "https://api.themoviedb.org/3/genre/movie/list";

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
	const [loading, setLoading] = useState(true);
	const [movie, setMovie] = useState({});
	const [genders, setGenders] = useState([]);
	const [selectedGender, setSelectedGender] = useState(null);

	useEffect(() => {
		const randomPage = Math.floor(Math.random() * 500) + 1;

		const getMovies = axios.get(
			`${url}?api_key=596241b05bdf73505bf12b0b05225055&language=es-ES&page=${randomPage}`
		);

		const getGenders = axios.get(
			`${url_genders}?api_key=596241b05bdf73505bf12b0b05225055&language=es-ES`
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
					setBackdrop(randomMovie.backdrop_path);
					setMovie(randomMovie);
					setLoading(false);
				}
			}
		});

		getGenders.then(response => {
			setGenders(
				response.data.genres.map(gender => {
					return {
						value: gender.id,
						label: gender.name,
					};
				})
			);
		});
	}, []);

	const handleSubmit = _ => {
		if (selectedGender === null) {
			toast.error("Debes seleccionar un género");
			return;
		}
	};

	return (
		<div className="bg-yellow-500">
			<Head>
				<title>Películas con emojis 🥳</title>
			</Head>
			{loading ? (
				<div className="w-screen h-screen flex items-center justify-center">
					<InfinitySpin width="200" color="#FFFFFF" />
				</div>
			) : (
				<div className="w-screen h-screen flex items-center justify-center">
					<LazyLoadImage
						effect="blur"
						src={`${url_image}${backdrop}`}
						alt={`${url_image}${backdrop}`}
						className="w-screen h-screen object-cover"
					/>
					<ImageGradient />
					<div className="fixed flex flex-col gap-4 items-center justify-center w-full h-full top-0">
						<h1 className="text-6xl font-extrabold text-white text-center px-4">
							Películas con emojis 🥳
						</h1>
						<p className="text-3xl font-normal text-white text-center px-4">
							¡Descubre cuál es la película con solo emojis!
						</p>
						<ReactSelect
							className="w-96 mx-6"
							placeholder="Selecciona un género"
							isSearchable={false}
							styles={{
								container: (provided, state) => ({
									...provided,
									borderRadius: "0.75rem",
									height: "56px",
									cursor: "pointer",
									paddingLeft: "1rem",
									paddingRight: "1rem",
								}),
								control: (provided, state) => ({
									...provided,
									border: "none",
									boxShadow: "none",
									backgroundColor: "#FFFFFF",
									borderRadius: "0.75rem",
									height: "56px",
									paddingLeft: "1rem",
									cursor: "pointer",
								}),
								placeholder: (provided, state) => ({
									...provided,
									color: "#000000",
									fontWeight: "600",
								}),
								singleValue: (provided, state) => ({
									...provided,
									color: "#000000",
									fontWeight: "600",
								}),
								valueContainer: (provided, state) => ({
									...provided,
									padding: "0",
								}),
								indicatorSeparator: (provided, state) => ({
									...provided,
									backgroundColor: "#000000",
									width: "2px",
								}),
								dropdownIndicator: (provided, state) => ({
									...provided,
									color: "#000000",
								}),
								menu: (provided, state) => ({
									...provided,
									borderRadius: "0.75rem",
									left: "0",
								}),
								menuList: (provided, state) => ({
									...provided,
									paddingBottom: "0",
									paddingTop: "0",
									borderRadius: "0.75rem 0 0 0.75rem",
								}),
								option: (provided, state) => ({
									...provided,
									color: "#000000",
									cursor: "pointer",
									paddingLeft: "1rem",
									paddingRight: "1rem",
									paddingTop: "0.5rem",
									paddingBottom: "0.5rem",
									backgroundColor: state.isFocused ? "#FEF08A" : "#FFFFFF",
									"&:hover": {
										backgroundColor: "#FEF08A",
									},
									backgroundColor: state.isSelected ? "#FBBF24" : "#FFFFFF",
									"&:active": {
										backgroundColor: "#FBBF24",
									},
								}),
							}}
							options={genders}
							onChange={e => {
								setSelectedGender(e.value);
							}}
						/>
						<button
							onClick={handleSubmit}
							className="flex items-center gap-2 bg-white hover:bg-yellow-500 text-black font-bold py-4 px-6 rounded-xl"
						>
							<PuzzleIcon className="h-6 w-6" />
							¡Jugar ahora!
						</button>
					</div>
				</div>
			)}
			<Toaster />
		</div>
	);
}
