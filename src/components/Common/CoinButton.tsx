import React from 'react';
import './CoinButton.css'; // Import the CSS file for the button styling

interface CoinButtonProps {
    text: string;
    onClick: (event:any) => void;
}

const Button: React.FC<CoinButtonProps> = ({text, onClick}) => {
    return (
        <button className="coin-button" onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
