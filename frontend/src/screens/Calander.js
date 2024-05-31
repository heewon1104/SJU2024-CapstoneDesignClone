import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import { FoodCalender, MealTypeListItem, LoadingModal } from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { IP_ADDRESS } from '../secret/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding-top: 20px;
`;

const Calander = ({ navigation }) => {
  const theme = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const [markedDates, setMarkedDates] = useState({});
  const [oldSelectedDay, setOldSelectedDay] = useState(null);
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const day = `0${today.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  });
  const [isLoading, setIsLoading] = useState(false);

  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: [],
  });

  const mealTypeToKorean = {
    breakfast: '아침',
    lunch: '점심',
    dinner: '저녁',
    snack: '간식',
  };

  const updateFoodsData = async () => {
    setIsLoading(true);
    const url = `http://${IP_ADDRESS}:8080/api/calendar/${selectedDay}`;
    const token = await AsyncStorage.getItem('TOKENADDRESS');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json(); // JSON 형식으로 데이터를 추출합니다.
        console.log(responseData.data);
        processFoodData(responseData.data);
        processFoodListData(responseData.data);
      } else {
        const errorData = await response.json(); // 오류 응답도 JSON으로 추출할 수 있습니다.
        console.error('AnalysisFood failed:', errorData);
      }
    } catch (error) {
      console.error('Network or other error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const processFoodData = (data) => {
    const newMarkedDates = { ...markedDates };
    data.forEach((entry) => {
      const [year, month, day] = entry.intakeTime.split('T')[0].split('-');
      const dateString = `${year}-${month}-${day}`;

      const mealDot = {
        key: entry.dietType.toLowerCase(),
        color: theme[entry.dietType.toLowerCase()],
      };

      if (newMarkedDates[dateString]) {
        const existingTypes = newMarkedDates[dateString].dots || [];
        if (!existingTypes.some((dot) => dot.key === mealDot.key)) {
          newMarkedDates[dateString].dots = [...existingTypes, mealDot];
        }
      } else {
        newMarkedDates[dateString] = { dots: [mealDot], selected: false };
      }
    });

    if (newMarkedDates[selectedDay]) {
      newMarkedDates[selectedDay].selected = true;
      newMarkedDates[selectedDay].selectedColor = theme.selectedColor;
    } else {
      newMarkedDates[selectedDay] = {
        selected: true,
        selectedColor: theme.selectedColor,
      };
    }

    setMarkedDates(newMarkedDates);
  };

  const updateMarkedDates = () => {
    const updatedMarkedDates = { ...markedDates };
    if (oldSelectedDay) {
      delete updatedMarkedDates[oldSelectedDay].selected;
      delete updatedMarkedDates[oldSelectedDay].selectedColor;
    }
    updatedMarkedDates[selectedDay] = {
      ...updatedMarkedDates[selectedDay],
      selected: true,
      selectedColor: theme.selectedColor,
    };
    setMarkedDates(updatedMarkedDates);
    setOldSelectedDay(selectedDay);
  };

  const processFoodListData = (data) => {
    const newMeals = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    };

    const mealEntries = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    };

    data.forEach((entry) => {
      const [year, month, day] = entry.intakeTime.split('T')[0].split('-');
      const date = `${year}-${month}-${day}`;

      if (date === selectedDay) {
        const mealType = entry.dietType.toLowerCase();
        mealEntries[mealType].push(entry.food);
      }
    });

    Object.keys(mealEntries).forEach((mealType) => {
      const title = mealTypeToKorean[mealType];
      if (mealEntries[mealType].length > 0) {
        const foodsList = mealEntries[mealType].join(', ');
        newMeals[mealType].push({
          title: title,
          foods: foodsList,
        });
      } else {
        newMeals[mealType].push({
          title: title,
          foods: '기록하여 음식을 추가해주세요',
        });
      }
    });

    setMeals(newMeals);
  };

  useFocusEffect(
    React.useCallback(() => {
      updateFoodsData();
      updateMarkedDates();
      console.log('selectedDay : ', selectedDay);
    }, [selectedDay])
  );

  return (
    <Container insets={insets}>
      <LoadingModal
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      ></LoadingModal>

      <FoodCalender
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        markedDates={markedDates}
        onMonthChange={(month) => {
          const newSelectedDay = `${month.year}-${month.month
            .toString()
            .padStart(2, '0')}-01`;
          setSelectedDay(newSelectedDay);
        }}
      ></FoodCalender>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {Object.keys(meals).map((mealType) =>
          meals[mealType].map((meal, index) => (
            <MealTypeListItem
              key={`${mealType}-${index}`}
              title={meal.title}
              foodtype={meal.foods}
              //calorie="100" // Placeholder calorie value
              color={theme[mealType]}
            ></MealTypeListItem>
          ))
        )}
      </ScrollView>
    </Container>
  );
};
export default Calander;
