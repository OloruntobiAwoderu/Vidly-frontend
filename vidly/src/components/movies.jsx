import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import SearchBox from "./searchBox";
class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getGenres();

    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({
      movies,
      genres
    });
  }

  handleDelete = async movie => {
    const orignalMovies = this.state.movies;

    const movies = orignalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        alert("Movie has been deleted");
      this.setState({ movies: orignalMovies });
    }
  };
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    let filtered = this.state.movies;
    if (this.state.searchQuery)
      filtered = this.state.movies.filter(m =>
        m.title.toLowerCase().startsWith(this.state.searchQuery.toLowerCase())
      );
    else if (this.state.selectedGenre && this.state.selectedGenre._id)
      filtered = this.state.movies.filter(
        m => m.genre._id === this.state.selectedGenre._id
      );

    const sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const movies = paginate(
      sorted,
      this.state.currentPage,
      this.state.pageSize
    );
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { user } = this.props;
    if (this.state.movies.length === 0)
      return <p>There are no movies in the database.</p>;
    const { totalCount, data } = this.getPagedData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link to="/movies/new" >
              <button style={{ marginBottom: 20 }} className="btn btn-primary lg">New Movie</button>
            </Link>
          )}
          <p>Showing {totalCount} movies in the database</p>
          <SearchBox onChange={this.handleSearch} value={this.searchQuery} />
          <MoviesTable
            movies={data}
            sortColumn={this.state.sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
