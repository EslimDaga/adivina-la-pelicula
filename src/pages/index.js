import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PuzzleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import ReactSelect from "react-select";
import Head from "next/head";
import styled from "styled-components";
import axios from "axios";
import "react-lazy-load-image-component/src/effects/blur.css";
import { API_KEY, url, url_image } from "@/global/constants";

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

const Home = () => {
  const router = useRouter();

  const [backdrop, setBackdrop] = useState("");
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [genders, setGenders] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 500) + 1;

    const getMovies = axios.get(
      `${url}movie/popular?api_key=${API_KEY}&language=es-ES&page=${randomPage}`
    );

    const getGenders = axios.get(
      `${url}genre/movie/list?api_key=${API_KEY}&language=es-ES`
    );

    getMovies.then((response) => {
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

    getGenders.then((response) => {
      setGenders(
        response.data.genres.map((gender) => {
          return {
            value: gender.id,
            label: gender.name,
          };
        })
      );
    });
  }, []);

  const handleSubmit = (_) => {
    if (selectedGender === null) {
      toast.error("Debes seleccionar un género");
      return;
    }

    router.push({
      pathname: "/movie",
      query: {
        gender_id: selectedGender.value,
        gender_name: selectedGender.label,
      },
    });
  };

  return (
    <div className="bg-yellow-500">
      <Head>
        <title>Adivina la película 🎬</title>
      </Head>
      {loading ? (
        <div className="flex items-center justify-center w-screen h-screen">
          <InfinitySpin width="200" color="#FFFFFF" />
        </div>
      ) : (
        <div className="flex items-center justify-center w-screen">
          {backdrop ? (
            <>
              <LazyLoadImage
                effect="blur"
                src={`${url_image}${backdrop}`}
                alt={`${url_image}${backdrop}`}
                className="object-cover w-screen h-screen"
              />
              <ImageGradient />
            </>
          ) : (
            <>
              <LazyLoadImage
                effect="blur"
                src={`${url_image}/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg`}
                alt={`${url_image}/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg`}
                className="object-cover w-screen h-screen"
              />
              <ImageGradient />
            </>
          )}
          <div className="fixed top-0 flex flex-col items-center justify-center w-full h-full gap-4">
            <h1 className="px-4 text-3xl font-extrabold text-center text-white lg:text-6xl">
              Adivina la película 🎬
            </h1>
            <p className="px-4 font-normal text-center text-white text-1xl lg:text-3xl">
              ¡Descubre cuál es la película con tan solo una imagen!
            </p>
            <ReactSelect
              className="mx-6 w-96"
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
                  position: "relative",
                  top: "0",
                }),
                menuList: (provided, state) => ({
                  ...provided,
                  paddingBottom: "0",
                  paddingTop: "0",
                  borderRadius: "0.75rem 0 0 0.75rem",
                  height: "200px",
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
                  borderTopRightRadius:
                    state.options[0].value === state.data.value
                      ? "0.75rem"
                      : "0",
                  borderBottomRightRadius:
                    state.options[state.options.length - 1].value ===
                    state.data.value
                      ? "0.75rem"
                      : "0",
                }),
              }}
              options={genders}
              onChange={(e) => {
                setSelectedGender(e);
              }}
            />
            <button
              onClick={handleSubmit}
              className={
                "flex items-center gap-2 bg-white  text-black font-bold py-4 px-6 rounded-xl" +
                (selectedGender === null
                  ? " opacity-70 cursor-not-allowed hover:bg-none"
                  : " hover:bg-yellow-500")
              }
              disabled={selectedGender === null}
            >
              <PuzzleIcon className="w-6 h-6" />
              ¡Jugar ahora!
            </button>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Home;
