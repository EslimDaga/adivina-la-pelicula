import { useTheme } from "next-themes";
export default function Home() {
	const { theme, setTheme } = useTheme();
	return (
		<div className="bg-red-500 dark:bg-black">
			Movie to Emoji
			<button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
				toggle
			</button>
		</div>
	);
}
