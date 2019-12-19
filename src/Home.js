import React, { Component, useReducer } from 'react';
import axios from 'axios';

const Repo = ({ repo, index }) =>
  
  <div className="col-sm-3 col-xs-6">
      <div className ="cards">
        <div style={{backgroundImage: `url(${repo.image})`, padding: 30, backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover', position: 'relative', minHeight: 260}}>
                <div className="detail">
                    <h3>{repo.name}</h3>
                    <p>id: {repo.id} - Created 2 years ago</p>                                                                              
                </div>
            </div>
        <table class="table">
            <tr>
                <td>Status</td>
                <td>{repo.status}</td>
            </tr>
            <tr>
                <td>Species</td>
                <td>{repo.species}</td>
            </tr>
            <tr>
                <td>Gender</td>
                <td>{repo.gender}</td>
            </tr>
            <tr>
                <td>Origin</td>
                <td>{repo.origin.name}</td>
            </tr>
        </table>
    </div>
  </div>
  
  ;

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get(
        window.encodeURI(
          `https://rickandmortyapi.com/api/character/`,
        ),
      )
      .then(response => {
        const repos = response.data.results;
        this.setState({
          repos,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({
          error: error,
          loading: false,
        });
      });
  }

  renderLoading() {
    return (
      <div>
        Loading...
      </div>
    );
  }

  renderError() {
    return (
      <div>
        <div>
          Sorry, an error ocurred: {this.state.error.response.data.message}
        </div>
      </div>
    );
  }

  renderList() {
    const { error, repos } = this.state;

    if (error) {
      console.log(error);
      return this.renderError();
    }

    return (
      <div>
          {repos.map((repo, index) =>
            <Repo repo={repo} index={index} key={repo.id} />,
          )}
        </div>
    );
  }

  render() {
    return this.state.loading ? this.renderLoading() : this.renderList();
  }
}
