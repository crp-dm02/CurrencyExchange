import { useState } from "react";
import { loginUser, registerUser } from "./api";
import { useNavigate } from "react-router-dom";
import "./index.css";  // Импортируем стили

export default function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            console.log("Полученный токен:", response.data);
            localStorage.setItem("token", response.data);
            navigate("/converter");
        } catch (error) {
            alert("Ошибка входа!");
        }
    };

    const handleRegisterSubmit = async (e) => {
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
                <h2 className="form-title">Войти</h2>
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
                    <button type="submit" className="submit-btn">Войти</button>
                </form>

                <form onSubmit={handleRegisterSubmit} className="register-form">
                    <button type="submit" className="submit-btn">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
}
