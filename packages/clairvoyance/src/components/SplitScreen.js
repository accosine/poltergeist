import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Editor from './Editor';
import FixedButton from './FixedButton';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import FrontMatter from './FrontMatter';
import { FirebaseContext } from '../firebase';
import config from '../config';

const Preview = lazy(() => import('./Preview'));
const Shortcodes = lazy(() => import('./Shortcodes'));

const articleCollectionSlugs = Object.values(
  config.application.article.collections
).map(c => c.slug);

const styleSheet = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: theme.spacing(1),
  },
  frontmatter: {
    padding: 4,
  },
  shortcodes: {
    margin: 4,
  },
  container: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexWrap: 'wrap',
    justifyContent: 'stretch',
  },
  half: {
    flex: 1,
    padding: 4,
    flexBasis: 500,
    minHeight: 500,
  },
  paper: {
    padding: 10,
    color: theme.palette.text.secondary,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    fontSize: theme.typography.pxToRem(15),
  },
  progress: {
    position: 'absolute',
  },
  fetching: {
    alignSelf: 'center',
  },
});

class SplitScreen extends Component {
  static contextType = FirebaseContext;
  state = {
    loading: false,
    isSaving: false,
    caretPosition: { start: 0, end: 0 },
    published: false,
    content: '',
    date: '',
    datemodified: '',
    title: '',
    author: '',
    description: '',
    collection: '',
    headline: '',
    subline: '',
    layout: '',
    type: '',
    picture: '',
    attribution: '',
    alt: '',
    slug: '',
    // recipe
    ingredients: [],
    instructions: '',
    preptime: '',
    cooktime: '',
    recipeyield: '',
    servingsize: '',
    calories: '',
    fatcontent: '',
    // review
    itemtype: '',
    itemname: '',
    director: '',
    releasedate: '',
    wikipediaurl: '',
    rating: '',
    verdict: '',
    reviewbody: '',
  };

  subscribe = slug => {
    const {
      match: {
        params: { kind },
      },
    } = this.props;
    this.setState({ loading: true });
    this.firestoreUnsubscribe = this.context.firestore
      .collection(kind === 'article' ? 'articles' : 'pages')
      .doc(slug)
      .onSnapshot(snapshot => {
        this.setState({
          loading: false,
          ...(snapshot.exists ? snapshot.data() : {}),
        });
      });
  };

  componentDidMount() {
    const {
      match: {
        params: { slug },
      },
    } = this.props;
    if (slug) {
      this.subscribe(slug);
    }
  }

  componentWillUnmount() {
    // Remove database change listener
    if (this.props.match.params.slug) {
      this.firestoreUnsubscribe();
    }
  }

  onEdit = (text, caretPosition) => {
    this.setState({ content: text, caretPosition });
  };

  onCaretPosition = caretPosition => {
    this.setState({ caretPosition });
  };

  onSave = () => {
    const { caretPosition, isSaving, loading, ...contentState } = this.state;
    const {
      history,
      match: {
        params: { kind },
      },
    } = this.props;
    const { firestore } = this.context;
    this.setState(
      {
        isSaving: true,
      },
      () => {
        firestore
          .collection(kind === 'article' ? 'articles' : 'pages')
          .doc(contentState.slug)
          .set(contentState)
          .then(() => {
            this.setState({ isSaving: false });
            history.replace(
              `/editor/${kind === 'page' ? 'page/' : 'article/'}${
                contentState.slug
              }`
            );
          });
        // subscribe to slug ref if article is new
        if (!this.firestoreUnsubscribe) {
          this.subscribe(contentState.slug);
        }
      }
    );
  };

  onShortcode = shortcodeText => {
    // Get caret position, slice text till caret position, add shortcode in
    // between, append the rest of the slice and set state to new text.
    const { content, caretPosition } = this.state;
    const newText =
      content.slice(0, caretPosition.start) +
      shortcodeText +
      content.slice(caretPosition.end, content.length);
    this.setState({ content: newText });
  };

  handleFrontmatterChange = change => this.setState(change);

  validateSlug = (slug, kind) => {
    if (!slug.length) return false;

    if (kind === 'article' && /[2-9]|[1-9]\d+/.test(slug)) {
      return 'Slug breaks pagination';
    } else if (kind === 'page' && articleCollectionSlugs.includes(slug)) {
      return 'Slug equals collection name';
    }
  };

  render() {
    const {
      classes,
      match: {
        params: { slug: urlSlug, kind },
      },
    } = this.props;
    const {
      caretPosition,
      isSaving,
      loading,
      content,
      ...frontmatter
    } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.frontmatter}>
          <ExpansionPanel defaultExpanded={urlSlug ? false : true}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body1">Frontmatter</Typography>
            </ExpansionPanelSummary>
            <Divider />
            <ExpansionPanelDetails className={classes.details}>
              <FrontMatter
                {...frontmatter}
                kind={kind}
                disableSlug={!!urlSlug}
                disableCollection={!!urlSlug}
                slugError={this.validateSlug(frontmatter.slug, kind)}
                onChange={this.handleFrontmatterChange}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        <div className={classes.shortcodes}>
          <div>
            <Paper>
              <Shortcodes onShortcode={this.onShortcode} />
            </Paper>
          </div>
        </div>
        <div className={classes.container}>
          <div className={classes.half}>
            <Paper className={classes.paper}>
              <Typography
                variant="body1"
                className={classes.title}
                gutterBottom
              >
                Markdown
              </Typography>
              <Divider />

              {loading ? (
                <CircularProgress className={classes.fetching} size={60} />
              ) : (
                <Editor
                  text={content}
                  onCaretPosition={this.onCaretPosition}
                  onEdit={this.onEdit}
                />
              )}
            </Paper>
          </div>
          <div className={classes.half}>
            <Paper className={classes.paper}>
              <Typography
                variant="body1"
                gutterBottom
                className={classes.title}
              >
                Preview
              </Typography>
              <Divider />
              <Preview text={content} kind={kind} {...frontmatter} />
            </Paper>
          </div>
        </div>
        <FixedButton
          color="primary"
          onClick={this.onSave}
          disabled={isSaving}
          position="right"
        >
          <SaveIcon />
          {isSaving && (
            <CircularProgress size={60} className={classes.progress} />
          )}
        </FixedButton>
      </div>
    );
  }
}

SplitScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(SplitScreen);
