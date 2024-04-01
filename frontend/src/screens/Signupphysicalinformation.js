import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { Button, Input, ErrorMessage, Customtext } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { removeWhitespace } from '../utils';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 20px;
`;

const GUIDE_TEXT = `***님의 
신체정보를 알려주세요`;

const Signupphysicalinformation = ({ navigation }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const refWeight = useRef(null);
  const refBmi = useRef(null);
  const refDidmount = useRef(null);

  useEffect(() => {
    setDisabled(!(height && weight && bmi && !errorMessage));
  }, [height && weight && bmi && errorMessage]);

  useEffect(() => {
    if (refDidmount.current) {
      let error = '';
      if (!height) {
        error = '키를 입력해주세요';
      } else if (!weight) {
        error = '몸무게를 입력해주세요';
      } else if (!bmi) {
        error = 'Bmi 수치를 입력해주세요';
      } else {
        error = '';
      }
      setErrorMessage(error);
    } else {
      refDidmount.current = true;
    }
  }, [height, weight, bmi]);

  const _handleSignupBtnPress = () => {
    console.log('tmp');
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Customtext text={GUIDE_TEXT}></Customtext>
        <Input
          label="키"
          placeholder="Height"
          returnKeyType="next"
          value={height}
          onChangeText={setHeight}
          onSubmitEditing={() => refWeight.current.focus()}
          onBlur={() => setHeight(removeWhitespace(height))}
          maxLength={12}
        ></Input>
        <Input
          ref={refWeight}
          label="몸무게"
          placeholder="Weight"
          returnKeyType="next"
          value={weight}
          onChangeText={setWeight}
          onSubmitEditing={() => refBmi.current.focus()}
          onBlur={() => setWeight(removeWhitespace(weight))}
        ></Input>
        <Input
          ref={refBmi}
          label="BMI"
          placeholder="BMI"
          returnKeyType="done"
          value={bmi}
          onChangeText={setBmi}
          onSubmitEditing={_handleSignupBtnPress}
          onBlur={() => setBmi(removeWhitespace(bmi))}
        ></Input>
        <ErrorMessage message={errorMessage}></ErrorMessage>
        <Button
          title="다음"
          onPress={_handleSignupBtnPress}
          disabled={disabled}
        ></Button>
      </Container>
    </KeyboardAwareScrollView>
  );
};
export default Signupphysicalinformation;
