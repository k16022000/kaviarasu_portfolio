// eslint-disable-next-line import/prefer-default-export
const style = getComputedStyle(document.body);

export const mediaBreakpoint = {
  medium: 1200,
  bigTablet: 992,
  tablet: 768,
  mobile: 576,
};

export const colors = {
  primaryColor: `${style.primaryColor}`,
  secondaryColor: '#f22f7e',
  completedColor: '#169a48',
};
