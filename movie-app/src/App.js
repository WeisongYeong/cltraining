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
  return (
    <header>
      <nav>
        <div>Home</div>
        <form  id="form">
            <input type="text" placeholder="Search" id="search"></input>
        </form>
        <a className="login" href="#">Login</a>   {/*Comeback later for href*/}
      </nav>
      <div id="genre-field"></div>
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
      {movies && movies.map(movie => {
        const {id, title, poster_path, vote_average, overview} = movie;
        let imgURL = `${url.imgBaseURL}${poster_path}`;
        return (
          <div key={id}>
            <img src={imgURL}></img>
            <div>{title}</div>
            <div>{vote_average}</div>
            <div>{overview}</div>
          </div>
        )
      })}
    </main>
  )
}

const Pagination = () => {
  return (
    <div>
      <button id="prev-page" type="button"> Next Page
        <i className="material-icons">navigate_before</i>
      </button>
      <div id="curr-page">1</div>
      <button id="next-page" type="button"> Previous Page
        <i className="material-icons">navigate_next</i>
      </button>
    </div>   
  )
}


// If error, check here as not using props as para
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
