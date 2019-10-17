import React, { Component } from "react";
import joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: []
  };

  schema = {
    _id: joi.string(),
    title: joi
      .string()
      .required()
      .label("Title"),
    genreId: joi
      .string()
      .required()
      .label("Genre"),
    numberInStock: joi
      .number()
      .required()
      .label("Number In Stock")
      .min(0)
      .max(100),
    dailyRentalRate: joi
      .number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

 componentDidMount() {
   const genres = getGenres();
   this.setState({ genres });

   const movieId = this.props.match.params.id;
   if(movieId === 'new') return;

   const movie = getMovie(movieId);
   if(!movie) return this.props.history.replace('/not-found');

   this.setState({ data: this.mapToViewModel(movie)})
 }

 mapToViewModel(movie) {
   return {
     _id: movie._id,
     title: movie.title,
     genreId: movie.genre._id,
     numberInStock: movie.numberInStock,
     dailyRentalRate: movie.dailyRentalRate

   }
 }
 doSubmit = () => {
   saveMovie(this.state.data);
   this.props.history.push('/movies')
 }

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Daily Rental Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
