import React, { Component } from "react";
import axios from 'axios'

// import { movies } from "./GetMovies";
export class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: "",
      parr : [1],
      currPage : 1,
      movies : [],
      favourites : []
    };
  }

  async componentDidMount(){
    // Side effects work
    // console.log('Mounting Done');
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=813fc636b6c680f1e28a60bab5837918&language=en-US&page=${this.state.currPage}`)
    let data = res.data
    // console.log(data);
    this.setState({
      movies : [...data.results]
    })
  }

  changeMovies=async()=>{
    // console.log('change movies called');
    // console.log(this.state.currPage);
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=813fc636b6c680f1e28a60bab5837918&language=en-US&page=${this.state.currPage}`)
    let data = res.data
    // console.log(data);
    this.setState({
      movies : [...data.results]
    })
  }
  handleRight=()=>{
    let tempArr = []
    for(let i = 1 ; i<=this.state.parr.length + 1 ; i++){
      tempArr.push(i)
    }
    // setState is asynchronous fn. 
    this.setState({
      parr : [...tempArr],
      currPage : this.state.currPage + 1
    } ,  this.changeMovies )
  }

  handleLeft=()=>{
    if(this.state.currPage!=1){
      this.setState({
        currPage : this.state.currPage - 1
      } , this.changeMovies)
    }
  }

  handleClick=(val)=>{
    if(val != this.state.currPage){
      this.setState({
        currPage : val
      } , this.changeMovies)
    }
  }

  handleFacourites = (movie)=>{
    let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]')
    if(this.state.favourites.includes(movie.id)){
      oldData = oldData.filter((m)=>m.id!=movie.id)
    }
    else{
      oldData.push(movie)
    }
    // setItem is synchronous
    localStorage.setItem('movies-app' , JSON.stringify(oldData))
    // console.log(oldData);
    this.handleFacouritesState()
  }

  handleFacouritesState = ()=>{
    let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]')
    let temp = oldData.map((movie)=>movie.id)
    this.setState({
      favourites : [...temp]
    })
  }
   
  render() {
    // console.log('render');
    // let movie = movies.results;
    return (
      <>
        {this.state.movies.length == 0 ? (      // movie.length
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="text-center">
              <strong>Trending</strong>
            </h3>
            <div className="movies-list">
              {this.state.movies.map((movieObj) => (       // movie.map
                <div
                  className="card movies-card"
                  onMouseEnter={() => this.setState({ hover: movieObj.id })}
                  onMouseLeave={() => this.setState({ hover: "" })}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    className="card-img-top movies-img"
                    alt={movieObj.title}
                  />
                  {/* <div className="card-body"> */}
                  <h5 className="card-title movies-title">
                    {movieObj.original_title}
                  </h5>
                  <div
                    className="button-wrapper"
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {this.state.hover == movieObj.id && (
                      <a className="btn btn-primary movies-btn" onClick={()=>this.handleFacourites(movieObj)}>
                        {
                          this.state.favourites.includes(movieObj.id) ? 'Remove From Favourites' : 'Add To Facourites'
                        }
                        {/* Add To Favourites */}
                      </a>
                    )}
                  </div>
                  {/* </div> */}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" onClick={this.handleLeft}>
                      Previous
                    </a>
                  </li>
                    {
                        this.state.parr.map((value)=>(
                            <li className="page-item">
                            <a className="page-link" onClick={()=>this.handleClick(value)}>
                              {value}
                            </a>
                          </li>
                        ))
                    }
                  <li className="page-item">
                    <a className="page-link" onClick={this.handleRight}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default MovieList;
