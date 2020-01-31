import React, { useState, useEffect, useReducer } from 'react';
import '../App.css';
import Header from './Header'
import Movie from './Movie'
import Search from './Search'

const Movie_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b'

// The following code makes use of the useState and useEffect hooks.

// const App = () => {
//   const [loading, setLoading] = useState(true);
//   const [movies, setMovies] = useState([]);
//   const [errorMessage, setErrorMessage] = useState(null);

//   useEffect(() => {
//     fetch(Movie_API_URL)
//       .then(response => response.json())
//       .then(jsonResponse => {
//         setMovies(jsonResponse.Search);
//         setLoading(false);
//       });
//   }, []);

//   const search = searchValue => {
//     setLoading(true);
//     setErrorMessage(null);

//     fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
//       .then(res => res.json())
//       .then(jsonResponse => {
//         if (jsonResponse.Response === "True") {
//           setMovies(jsonResponse.Search);
//           setLoading(false);
//         } else {
//           setErrorMessage(jsonResponse.Error);
//           setLoading(false);
//         }
//       })
//   }

//   return (
//     <div className='App'>
//       <Header text="HookMeUp" />
//       <Search search={search} />
//       <p className='App-intro'>Let's find some movies.</p>
//       <div className="movies">
//         {loading && !errorMessage ? (
//           <span>loading...</span>
//         ) : errorMessage ? (
//           <div className="errorMessage">{errorMessage}</div>
//         ) : (
//               movies.map((movie, index) => (
//                 <Movie key={`${index}-${movie.Title}`} movie={movie} />
//               ))
//             )}
//       </div>
//     </div>
//   )

// }

// export default App;

// The following code is a refactored version with the useReducer Hook to combine our three seperate useState hooks from before.

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case "Search_Movies_Request":
      return {
        ...state,
        loading: true,
        errorMessage: null
      }
    case "Search_Movies_Success":
      return {
        ...state,
        loading: false,
        movies: action.payload
      }
    case "Search_Movies_Failure":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      }
    default:
      return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(Movie_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: "Search_Movies_Request",
          payload: jsonResponse.Search
        });
      });
  }, []);

  const search = searchValue => {
    dispatch({
      type: "Search_Movies_Request"
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "Search_Movies_Success",
            payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: "Search_Movies_Failure",
            error: jsonResponse.Error
          });
        }
      });
  };

  const { movies, errorMessage, loading } = state;

  return (
    <div className='App'>
      <Header text="HookMeUp" />
      <Search search={search} />
      <p className='App-intro'>Let's find some movies.</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
              movies.map((movie, index) => (
                <Movie key={`${index}-${movie.Title}`} movie={movie} />
              ))
            )}
      </div>
    </div>
  )
}

export default App;