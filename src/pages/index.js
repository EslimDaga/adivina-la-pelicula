import Head from "next/head";
import styled from "styled-components";

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
				<title>Peliculas con emojis 🥳</title>
			</Head>
			<BackgroundImage />
			<ImageGradient />
		</div>
	);
}
