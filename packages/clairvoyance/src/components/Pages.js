import React from 'react';
import CardList from './CardList';
import ArticleCard from './ArticleCard';

const Pages = ({ history }) => (
  <CardList
    collection="pages"
    CardComponent={ArticleCard}
    path="/editor/page"
    history={history}
  />
);

export default Pages;
