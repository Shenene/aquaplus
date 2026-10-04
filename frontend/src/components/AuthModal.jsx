import { useCallback, useEffect, useRef, useState } from "react";
import { CircleCheckBig, Eye, EyeOff, X } from "lucide-react";

import { useAuth } from "../context/authContext.js";
import "./AuthModal.css";

function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const { login, register } = useAuth();
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  const [view, setView] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [loginError, setLoginError] = useState("");

  const [registerErrors, setRegisterErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetModal = useCallback(() => {
    setView("login");

    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setRememberMe(false);

    setLoginError("");

    setRegisterErrors({
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    });

    setShowPassword(false);
    setShowConfirmPassword(false);

    setIsSubmitting(false);
  }, []);

  const handleClose = useCallback(() => {
    resetModal();
    onClose();
  }, [onClose, resetModal]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Prevent the page behind the modal from scrolling.
    const previousBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    // Remember where focus was before the modal opened.
    previouslyFocusedElementRef.current = document.activeElement;

    // Move focus into the modal.
    firstInputRef.current?.focus();

    function handleKeyDown(event) {
      // Close the modal with Escape.
      if (event.key === "Escape") {
        handleClose();
        return;
      }

      // Keep Tab focus inside the modal.
      if (event.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');

        if (focusableElements.length === 0) {
          return;
        }

        const firstElement = focusableElements[0];

        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = previousBodyOverflow;

      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen, handleClose]);

  async function handleLogin(event) {
    event.preventDefault();

    setLoginError("");
    setIsSubmitting(true);

    try {
      await login(email, password, rememberMe);

      onLoginSuccess?.();
      handleClose();
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRegister(event) {
    event.preventDefault();

    const errors = {
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    const trimmedEmail = email.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }

    if ([...password].length < 15) {
      errors.password = "Password must be at least 15 characters.";
    } else if ([...password].length > 128) {
      errors.password = "Password must be 128 characters or fewer.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setRegisterErrors(errors);

    if (errors.email || errors.password || errors.confirmPassword) {
      return;
    }

    setIsSubmitting(true);

    try {
      await register(trimmedEmail, password);

      setView("success");
    } catch (error) {
      if (error.message === "Please enter a valid email address.") {
        setRegisterErrors((current) => ({
          ...current,
          email: error.message,
        }));
      } else if (error.message === "An account with this email already exists.") {
        setRegisterErrors((current) => ({
          ...current,
          email: error.message,
        }));
      } else {
        setRegisterErrors((current) => ({
          ...current,
          general: error.message,
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="auth-modal-overlay">
      <div ref={modalRef} className={`auth-modal ${view === "success" ? "auth-modal-success" : ""}`} role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
        <button type="button" className="auth-modal-close" aria-label="Close" onClick={handleClose}>
          <X aria-hidden="true" />
        </button>

        <h2 id="auth-modal-title" className={view === "success" ? "auth-modal-title-success" : ""}>
          {view === "register" ? "Create an Account" : view === "success" ? "Welcome to AQUA+!" : "Log in"}
        </h2>

        {/* ⁡⁣⁣⁢Log in form⁡ */}
        {view === "login" && (
          <>
            <p className="auth-modal-switch">
              <span>New to AQUA+?</span>

              <button type="button" onClick={() => setView("register")}>
                Create an account
              </button>
            </p>

            <form onSubmit={handleLogin}>
              <div className="auth-field">
                <label htmlFor="login-email">Email</label>

                <input ref={firstInputRef} id="login-email" type="email" autoComplete="email" value={email} aria-invalid={Boolean(loginError)} aria-describedby={loginError ? "login-error" : undefined} onChange={(event) => setEmail(event.target.value)} required />
              </div>

              <div className="auth-field">
                <label htmlFor="login-password">Password</label>

                <div className="auth-password-field">
                  <input id="login-password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} aria-invalid={Boolean(loginError)} aria-describedby={loginError ? "login-error" : undefined} onChange={(event) => setPassword(event.target.value)} required />

                  <button type="button" className="auth-password-toggle" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((current) => !current)}>
                    {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                  </button>
                </div>
              </div>

              <label className="auth-remember">
                <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />

                <span>Remember me</span>
              </label>

              {loginError && (
                <p id="login-error" className="auth-error" role="alert">
                  {loginError}
                </p>
              )}

              <button type="submit" className="auth-primary-button" disabled={isSubmitting}>
                {isSubmitting && <span className="auth-button-spinner" aria-hidden="true" />}

                {isSubmitting ? "Logging in..." : "Log in"}
              </button>
            </form>
          </>
        )}

        {/* ⁡⁣⁣⁢Registration form⁡ */}
        {view === "register" && (
          <>
            <p className="auth-modal-switch">
              <span>Already have an account?</span>

              <button type="button" onClick={() => setView("login")}>
                Log in
              </button>
            </p>

            <form onSubmit={handleRegister} noValidate>
              <div className="auth-field">
                <label htmlFor="register-email">Email</label>

                <input ref={firstInputRef} id="register-email" type="email" autoComplete="email" value={email} aria-invalid={Boolean(registerErrors.email)} aria-describedby={registerErrors.email ? "register-email-error" : undefined} onChange={(event) => setEmail(event.target.value)} required />

                {registerErrors.email && (
                  <p id="register-email-error" className="auth-error" role="alert">
                    {registerErrors.email}
                  </p>
                )}
              </div>

              <div className="auth-field">
                <label htmlFor="register-password">Password</label>

                <div className="auth-password-field">
                  <input id="register-password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="15 or more characters" value={password} aria-invalid={Boolean(registerErrors.password)} aria-describedby={registerErrors.password ? "register-password-error" : undefined} onChange={(event) => setPassword(event.target.value)} required />

                  <button type="button" className="auth-password-toggle" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((current) => !current)}>
                    {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                  </button>
                </div>

                {registerErrors.password && (
                  <p id="register-password-error" className="auth-error" role="alert">
                    {registerErrors.password}
                  </p>
                )}
              </div>

              <div className="auth-field">
                <label htmlFor="confirm-password">Confirm password</label>

                <div className="auth-password-field">
                  <input id="confirm-password" type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" value={confirmPassword} aria-invalid={Boolean(registerErrors.confirmPassword)} aria-describedby={registerErrors.confirmPassword ? "confirm-password-error" : undefined} onChange={(event) => setConfirmPassword(event.target.value)} required />

                  <button type="button" className="auth-password-toggle" aria-label={showConfirmPassword ? "Hide password" : "Show password"} onClick={() => setShowConfirmPassword((current) => !current)}>
                    {showConfirmPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                  </button>
                </div>

                {registerErrors.confirmPassword && (
                  <p id="confirm-password-error" className="auth-error" role="alert">
                    {registerErrors.confirmPassword}
                  </p>
                )}
              </div>

              {registerErrors.general && (
                <p className="auth-error" role="alert">
                  {registerErrors.general}
                </p>
              )}

              <button type="submit" className="auth-primary-button" disabled={isSubmitting}>
                {isSubmitting && <span className="auth-button-spinner" aria-hidden="true" />}

                {isSubmitting ? "Creating account..." : "Create Account"}
              </button>
            </form>
          </>
        )}

        {/* ⁡⁣⁣⁢Account created success⁡ */}
        {view === "success" && (
          <div className="auth-success" role="status">
            <CircleCheckBig className="auth-success-icon" aria-hidden="true" />

            <p>Your account has been created. You're now logged in.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
