import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin: ${({ margin }) => margin}px 0;
`;

const Text = styled.Text`
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Customtext = ({ text, fontSize = 20, margin = 10 }) => {
  return (
    <Container margin={margin}>
      <Text fontSize={fontSize}>{text}</Text>
    </Container>
  );
};

Customtext.propTypes = {
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  margin: PropTypes.number,
};

export default Customtext;
