import React, {useState, useEffect} from "react";
import './App.css';
import Product from "../Product/Product";
import CurrencyToggle from "../CurrencyToggle/CurrencyToggle";
import backpack from '../../Images/backpack.svg'
import laptop from '../../Images/laptop.svg'
import watch from '../../Images/watch.svg'
import {renderIfElse} from "../../Utils/helper";


function App() {
    const [currencyType, setCurrencyType] = useState('INR');
    const [exchangeRate, setExchangeRate] = useState(0);
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (currencyType === 'USD') {
            setLoader(true)
            updateExchangeRate();
        }
    }, [currencyType])

    useEffect(() => {
        setLoader(true)
        updateExchangeRate();
    }, [])

    const updateExchangeRate = () => fetch('https://v6.exchangerate-api.com/v6/b0d201ad0af3e7e92615880c/latest/INR')
        .then(response => response.json())
        .then(data => {
            setExchangeRate(data.conversion_rates.USD)
            setLoader(false)
        })
        .catch(err => {
            setExchangeRate(0)
            setLoader(false)
        })


    const getRate = (inrValue) => ((currencyType === 'USD') && exchangeRate) ? (inrValue*exchangeRate).toFixed(2)+'$' : 'Rs.'+inrValue.toFixed(2);

    const products = [
        {
            id: 1,
            imgSource: backpack,
            caption: 'BackPack',
            rate: 3000
        },
        {
            id: 2,
            imgSource: laptop,
            caption: 'Laptop',
            rate: 40000
        },
        {
            id: 3,
            imgSource: watch,
            caption: 'Watch',
            rate: 1000
        },
    ]

    return (
        <div className="App">
            {renderIfElse(() => loader, () => (
                <div className="loader">Loading...</div>
            ), () => (
                <div className="App-body">
                    <div className="App-body__product-list">
                        {products.map(product => <Product key={product.id} imgSource={product.imgSource} caption={product.caption} rate={getRate(product.rate)}/>)}
                    </div>
                    {exchangeRate ? <CurrencyToggle currencyTypeUpdater={setCurrencyType} defaultValue={currencyType}/> : ''}
                </div>
            ))}
        </div>
    );
}

export default App;
