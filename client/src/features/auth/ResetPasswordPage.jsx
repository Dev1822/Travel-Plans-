import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { authApi } from "../../services/api/authApi";
import { useAuth } from "../../context/AuthContext";
import { getErrorMessage } from "../../services/api/client";
import FormField from "../../components/FormField";
import Button from "../../components/Button";
import { Lock, CheckCircle, AlertCircle } from "lucide-react";

export const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { refreshProfile } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Missing or invalid password reset token.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters and include 1 uppercase, 1 lowercase, 1 number, and 1 special symbol.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.resetPassword(token, { password });
      if (res.data?.token) {
        localStorage.setItem("packgo_token", res.data.token);
        if (res.data.user) {
          localStorage.setItem("packgo_user", JSON.stringify(res.data.user));
        }
        await refreshProfile();
      }
      setSuccess(true);
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Failed to reset password. Link may have expired.",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF9F8] flex flex-col justify-center py-24 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 rounded bg-[#1C1B1B] text-[#FCF9F8] flex items-center justify-center font-serif text-lg font-bold">
            P
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#1C1B1B]">
            PackGo
          </span>
        </Link>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1B]">
          Set New Password
        </h2>
        <p className="mt-2 text-xs text-[#54433A] font-sans">
          Choose a secure, strong password for your PackGo account.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-[#FFFFFF] py-8 px-6 sm:px-10 border border-[#DAC2B6] rounded-md shadow-sm">
          {success ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-[#CDEACE] text-[#2E4632] flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1C1B1B] mb-2">
                Password Updated
              </h3>
              <p className="text-xs text-[#54433A] leading-relaxed mb-6">
                Your password has been successfully reset. You are now logged
                in.
              </p>
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => navigate("/my-journey")}
              >
                Go to My Journeys
              </Button>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-4 rounded bg-[#FFDAD6]/40 border border-[#BA1A1A]/30 flex items-start space-x-3 text-xs text-[#BA1A1A]">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <FormField
                  label="New Password"
                  name="password"
                  type="password"
                  icon={Lock}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  helperText="Min. 8 chars (upper, lower, number, special)"
                  required
                />

                <FormField
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  icon={Lock}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />

                <Button
                  type="submit"
                  variant="terracotta"
                  size="md"
                  loading={loading}
                  className="w-full mt-4"
                >
                  Update Password
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
