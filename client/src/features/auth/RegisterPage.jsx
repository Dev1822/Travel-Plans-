import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getErrorMessage } from "../../services/api/client";
import FormField from "../../components/FormField";
import Button from "../../components/Button";
import { User, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pass);
  };

  const validateName = (name) => {
    return /^[A-Za-z\s]+$/.test(name) && name.trim().length >= 2;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!validateName(name)) {
      setError("Name must contain only letters and be at least 2 characters.");
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
      const res = await register(name.trim(), email.trim(), password);
      navigate("/check-email", {
        state: { email: email.trim(), message: res.msg },
      });
    } catch (err) {
      setError(
        getErrorMessage(err, "Failed to create account. Please try again."),
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
          Begin Your Odyssey
        </h2>
        <p className="mt-2 text-xs text-[#54433A] font-sans">
          Create your account to start planning custom Indian travel journeys.
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              label="Full Name"
              name="name"
              icon={User}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Vikramaditya Singh"
              helperText="Letters and spaces only (min. 2 characters)"
              required
            />

            <FormField
              label="Email Address"
              name="email"
              type="email"
              icon={Mail}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="e.g. vikram@example.com"
              required
            />

            <FormField
              label="Password"
              name="password"
              type="password"
              icon={Lock}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••"
              helperText="Min. 8 chars (upper, lower, number, special)"
              required
            />

            <FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              icon={Lock}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
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
              Create Account
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E5E2E1] text-center">
            <p className="text-xs text-[#54433A]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#6C2F00] hover:underline ml-1"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
