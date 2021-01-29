const el = document.createElement('style');
el.type = 'text/css';

const head = document.querySelector('head');
head && head.appendChild(el);

export const setGlobalStyles = (newStyles: string) => {
  el.innerHTML = newStyles;
};
