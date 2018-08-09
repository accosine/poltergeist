export default (usedShortcodes, plugins) => {
  const pluginScripts = plugins
    .filter(
      plugin =>
        plugin.shortcode &&
        plugin.shortcode.theme &&
        plugin.shortcode.theme.ampScript
    )
    .reduce(
      (acc, plugin) => ({
        [plugin.shortcode.label]: plugin.shortcode.theme.ampScript,
      }),
      {}
    );

  const scripts = {
    carousel: 'carousel',
    youtube: 'youtube',
    gif: 'anim',
    soundcloud: 'soundcloud',
    vimeo: 'vimeo',
    instagram: 'instagram',
    gfycat: 'gfycat',
    fittext: 'fit-text',
    facebook: 'facebook',
    facebookcomments: 'facebook-comments',
    pinterest: 'pinterest',
    playbuzz: 'playbuzz',
    twitter: 'twitter',
    iframe: 'iframe',
    ...pluginScripts,
  };

  return usedShortcodes
    .map(shortcode => (scripts[shortcode] ? scripts[shortcode] : false))
    .filter(Boolean);
};
