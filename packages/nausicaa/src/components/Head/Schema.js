import React from 'react';
import formatDate from '../../util/formatDate';
import addSizeSuffix from '../../util/addSizeSuffix';

const getDuration = minutes => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `PT${h > 0 ? h + 'H' : ''}${m > 0 ? m + 'M' : ''}`;
};

export default ({
  type,
  collection,
  slug,
  description,
  picture,
  headline,
  date,
  datemodified,
  author,
  verdict,
  item,
  itemname,
  director,
  releasedate,
  wikipediaurl,
  rating,
  review,
  preptime,
  cooktime,
  totaltime,
  recipeyield,
  servingsize,
  colories,
  fatcontent,
  ingredients,
  instructions,
  config: {
    protocol,
    media,
    images,
    domain,
    collections,
    authors,
    organization,
    mediasuffix,
  },
}) => {
  let schema = {
    '@context': 'http://schema.org/',
    mainEntityOfPage: `${protocol}://${domain}/${collections[collection]
      .slug}/${slug}/`,
    description: description,
    datePublished: formatDate(date, 'YYYY-MM-DD', 'de'),
    author: {
      '@type': 'Person',
      name: authors[author].name,
      sameAs: `${protocol}://${domain}`,
    },
    publisher: {
      '@type': 'Organization',
      name: `${organization.name}`,
      logo: {
        '@type': 'ImageObject',
        url: `${media}${organization.banner.path}${mediasuffix}`,
        width: organization.banner.width,
        height: organization.banner.height,
      },
    },
    image: {
      '@type': 'ImageObject',
      url: `${media}${addSizeSuffix(
        picture,
        images.large.suffix
      )}${mediasuffix}`,

      height: 2000,
      width: 800,
    },
  };
  if (datemodified) {
    schema.dateModified = formatDate(datemodified, 'YYYY-MM-DD', 'de');
  }

  switch (type) {
    case 'article':
      schema = {
        ...schema,
        '@type': 'NewsArticle',
        headline: headline,
      };
      break;
    case 'review':
      schema = {
        ...schema,
        '@type': 'Review',
        name: verdict,
        itemReviewed: {
          '@type': item,
          name: itemname,
          director: director,
          dateCreated: releasedate,
          sameAs: wikipediaurl,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: rating,
        },
        reviewBody: review,
      };
      break;
    case 'recipe':
      schema = {
        ...schema,
        '@type': 'Recipe',
        name: headline,
        prepTime: getDuration(preptime),
        cookTime: getDuration(cooktime),
        totalTime: getDuration(totaltime),
        recipeYield: recipeyield,
        nutrition: {
          '@type': 'NutritionInformation',
          servingSize: servingsize,
          calories: colories,
          fatContent: fatcontent,
        },
        recipeIngredient: ingredients,
        recipeInstructions: instructions,
      };
      break;
    default:
      return null;
  }

  const breadcrumbs = {
    '@context': 'http://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': `${protocol}://${domain}/${collections[collection].slug}/`,
          name: collections[collection].name,
        },
      },
    ],
  };

  return [
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />,
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbs),
      }}
    />,
  ];
};
