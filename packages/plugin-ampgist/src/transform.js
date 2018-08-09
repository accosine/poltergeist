export default (str, { id, height, file }) => `
<div>
  <amp-gist
    data-gistid="${id}"
    layout="fixed-height"
    height="${height}">
    ${file ? `data-file="${file}hi.c"` : ''}
  </amp-gist>
</div>
`;
