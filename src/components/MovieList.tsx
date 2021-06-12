import React from "react";
import {MovieListType} from "../utils/utils";

interface MovieListProps {
    movies: MovieListType[]
    favouriteComponent: any
    handleFavouritesClick: (movie: MovieListType) => void
}

export const MovieList = ({movies, favouriteComponent, handleFavouritesClick}: MovieListProps) => {

    const FavouriteComponent = favouriteComponent
    return(
        <>
            {movies?.map((movie: MovieListType, index: number) => (
                <div key={index} className={"image-container d-flex justify-content-start m-3"}>
                    <img  src={movie.Poster} alt={movie.Title}/>
                    <div onClick={() => handleFavouritesClick(movie)}
                         className={"overlay d-flex align-items-center justify-content-center"}
                    >
                        <FavouriteComponent/>
                    </div>
                </div>
            ))}
        </>
    )
}

export default MovieList
