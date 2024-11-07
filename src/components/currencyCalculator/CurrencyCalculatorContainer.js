import React from "react";
import BankRateCurrencyCalculator from "./BankRateCurrencyCalculator";
import MarketRateCurrencyCalculator from "./MarketRateCurrencyCalculator";
import './CurrencyCalculator.css'

const CurrencyCalculatorContainer = () => {
    return (
        <>
            <div className="calculator-container">
                <BankRateCurrencyCalculator/>
                <MarketRateCurrencyCalculator/>
            </div>

            <div className="source-info">
                <p>Currency rates provided by <a href="https://api.nbp.pl/" target="_blank" rel="noopener noreferrer">National
                    Bank of Poland (NBP)</a>.</p>
            </div>
        </>
    )
        ;
};

export default CurrencyCalculatorContainer;