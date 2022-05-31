import React, { Component } from "react";
import { movies} from "./GetMovies";

export class Banner extends Component {
  render() {
    let moviesElem = movies.results[Math.floor((Math.random() * 10))]
    let backDrop =  moviesElem.backdrop_path
    let orgTItle = moviesElem.original_title
    let movieOverview = moviesElem.overview
    let movieTitle = moviesElem.title
    // let movie = movies.results[1];
    return (
      <>
        {movies == "" ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <div className="card banner-card">
              <img
                src={`https://image.tmdb.org/t/p/original${backDrop}`}
                className="card-img-top banner-img"
                alt={movieTitle}
              />
              {/* <div className="card-body"> */}
                <h1 className="card-title banner-title">{orgTItle}</h1>
                <p className="card-text banner-text">
                 {movieOverview}
                </p>
                {/* <a href="#" className="btn btn-primary">
                  Go somewhere
                </a> */}
              {/* </div> */}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Banner;
