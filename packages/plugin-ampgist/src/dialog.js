import React, { Fragment } from 'react';

export default ({ Text, TextInput, Switch }) => ({
  Content: ({ settings, onSettingsChange }) => (
    <Fragment>
      <Text>
        You must provide the actual height of the gist, and you can find this on
        the gist page by inspecting the element with developer tools (e.g.
        Chrome Dev Tools).
      </Text>
      <TextInput
        label="ID"
        value={settings.id || ''}
        onChange={event => onSettingsChange('id', event.target.value)}
      />
      <TextInput
        label="Height"
        value={settings.height || ''}
        onChange={event => onSettingsChange('height', event.target.value)}
      />
      <TextInput
        label="File name"
        value={settings.file || ''}
        onChange={event => onSettingsChange('file', event.target.value)}
      />
    </Fragment>
  ),
  onInsert: ({ id, height, file }) =>
    `[gist id=${id} height=${height}${file ? ` file="${file}"` : ''}]`,
  isValid: settings => settings.id && settings.height,
});
