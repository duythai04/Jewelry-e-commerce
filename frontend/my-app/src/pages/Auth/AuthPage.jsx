import React, { useState, useEffect, useContext } from "react";
import { X, Mail, Lock, UserPlus, Eye, EyeOff, Phone } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import "./AuthPage.scss";

const AuthPage = ({ isOpen, onClose }) => {
  const { login } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState(""); // Thêm state thông báo thành công

  // Chuyển đổi giữa Đăng nhập và Đăng ký
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccessMsg("");
    setForm({
      full_name: "",
      email: "",
      password: "",
      phone: "",
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const payload = isLogin
        ? { email: form.email, password: form.password }
        : form;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Có lỗi xảy ra");
      }

      // XỬ LÝ KHI THÀNH CÔNG
      if (isLogin) {
        // Nếu đang ở màn hình ĐĂNG NHẬP thành công
        if (data.token && data.user) {
          login(data.token, data.user);
          onClose();
        }
      } else {
        // Nếu đang ở màn hình ĐĂNG KÝ thành công
        setSuccessMsg("Đăng ký thành công! Vui lòng đăng nhập.");
        setIsLogin(true); // CHUYỂN SANG MÀN HÌNH ĐĂNG NHẬP
        setForm({ ...form, password: "" }); // Giữ lại email, xóa password cũ để an toàn
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    // Reset thông báo khi mở modal
    if (isOpen) {
      setSuccessMsg("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="auth-body">
          <div className="auth-header">
            <h3>{isLogin ? "Đăng Nhập" : "Đăng Ký"}</h3>
            <p>Chào mừng bạn đến với trang sức Chichi</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="input-group">
                  <UserPlus size={16} className="icon" />
                  <input
                    name="full_name"
                    placeholder="Họ tên của bạn"
                    value={form.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <Phone size={16} className="icon" />
                  <input
                    name="phone"
                    placeholder="Số điện thoại"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div className="input-group">
              <Mail size={16} className="icon" />
              <input
                name="email"
                type="email"
                placeholder="Địa chỉ Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <Lock size={16} className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mật khẩu"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Hiển thị lỗi */}
            {error && <p className="error-message">{error}</p>}

            {/* Hiển thị thông báo thành công */}
            {successMsg && <p className="success-message">{successMsg}</p>}

            <button className="btn-submit" disabled={loading}>
              {loading
                ? "Đang xử lý..."
                : isLogin
                  ? "ĐĂNG NHẬP"
                  : "HOÀN TẤT ĐĂNG KÝ"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản?"}
              <button type="button" onClick={toggleMode}>
                {isLogin ? "Đăng ký ngay" : "Đăng nhập ngay"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
