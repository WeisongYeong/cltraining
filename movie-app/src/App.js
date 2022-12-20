import './App.css';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';

const MovieURLContext = React.createContext();
const ThemeContext = React.createContext();
const theme = {
  primary: '#000',
  secondary: '#333',
  tertiary: '999'
}
const Theme = props => {
  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
}

const Header = () =>{
  const [url, setUrl] = React.useContext(MovieURLContext);
  const [genres, setGenres] = useState();

  useEffect(() => {
    async function getAllGenres(url) {
      const res = await axios.get(url);
      setGenres(res.data.genres);
    }
    getAllGenres(url.genreURL)
  }, []);

  const concernedElement = document.querySelector(".click-text");

  document.addEventListener("click", (e) => {
    let search = document.getElementById('search');
    let genreField = document.getElementById('genre-field');
    if (search.contains(e.target) || genreField.contains(e.target)) {
      genreField.style.transform = "translateY(0)";
      genreField.style.transition = "transform 0.2s";
    } else {
      genreField.style.transform = "translateY(-100%)";
      genreField.style.transition = "transform 0.2s";
    }
  });

  return (
    <header>
      <nav>
        <a className="home" href="#">Home</a>
        <form  id="form">
            <input type="text" placeholder="Search" id="search"></input>
        </form>
        <a className="login" href="#">Login</a>   {/*Comeback later for href*/}
      </nav>
      <div id="genre-field">
        {genres && genres.map(genre => {
          return(
            <div key={genre.id} className="genre" id={genre.id}>{genre.name}</div>
          )
        })}
      </div>
    </header>
  )
}

const Main = () => {

  const [url, setUrl] = React.useContext(MovieURLContext);
  // const theme = React.useContext(ThemeContext);
  // let primColor = theme.primary;
  // let secColor = theme.secondary;
  // let tertColar = theme.tertiary;

  const [movies, setMovies] = useState();

  useEffect(() => {
    async function fetchMovies() {
      const res = await axios.get(url.popmovURL);
      setMovies(res.data.results);
    }
    fetchMovies()
  }, []);

  return (
    <main>
      <h1>Top 20 Popular Movies</h1>
      <div className="movie-container">
      {movies && movies.map(movie => {
        const {id, title, poster_path, vote_average, overview} = movie;
        let imgURL = `${url.imgBaseURL+poster_path}`;
        let color = vote_average > 7 ? 'lightgreen' : (vote_average < 5? 'red' : 'orange');
        return (
          <div key={id} className="movie">
            <img src={poster_path ? imgURL : "http://via.placeholder.com/1080x1580"} alt={title}></img>
            <div className="movie-info">
              <div className="title">{title}</div>
              <div className="rating" style={{ color: color}}>{vote_average}</div>
            </div>
            {/* <div>
              <div>Overview {overview ? '': 'Not Available'}</div>
              <div>{overview}</div>
            </div> */}
          </div>
        )
      })}
      </div>
    </main>
  )
}

const Pagination = () => {

  return (
    <div className="pagination">
      <button id="prev-page" type="button"> Prev </button>
      <div id="curr-page">1</div>
      <button id="next-page" type="button"> Next </button>
    </div>   
  )
}


const MovieURLProvider = props => {
  const apiKey = 'api_key=96f4f679b0cee46290970299c5656f9e';
  const baseURL = 'https://api.themoviedb.org/3';

  const [url, setUrl] = React.useState({
    popmovURL: `${baseURL}/discover/movie?sort_by=popularity.desc&${apiKey}`,
    genreURL: `${baseURL}/genre/movie/list?${apiKey}`,
    imgBaseURL: 'https://image.tmdb.org/t/p/w500'
  });

  return (
    <MovieURLContext.Provider value={[url, setUrl]}>
      {props.children}
    </MovieURLContext.Provider>
  )
}

const App = () => {
  
  
  return (
    <Theme>
      <MovieURLProvider>
        <div className="App">
          <Header />
          <Main/>
          <Pagination />
        </div> 
      </MovieURLProvider>
    </Theme>
  );
}


export default App;
