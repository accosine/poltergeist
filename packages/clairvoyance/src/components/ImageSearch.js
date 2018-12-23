import React, { Component } from 'react';
import connectFirebase from '../util/connect-firebase';

class ImageSearch extends Component {
  state = {
    query: '',
    result: [],
  };

  handleChange = async event => {
    const query = event.target.value;
    this.setState({ query });

    if (query.length) {
      try {
        const { docs } = await this.props.firebase.firestore
          .collection('images')
          .orderBy('name')
          .startAt(query)
          .endAt(query + '\uf8ff')
          .get();
        this.setState({ result: docs.map(doc => doc.data().name) });
      } catch (error) {
        console.log(error);
      }
    } else {
      this.setState({ result: [] });
    }
  };

  render() {
    const { query, result } = this.state;
    return (
      <>
        <input value={query} onChange={this.handleChange} />
        {result.map(name => (
          <p key={name}>{name}</p>
        ))}
      </>
    );
  }
}

export default connectFirebase(ImageSearch);
