import axios from "axios";
import type { Movie } from "@/types";

interface OmdbResponse {
    Response: string;
    Error?: string;
    Title: string;
    Poster: string;
    Year: string;
    imdbRating: string;
    Actors: string;
    Plot: string;
}

export async function fetchMovieDetails(imdbId: string): Promise<Movie> {
    const apiKey = process.env.OMDB_API_KEY;

    if (!apiKey) {
        throw new Error("OMDB_API_KEY is not configured");
    }

    const { data } = await axios.get<OmdbResponse>(
        `https://www.omdbapi.com/?i=${imdbId}&apikey=${apiKey}&plot=full`
    );

    if (data.Response === "False") {
        throw new Error(data.Error || "Movie not found");
    }

    return {
        title: data.Title,
        poster: data.Poster,
        year: data.Year,
        rating: data.imdbRating,
        cast: data.Actors.split(", "),
        plot: data.Plot,
    };
}
