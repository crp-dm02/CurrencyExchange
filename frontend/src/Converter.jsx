import { useState } from "react";
import { getCurrencyExchange } from "./api";
import "./index.css";  // Импортируем стили

export default function Converter() {
    const [baseCurrency, setBaseCurrency] = useState("USD");
    const [targetCurrency, setTargetCurrency] = useState("RUB");
    const [amount, setAmount] = useState(1);
    const [data, setData] = useState(null);

    const fetchExchangeRate = async () => {
        const token = localStorage.getItem("token"); // Получаем актуальный токен
        if (!token) {
            alert("Вы не авторизованы! Войдите в систему.");
            return;
        }

        try {
            const response = await getCurrencyExchange(token, baseCurrency, targetCurrency, amount);
            console.log("Полученный ответ:", response); // Лог правильного ответа
            setData(response.data);
        } catch (error) {
            console.error("Ошибка получения данных:", error); // Теперь ошибка корректно логируется
            alert(error.response?.data?.detail || "Ошибка получения данных");
        }
    };

    return (
        <div className="converter-container">
            <h2>Конвертер валют</h2>

            <div className="currency-selection">
                <select 
                    value={baseCurrency} 
                    onChange={(e) => setBaseCurrency(e.target.value)} 
                    className="currency-dropdown"
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="RUB">RUB</option>
                </select>
                <span className="icon">↔</span> {/* Иконка вместо текста "to" */}
                <select 
                    value={targetCurrency} 
                    onChange={(e) => setTargetCurrency(e.target.value)} 
                    className="currency-dropdown"
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="RUB">RUB</option>
                </select>
            </div>

            <div className="amount-container">
                <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    min="0.01"
                    step="0.01"
                    placeholder="Введите сумму"
                    className="amount-input"
                />
            </div>

            <button onClick={fetchExchangeRate} className="convert-btn">Конвертировать</button>

            {data && (
                <div className="result">
                    <p className="converted-amount">{data.amount} {data.base_currency} = {data.converted_amount} {data.target_currency}</p>
                    <p className="exchange-rate">Текущий курс: {data.exchange_rate}</p>
                </div>
            )}
        </div>
    );
}
