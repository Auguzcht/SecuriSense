export const getIconComponent = (name) => {
  return import(`@/assets/icons/${name}.svg?react`);
};

export const getIconUrl = (name) => {
  return `/assets/icons/${name}.svg`;
};