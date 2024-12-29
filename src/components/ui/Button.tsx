import  { useRef, FC, MouseEvent } from 'react';
import './btn.css';

interface MyCustomButtonProps {
  name: string;
}

const MyCustomButton: FC<MyCustomButtonProps> = ({ name }) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const button = buttonRef.current;
    const ripple = rippleRef.current;
    if (!button || !ripple) return;

    const buttonRect = button.getBoundingClientRect();
    const leftPosition = event.clientX - buttonRect.left;
    const topPosition = event.clientY - buttonRect.top;

    ripple.style.left = `${leftPosition}px`;
    ripple.style.top = `${topPosition}px`;

    ripple.classList.add('active');

    setTimeout(() => {
      ripple.classList.remove('active');
    }, 600);
  };

  return (
    <div ref={buttonRef} onClick={handleClick} className="myButton">
      {name}
      <span ref={rippleRef} className="rippleEffect"></span>
    </div>
  );
};

export default MyCustomButton;