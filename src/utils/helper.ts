export const decodeHtml = (html: string): string => {
  if (!html) {
    return '';
  }
  const entities: {[key: string]: string} = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x2F;': '/',
    '&nbsp;': ' ',
    '&hellip;': '…',
  };
  return html.replace(/&[^\s;]+;/g, entity => {
    return entities[entity] || entity;
  });
};
