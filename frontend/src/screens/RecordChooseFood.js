import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import {
  Input,
  ErrorMessage,
  Customtext,
  Button,
  Genderradiobuttoncontiner,
  FoodRadiobuttonContainer,
} from '../components';

import { View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SelectList } from 'react-native-dropdown-select-list';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 20px;
`;
const GUIDE_TEXT1 = `음식 종류 선택`;
const GUIDE_TEXT2 = `날짜 및 식사 종류 선택`;

const RecordChooseFood = ({ navigation }) => {
  const [foodType, setFoodType] = useState('');
  const [date, setDate] = useState('');
  const [eatTime, setEatTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const data = [
    { key: '1', value: '아침식사' },
    { key: '2', value: '점심식사' },
    { key: '3', value: '저녁식사' },
    { key: '4', value: '간식' },
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (day) => {
    const dateString = day.toLocaleDateString(); // 날짜를 'MM/dd/yyyy' 포맷으로 변환
    setDate(dateString); // 상태 업데이트
    console.log(dateString); // 디버깅을 위해 로그 출력
    hideDatePicker();
  };

  useEffect(() => {
    setDisabled(!(foodType && date && eatTime && !errorMessage));
  }, [foodType, date, eatTime, errorMessage]);

  useEffect(() => {
    let error = '';
    if (!foodType) {
      error = '음식 종류를 선택해주세요';
    } else if (!date) {
      error = '날짜를 선택해주세요';
    } else if (!eatTime) {
      error = '식사 시간을 선택해주세요';
    } else {
      error = '';
    }

    setErrorMessage(error);
  }, [foodType, date, eatTime]);

  const _handleSignupBtnPress = () => {
    console.log(foodType, date, eatTime);
  };

  return (
    <Container>
      <Customtext text={GUIDE_TEXT1}></Customtext>
      <FoodRadiobuttonContainer
        foodType={foodType}
        setFoodType={setFoodType}
      ></FoodRadiobuttonContainer>
      <Customtext text={GUIDE_TEXT2}></Customtext>

      <Customtext text={date}></Customtext>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <SelectList
        setSelected={(val) => setEatTime(val)}
        data={data}
        save="value"
        search={false}
        boxStyles={{ width: 300 }}
        maxHeight={100}
      />
      <ErrorMessage message={errorMessage}></ErrorMessage>
      <Button
        title="다음"
        onPress={_handleSignupBtnPress}
        disabled={disabled}
      ></Button>
    </Container>
  );
};
export default RecordChooseFood;
