import React from 'react';
import { FormControlLabel, FormLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';

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
