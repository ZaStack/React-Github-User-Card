import React from 'react';
import axios from 'axios';
import './App.css';

let url1 = 'https://api.github.com/users/ZaStack';
let url2 = 'https://api.github.com/users/ZaStack/followers';

const request1 = axios.get(url1);
const request2 = axios.get(url2)

class App extends React.Component {


  constructor() {
    super();
    this.state = {
      user: {},
      followers: []
    };
    console.log('Constructor running...')
  }

  componentDidMount() {
      axios.all([request1, request2])
      .then(axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];

        this.setState({
          user: responseOne.data,
          followers: responseTwo.data
        });
      }))
      .catch(err => console.log('No data, sasa ke?', err))
  };


  render () {
    return (
      <div className="App">
        <div className="UserCard" key={this.state.user.id}>
          <img src={this.state.user.avatar_url} alt=""/>
          <h1>{this.state.user.login}</h1>
          <p>{this.state.user.location}</p>
          <p>{this.state.user.bio}</p>
          <p>Followers: {this.state.user.followers}</p>
          <div className="FollowersCards">
            {this.state.followers.map(follower => (
                <div className="follower-cont">
                <img src={follower.avatar_url} alt=""/>
                <h3>{follower.login}</h3>
                <p>{follower.location}</p>
                <p>{follower.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}}

export default App;
