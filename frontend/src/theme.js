//프로젝트에서 사용되는 색상 정리

const Colors = {
  white: '#ffffff',
  black: '#111111',
  main: '#5DB075',
  darkgreen: '#129575',
  grey_0: '#d5d5d5',
  grey_1: '#E0E0E0',
  grey_2: '#F3F3F3',
  grey_3: '#a6a6a6',
  grey_4: '#474747',
  yellow: '#F1C21B',
  blue: '#0043CE',
  red_0: '#F85B64',
  red_1: '#DA1E28',
};

export const theme = {
  background: Colors.white,
  text: Colors.black,
  errorText: Colors.red_0,

  //Loading
  loadingPageBackground: Colors.main,

  // Button
  btnBackground: Colors.main,
  btnTitle: Colors.white,
  btnTextLink: Colors.main,

  // Input
  inputBackground: Colors.white,
  inputLabel: Colors.grey_1,
  inputPlaceholder: Colors.grey_1,
  inputBorder: Colors.grey_1,

  // Customcard
  cardBackground: Colors.grey_2,
  cardimgBackGround: Colors.white,
  cardTitle: Colors.black,
};
