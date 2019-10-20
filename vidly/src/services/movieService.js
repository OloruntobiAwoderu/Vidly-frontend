import React, { Component } from 'react';
import Axios from 'axios';

export const getMovies = () => {
    return Axios.get('http://localhost:3900/api/movies')
}
 


export const deleteMovie = (movieId) => {
    return Axios.delete(`http://localhost:3900/api/movies/${movieId}`)
}
 
