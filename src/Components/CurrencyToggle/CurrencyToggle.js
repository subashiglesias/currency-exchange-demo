import './CurrencyToggle.css'

const CurrencyToggle = ({currencyTypeUpdater, defaultValue}) => (
    <div className="currency-toggle">
        <p>currency</p>
        <select onChange={(e) => currencyTypeUpdater(e.target.value)} defaultValue={defaultValue}>
            <option key='1' value="INR">INR</option>
            <option key='2' value="USD">USD</option>
        </select>
    </div>
)

export default CurrencyToggle