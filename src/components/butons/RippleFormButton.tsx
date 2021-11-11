import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { animate } from "motion";

interface RippleButtonProps {
  width: number;
  height: number;
  backgroundColor: string;
  rippleColor: string;
  labelColor: string;
  buttonType: "button" | "submit";
}

interface RipplePosition {
  top: number;
  left: number;
}

interface ButtonMeasurements {
  diameter: number;
  offsetTop: number;
  offsetLeft: number;
}

const RippleButton = styled.button`
  position: relative;
  padding: 12px 24px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: var(--button-label-color, #f8f8f8);
  background-color: var(--button-background-color, #6200ee);
  border: none;
  border-radius: 12px;
  width: 100%;
  max-width: var(--button-width);
  height: var(--button-height, 50px);
  box-shadow: 0 0 0.5rem hsla(240, 0%, 0%, 0.3);
  cursor: pointer;
  transition: background-color 400ms;
  overflow: hidden;
`;

const Ripple = styled.span`
  position: absolute;
  top: var(--ripple-top, 0);
  left: var(--ripple-left, 0);
  background-color: var(--ripple-background-color, hsla(184, 80%, 60%, 0.6));
  border-radius: 50%;
  width: var(--ripple-diameter);
  height: var(--ripple-diameter);
  transform: scale(0);
`;

export const RippleFormButton: React.FC<RippleButtonProps> = ({
  width,
  height,
  backgroundColor,
  rippleColor,
  labelColor,
  buttonType,
  children,
}) => {
  const [buttonMeasurements, setButtonMeasurements] =
    useState<ButtonMeasurements>({
      diameter: 0,
      offsetTop: 0,
      offsetLeft: 0,
    });
  const [ripplePosition, setRipplePosition] = useState<RipplePosition>({
    top: 0,
    left: 0,
  });

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const rippleRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const button = buttonRef.current;
    let ripple = rippleRef.current;

    if (ripple) {
      ripple = null;
    }

    if (button) {
      const width = button.clientWidth;
      const height = button.clientHeight;
      const diameter = Math.max(width, height);
      const offsetTop = button.offsetTop;
      const offsetLeft = button.offsetLeft;
      setButtonMeasurements({
        diameter,
        offsetTop,
        offsetLeft,
      });
    }
  }, []);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const ripple = rippleRef.current;

    const { offsetLeft, offsetTop, diameter } = buttonMeasurements;
    const radius = diameter / 2;

    const rippleTop = e.clientY - (offsetTop + radius);
    const rippleLeft = e.clientX - (offsetLeft + radius);

    setRipplePosition({
      top: rippleTop,
      left: rippleLeft,
    });

    if (ripple) {
      animate(
        ripple,
        {
          scale: 4,
          opacity: 0,
        },
        {
          duration: 0.68,
          easing: "linear",
        }
      ).finished.then(() => {
        animate(ripple, {
          scale: 0,
        }).finished.then(() => {
          animate(ripple, { opacity: 1 });
        });
      });
    }
  };

  const styles = {
    "--button-width": `${width}px`,
    "--button-height": `${height}px`,
    "--button-background-color": `${backgroundColor}`,
    "--ripple-background-color": `${rippleColor}`,
    "--button-label-color": `${labelColor}`,
    "--ripple-diameter": `${buttonMeasurements.diameter}px`,
    "--ripple-top": `${ripplePosition.top}px`,
    "--ripple-left": `${ripplePosition.left}px`,
  } as React.CSSProperties;

  return (
    <RippleButton
      style={styles}
      ref={buttonRef}
      type={buttonType}
      onMouseDown={handleButtonClick}
    >
      {children}
      <Ripple ref={rippleRef} />
    </RippleButton>
  );
};
