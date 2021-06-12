import React, {useEffect, useState} from 'react';
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import {Container, Row} from "react-bootstrap";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import {MovieListType} from "./utils/utils";
import RemoveFavourites from "./components/RemoveFavourites";

const App = () => {

    const [movies, setMovies] = useState<MovieListType[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [favourites, setFavourites] = useState<MovieListType[]>([])

    const getMovies = async (searchValue: string) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}?s=${searchValue}&apikey=${process.env.REACT_APP_API_KEY}`)
        const responseJSON = await response.json();
        if (responseJSON.Search){
            setMovies(responseJSON?.Search)
        }
    }

    useEffect(() => {
        getMovies(searchValue)
    }, [searchValue])

    useEffect(() => {
        const movieFavourites = JSON.parse(localStorage.getItem('favourites') as string)
        setFavourites(movieFavourites)
    }, [])

    const saveToLocalStorage = (movieList: MovieListType[]) => {
        localStorage.setItem('favourites', JSON.stringify(movieList))
    }

    const addFavouriteMovie = (movie: MovieListType) => {
        const newFavouriteList: MovieListType[] = [...favourites, movie]
        setFavourites(newFavouriteList)
        saveToLocalStorage(newFavouriteList)
    }

    const removeFromFavourite = (movie: MovieListType) => {
        const newFavouriteList: MovieListType[] = favourites.filter((favourite: MovieListType) => favourite.imdbID !== movie.imdbID)
        setFavourites(newFavouriteList)
        saveToLocalStorage(newFavouriteList)
    }

    return(
        <Container fluid className={"movie-app"}>
            <Row className={"d-flex align-items-center my-4"}>
                <MovieListHeading heading={"Movies"}/>
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
            </Row>
            <Row>
                <MovieList
                    movies={movies}
                    favouriteComponent={AddFavourites}
                    handleFavouritesClick={addFavouriteMovie}
                />
            </Row>
            {favourites.length !== 0 ? (
                <>
                    <Row className={"d-flex align-items-center my-4"}>
                        <MovieListHeading heading={"Favourites"}/>
                    </Row>
                    <Row>
                        <MovieList
                            movies={favourites}
                            favouriteComponent={RemoveFavourites}
                            handleFavouritesClick={removeFromFavourite}
                        />
                    </Row>
                </>
            ):
                <></>
            }

        </Container>
    )
}

export default App;
