import Head from "next/head";
import { useTheme } from "next-themes";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Peliculas con emojis 🥳🎉</title>
			</Head>
			<div className="w-screen h-screen">
				{/* Two cards */}
				<div className="flex">Peliculas con emojis</div>
			</div>
		</div>
	);
}
