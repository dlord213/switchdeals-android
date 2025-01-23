// props interface for the Colors which will be used in the theme of the app
export interface Colors {
  foreground: string;
  background: string;
  text: string;
  primary: string;
  tabColor: string;
  searchInputColor: string;
}

// pre-defined colors for light system theme
export const LightColors: Colors = {
  foreground: "#484848",
  background: "#fefefe",
  text: "#363636",
  primary: "#B03B48",
  tabColor: "#B03B48",
  searchInputColor: "#f2f2f2",
};

// pre-defined colors for dark system theme
export const DarkColors: Colors = {
  foreground: "#fefefe",
  background: "#161616",
  text: "#fafafa",
  primary: "#B03B48",
  tabColor: "#161616",
  searchInputColor: "#242424",
};
