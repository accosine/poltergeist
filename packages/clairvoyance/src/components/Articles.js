import React from 'react';
import CardList from './CardList';
import ArticleCard from './ArticleCard';

const Articles = ({ history }) => (
  <CardList
    collection="articles"
    CardComponent={ArticleCard}
    path="/editor/article"
    history={history}
  />
);

export default Articles;
