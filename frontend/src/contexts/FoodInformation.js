import React, { useState, createContext } from 'react';

const initialFoodState = {
  type: null,
  date: null,
  eattime: null,

  //food_be : null,

  img: [],

  foods: [],
  ingredients: [],
  request: [],
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

export { FoodContext, FoodProvider, initialFoodState };
