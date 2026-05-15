// AuthPage.jsx
import React, { useState, useEffect } from "react";
import { X, Mail, Lock, UserPlus, ArrowRight } from "lucide-react";
import "./AuthPage.scss";

const AuthPage = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  // Khóa cuộn trang khi mở modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Nút đóng */}
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="auth-body">
          <div className="auth-header">
            <h3>{isLogin ? "Đăng Nhập" : "Đăng Ký Thành Viên"}</h3>
            <p>Chào mừng bạn đến với thế giới trang sức Chichi</p>
          </div>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="input-group">
                <UserPlus className="icon" size={16} />
                <input type="text" placeholder="Họ và tên của bạn" required />
              </div>
            )}

            <div className="input-group">
              <Mail className="icon" size={16} />
              <input type="email" placeholder="Địa chỉ email" required />
            </div>

            <div className="input-group">
              <Lock className="icon" size={16} />
              <input type="password" placeholder="Mật khẩu" required />
            </div>

            {isLogin && (
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" /> <span>Ghi nhớ</span>
                </label>
                <a href="#" className="forgot-text">
                  Quên mật khẩu?
                </a>
              </div>
            )}

            <button className="btn-submit">
              {isLogin ? "ĐĂNG NHẬP" : "HOÀN TẤT ĐĂNG KÝ"}
              <ArrowRight size={18} style={{ marginLeft: "8px" }} />
            </button>
          </form>

          <div className="auth-divider">
            <span>Hoặc tiếp tục với</span>
          </div>

          <div className="social-login">
            <button className="social-btn google">Google</button>
            <button className="social-btn facebook">Facebook</button>
          </div>

          <div className="auth-footer">
            <p>
              {isLogin ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản?"}
              <button onClick={() => setIsLogin(!isLogin)}>
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
