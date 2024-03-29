//입력 예외처리 파일

//정규표현식으로 이메일 유효성 검사
export const validateEmail = (email) => {
  const regex =
    /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;

  return regex.test(email);
};

//입력시 공백 제거
export const removeWhitespace = (text) => {
  const regex = /\s/g;
  return text.replace(regex, '');
};
