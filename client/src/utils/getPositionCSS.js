const getPositionCSS = (pos) => {
  Object.entries(pos)
    .map(([key, value]) =>
      ['top', 'left', 'right', 'bottom'].includes(key)
        ? `${key}: ${value};`
        : '',
    )
    .join('');
};

export default getPositionCSS;
