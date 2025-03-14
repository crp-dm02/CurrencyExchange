import { useState } from "react";
import { registerUser } from "./api";
import { useNavigate } from "react-router-dom";
import "./index.css";  // Импортируем стили

export default function Register() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            alert("Регистрация успешна!");
            navigate("/converter");
        } catch (error) {
            alert("Ошибка регистрации!");
        }
    };

    return (
        <div className="register-container">
            <div className="form-card">
                <h2 className="form-title">Зарегистрироваться</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <input
                        type="text"
                        name="username"
                        placeholder="Логин"
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <button type="submit" className="submit-btn">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
}
