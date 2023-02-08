import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const MAX_LAYERS = 2;

const pulse = keyframes`
  0%,10% {
    opacity: 0;
    transform: scale(1.1);
  }
  80% {
    opacity: 0.7;
    transform: scale(1.15,1.4);
  }
  81%, 100% {
    opacity: 0;
    transform: scale(1);
  }
`;

const Scale = keyframes`
  0% {
    transform: scale(1);
  }
  35%, 80% {
    transform: scale(1.1,1.35);
  }
  100% {
    transform: scale(1);
  }
`;

const Pulse = styled.div`
  animation: ${({ layer }) => (layer ? pulse : Scale)} 1.5s infinite;
  background: white;
  border-radius: 32px;
  border: 1px solid ${({ color }) => color};
  height: ${({ layer = 0, height }) => height + layer * 8}px;
  position: absolute;
  width: ${({ layer = 0, width }) => width + layer * 8}px;
  z-index: ${({ layer = 0 }) => MAX_LAYERS - layer};
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 150px;
  position: relative;
`;

const Container = styled.div`
  z-index: ${MAX_LAYERS + 1};
`;

const Pulsating = ({ children, visible, ...other }) => {
    return (
        <Wrapper>
            <Container>{children}</Container>
            {visible &&
            Array.from(Array(MAX_LAYERS).keys()).map((key) => (
                <Pulse key={key} layer={key} {...other} />
            ))}
        </Wrapper>
    );
};

Pulsating.propTypes = {
    children: PropTypes.element,
    color: PropTypes.string,
    height: PropTypes.number,
    visible: PropTypes.bool,
    width: PropTypes.number
};

Pulsating.defaultProps = {
    children: null,
    color: "#FFE896",
    height: 32,
    visible: false,
    width: 132
};

export default Pulsating;
