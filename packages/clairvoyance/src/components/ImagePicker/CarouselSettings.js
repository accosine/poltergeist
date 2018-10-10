import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

export default ({ carouselSettings, onCarouselSettings }) => (
  <div>
    <FormLabel component="legend">Carousel settings</FormLabel>
    <FormControlLabel
      control={
        <Switch
          checked={carouselSettings.autoplay}
          onChange={(event, value) =>
            onCarouselSettings({ ...carouselSettings, autoplay: value })
          }
        />
      }
      label="Autoplay"
    />
    {carouselSettings.autoplay ? (
      <TextField
        label="Autoplay delay"
        type="number"
        value={carouselSettings.delay}
        onChange={event =>
          onCarouselSettings({ ...carouselSettings, delay: event.target.value })
        }
      />
    ) : null}
    <FormControlLabel
      control={
        <Switch
          checked={carouselSettings.controls}
          onChange={(event, value) =>
            onCarouselSettings({ ...carouselSettings, controls: value })
          }
        />
      }
      label="Controls"
    />
    <FormControlLabel
      control={
        <Switch
          checked={carouselSettings.loop}
          onChange={(event, value) =>
            onCarouselSettings({ ...carouselSettings, loop: value })
          }
        />
      }
      label="Loop"
    />
  </div>
);
