import React, { Component } from 'react';
import { FirebaseContext } from '../firebase';
import TextField from '@material-ui/core/TextField';

class ImageSearch extends Component {
  static contextType = FirebaseContext;
  state = {
    query: '',
    result: [],
  };

  handleChange = async event => {
    const query = event.target.value;
    this.setState({ query });

    if (query.length) {
      try {
        const { docs } = await this.context.firestore
          .collection('images')
          .orderBy('name')
          .startAt(query)
          .endAt(query + '\uf8ff')
          .get();
        // const { docs } = await this.context.firestore
        //   .collection('images')
        //   .where('tags', 'array-contains', query)
        //   .get();
        console.log(docs);
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
        <TextField label="query" value={query} onChange={this.handleChange} />
        {result.map(name => (
          <p key={name}>{name}</p>
        ))}
      </>
    );
  }
}

export default ImageSearch;
