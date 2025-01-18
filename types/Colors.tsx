export interface Colors {
  foreground: string;
  background: string;
  text: string;
  primary: string;
  tabColor: string;
  searchInputColor: string;
}

export const LightColors: Colors = {
  foreground: "#484848",
  background: "#fefefe",
  text: "#363636",
  primary: "#B03B48",
  tabColor: "#B03B48",
  searchInputColor: "#f2f2f2",
};

export const DarkColors: Colors = {
  foreground: "#fefefe",
  background: "#161616",
  text: "#fafafa",
  primary: "#B03B48",
  tabColor: "#161616",
  searchInputColor: "#242424",
};
