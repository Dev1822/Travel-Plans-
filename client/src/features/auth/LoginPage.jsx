import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getErrorMessage } from "../../services/api/client";
import FormField from "../../components/FormField";
import Button from "../../components/Button";
import { Lock, Mail, AlertCircle, Sparkles } from "lucide-react";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/my-journey";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Invalid credentials. Please check and try again.",
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
          Return to Your Journey
        </h2>
        <p className="mt-2 text-xs text-[#54433A] font-sans">
          Log in to access your planned itineraries and travel tools.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-[#FFFFFF] py-8 px-6 sm:px-10 border border-[#DAC2B6] rounded-md shadow-sm">
          {error && (
            <div className="mb-6 p-4 rounded bg-[#FFDAD6]/40 border border-[#BA1A1A]/30 flex items-start space-x-3 text-xs text-[#BA1A1A]">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Email Address"
              name="email"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. ananya@example.com"
              required
              autoComplete="email"
            />

            <div>
              <FormField
                label="Password"
                name="password"
                type="password"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <div className="flex justify-end mt-2">
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-[#6C2F00] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              className="w-full mt-2"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E5E2E1] text-center">
            <p className="text-xs text-[#54433A]">
              Don't have an account yet?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#6C2F00] hover:underline ml-1"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
