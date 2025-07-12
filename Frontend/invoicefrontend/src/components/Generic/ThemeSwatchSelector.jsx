import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ThemeSwatchSelector = ({ themes, currentTheme, setTheme }) => {
  return (
    <Wrapper>
      <Label>Theme:</Label>
      <SwatchList>
        {themes.map((theme) => (
          <Swatch
            key={theme.name}
            as={motion.div}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            title={theme.name}
            style={{
              backgroundColor: theme.primaryColor,
              border: currentTheme?.name === theme.name ? "2px solid #111" : "2px solid #fff",
            }}
            onClick={() => setTheme(theme)}
          />
        ))}
      </SwatchList>
    </Wrapper>
  );
};

export default ThemeSwatchSelector;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const Label = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #374151;
`;

const SwatchList = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Swatch = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 0 2px rgba(0,0,0,0.05);
`;
