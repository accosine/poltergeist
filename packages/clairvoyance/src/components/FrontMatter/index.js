import React, { useState, memo } from 'react';
import { makeStyles } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Media from './Media';
import FrontMatterTextfield from './FrontMatterTextfield';
import ChipInput from '../FrontMatter/ChipInput';
import config from '../../config';

import RecipeFrontMatter from './RecipeFrontMatter';
import ReviewFrontMatter from './ReviewFrontMatter';
import VideoFrontMatter from './VideoFrontMatter';

const { authors, layouts, types, article, page } = config.application;

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'stretch',
    flexWrap: 'wrap',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: 350,
    flex: 1,
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const FrontMatter = ({
  itemtype,
  disableSlug,
  slugError,
  kind,
  published,
  ...props
}) => {
  const classes = useStyles();
  let collections, collectionsorder;
  if (kind === 'article') {
    collections = article.collections;
    collectionsorder = article.collectionsorder;
  } else if (kind === 'page') {
    collections = page.collections;
    collectionsorder = page.collectionsorder;
  }

  const [currentTab, setCurrentTab] = useState(0);

  function handleTabChange(event, newValue) {
    setCurrentTab(newValue);
  }

  // TODO: use mui withWidth to toggle between scrollable and centered
  return (
    <div className={classes.root}>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Meta" />
        <Tab label="Titles" />
        <Tab label="Media" />
        {props.type === 'review' ? (
          <Tab label="Review" />
        ) : props.type === 'recipe' ? (
          <Tab label="Recipe" />
        ) : props.type === 'video' ? (
          <Tab label="Video" />
        ) : null}
      </Tabs>
      {currentTab === 0 && (
        <>
          <div className={classes.rowContainer}>
            <div className={classes.column}>
              <FormControlLabel
                control={
                  <Switch
                    checked={published}
                    onChange={event =>
                      props.onChange({ published: event.target.checked })
                    }
                    value="published"
                    color="primary"
                  />
                }
                label="published"
              />
              <FrontMatterTextfield
                id="date"
                inputType="date"
                InputLabelProps={{ shrink: true }}
                {...props}
              />
              <FrontMatterTextfield
                id="datemodified"
                inputType="date"
                InputLabelProps={{ shrink: true }}
                {...props}
              />
              <FrontMatterTextfield
                disabled={disableSlug}
                error={!!slugError}
                helperText={slugError}
                id="slug"
                {...props}
              />
            </div>
            <div className={classes.column}>
              <FormControl margin="normal">
                <InputLabel htmlFor="collection">collection</InputLabel>
                <Select
                  value={props.collection}
                  onChange={event =>
                    props.onChange({ collection: event.target.value })
                  }
                  input={<Input id="collection" />}
                  disabled={disableSlug}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {collectionsorder.map(collection => (
                    <MenuItem key={collection} value={collection}>
                      {collections[collection].name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl margin="normal">
                <InputLabel htmlFor="author">author</InputLabel>
                <Select
                  value={props.author}
                  onChange={event =>
                    props.onChange({ author: event.target.value })
                  }
                  input={<Input id="author" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Object.keys(authors).map(author => (
                    <MenuItem key={author} value={author}>
                      {authors[author].name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl margin="normal">
                <InputLabel htmlFor="layout">layout</InputLabel>
                <Select
                  value={props.layout}
                  onChange={event =>
                    props.onChange({ layout: event.target.value })
                  }
                  input={<Input id="layout" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Object.keys(layouts).map(layout => (
                    <MenuItem key={layout} value={layout}>
                      {layout}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl margin="normal">
                <InputLabel htmlFor="type">type</InputLabel>
                <Select
                  value={props.type}
                  onChange={event =>
                    props.onChange({ type: event.target.value })
                  }
                  input={<Input id="type" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Object.keys(types).map(type => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={classes.rowContainer}>
            <ChipInput
              id="tags"
              onChange={tags => {
                props.onChange({ tags });
              }}
              chipData={props.tags || []}
            />
          </div>
        </>
      )}

      {currentTab === 1 && (
        <div className={classes.columnContainer}>
          <FrontMatterTextfield id="title" fullWidth {...props} />
          <FrontMatterTextfield id="description" fullWidth {...props} />
          <FrontMatterTextfield id="headline" fullWidth {...props} />
          <FrontMatterTextfield id="subline" fullWidth {...props} />
        </div>
      )}

      {currentTab === 2 && (
        <Media
          picture={props.picture}
          alt={props.alt}
          attribution={props.attribution}
          onChange={props.onChange}
        />
      )}

      {currentTab === 3 && props.type !== 'article' && (
        <div className={classes.rowContainer}>
          {props.type === 'review' ? (
            <ReviewFrontMatter {...props} itemtype={itemtype} />
          ) : props.type === 'recipe' ? (
            <RecipeFrontMatter {...props} />
          ) : props.type === 'video' ? (
            <VideoFrontMatter {...props} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default memo(FrontMatter);
