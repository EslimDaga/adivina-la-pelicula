import Head from "next/head";
import { useTheme } from "next-themes";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Peliculas con emojis 🥳</title>
			</Head>
			<div className="w-screen h-screen">
				<img
					src="https://image.tmdb.org/t/p/original/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg"
					alt="my-big-fat-greek-wedding-2"
					className="w-full h-full object-cover"
				/>
			</div>
		</div>
	);
}
