import React, { useState, createContext } from 'react';

const initialFoodState = {
  type: null,
  date: null,
  eattime: null,

  img: [],

  foods: [],
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
