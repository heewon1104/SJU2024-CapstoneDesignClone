import React, { useState, createContext } from 'react';

const initialFoodState = {
  type: null,
  date: null,
  eattime: null,

  img: [],
<<<<<<< HEAD

  foods: ['잡채'],
  ingredients: [],
  request: [
    {
      dietType: 'DINNER',
      koreanOrAll: 'ALL',
      intakeTime: '2024-04-12T08:49:45.123',
      food: '메밀 국수_생것',
      ingredients: ['후추', '기름', '설탕'],
      amount: 32,
    },
    {
      dietType: 'DINNER',
      koreanOrAll: 'ALL',
      intakeTime: '2024-04-12T08:49:45.123',
      food: '감자_수미_찐것',
      ingredients: ['후추', '기름', '설탕'],
      amount: 32,
    },
  ],
  amount: null,
=======
>>>>>>> parent of 44a05ae0 ([IN-68] 음식 분석, 기록 페이지 구현 및 API 연결)
};

const FoodContext = createContext({
  food: { ...initialFoodState },
  setFood: () => {},
});

const FoodProvider = ({ children }) => {
  const [food, setFood] = useState({ ...initialFoodState });

  const updateFoodInfo = (updates) => {
    setFood((prevFood) => ({
      ...prevFood,
      ...updates,
    }));
  };

  return (
    <FoodContext.Provider value={{ food, setFood: updateFoodInfo }}>
      {children}
    </FoodContext.Provider>
  );
};

export { FoodContext, FoodProvider };
