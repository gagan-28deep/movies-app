import React, { Component } from "react";

import { movies } from "./GetMovies";

export class Favourites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
      currGenre: "All genres",
      movies: [],
      currText: "",
      limit : 5,
      currPage : 1,
    };
  }

  componentDidMount() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let data = JSON.parse(localStorage.getItem("movies-app") || "[]");

    let temp = [];
    data.forEach((movieObj) => {
      if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
        temp.push(genreids[movieObj.genre_ids[0]]);
      }
    });
    temp.unshift("All genres");
    this.setState({
      genres: [...temp],
      movies: [...data],
    });
  }

  handleChangeGenre = (genre) => {
    this.setState({
      currGenre: genre,
    });
  };

  sortPopularityDesc=()=>{
      let temp = this.state.movies
      temp.sort(function(objA , objB){
          return objB.popularity - objA.popularity
      })
      this.setState({
          movies : [...temp]
      })
  }
  sortPopularityAsc=()=>{
    let temp = this.state.movies
    temp.sort(function(objA , objB){
        return objA.popularity - objB.popularity
    })
    this.setState({
        movies : [...temp]
    })
}

sortRatingDesc=()=>{
    let temp = this.state.movies
    temp.sort(function(objA , objB){
        return objB.vote_average - objA.vote_average
    })
    this.setState({
        movies : [...temp]
    })
}

sortRatingAsc=()=>{
    let temp = this.state.movies
    temp.sort(function(objA , objB){
        return objA.vote_average - objB.vote_average
    })
    this.setState({
        movies : [...temp]
    })
}

handlePageChance=(page)=>{
    this.setState({
        currPage : page
    })
}

handleDelete=(id)=>{
    let newArr = []
    newArr = this.state.movies.filter((movieObj)=>movieObj.id !== id)
    this.setState({
        movies : [...newArr]
    })
    localStorage.setItem('movies-app' , JSON.stringify(newArr))
}
  render() {
    // const movie = movies.results
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    let filterArr = [];

    // if(this.state.currGenre ===  'All genres'){
    //     filterArr = this.state.movies
    // }
    if (this.state.currText === "") {
      filterArr = this.state.movies;
    } else {
      filterArr = this.state.movies.filter((movieObj) => {
        let title = movieObj.original_title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase().trim());
      });
    }

    if (this.state.currGenre !== "All genres") {
      filterArr = this.state.movies.filter(
        (movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currGenre
      );
    }

    let pages = Math.ceil(filterArr.length / this.state.limit)
    let pageArr = []
    for(let i = 1 ; i<=pages ; i++){
        pageArr.push(i)
    }
    let si = (this.state.currPage - 1)*(this.state.limit)
    let ei = (si) + (this.state.limit)
    filterArr = filterArr.slice(si , ei)

    // const movie = movies.results
    // let temp = []
    // movie.forEach((movieObj)=>{
    //     if(!temp.includes(genreids[movieObj.genre_ids[0]])){
    //         temp.push(genreids[movieObj.genre_ids[0]])
    //     }

    // })
    // temp.unshift("All genres")
    // console.log(temp);
    return (
      <div>
        <>
          <div className="main">
            <div className="row">
              <div className="col-lg-3 col-sm-12">
                <div className="list-group favourites-genres">
                  <ul class="list-group">
                    {this.state.genres.map(
                      (
                        genre // temp.map
                      ) =>
                        this.state.currGenre == genre ? (
                          <li
                            className="list-group-item"
                            style={{
                              background: "#3f51b5",
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                            {genre}
                          </li>
                        ) : (
                          <li
                            className="list-group-item"
                            style={{
                              background: "white",
                              color: "#3f51b5",
                              fontWeight: "bold",
                            }}
                            onClick={() => this.handleChangeGenre(genre)}
                          >
                            {genre}
                          </li>
                        )
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-lg-9 favourites-table col-sm-12">
                <div className="row">
                  <input
                    type="text"
                    className="input-group-text col"
                    placeholder="Search"
                    value={this.state.currText}
                    onChange={(e) =>
                      this.setState({ currText: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="input-group-text col"
                    placeholder="Rows Count"
                    value={this.state.limit}
                    onChange={(e)=>{
                        this.setState({limit : e.target.value})
                    }}
                  />
                </div>
                <div className="row">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">
                          <i
                            class="fa-solid fa-sort-up"
                            onClick={this.sortPopularityDesc}
                          ></i>
                          Popularity
                          <i
                            class="fa-solid fa-sort-down"
                            onClick={this.sortPopularityAsc}
                          ></i>
                        </th>
                        <th scope="col">
                          <i
                            class="fa-solid fa-sort-up"
                            onClick={this.sortRatingDesc}
                          ></i>
                          Rating
                          <i
                            class="fa-solid fa-sort-down"
                            onClick={this.sortRatingAsc}
                          ></i>
                        </th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterArr.map(
                        // this.state.movies.map
                        (
                          movieObj // movies.map
                        ) => (
                          <tr>
                            <td>
                              <img
                                src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                                alt={movieObj.title}
                                style={{ width: "5rem" }}
                              />
                            </td>
                            <td>{movieObj.original_title}</td>
                            <td>{genreids[movieObj.genre_ids[0]]}</td>
                            <td>{movieObj.popularity}</td>
                            <td>{movieObj.vote_average}</td>
                            <td>
                              <button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                  <nav aria-label="Page navigation example">
                    <ul class="pagination">
                      {
                          pageArr.map((page)=>(
                            <li class="page-item">
                            <a class="page-link" onClick={()=>this.handlePageChance(page)}>
                              {page}
                            </a>
                          </li>
                          ))
                      }
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    );
  }
}

export default Favourites;
