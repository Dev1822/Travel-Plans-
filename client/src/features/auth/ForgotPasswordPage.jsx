import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authApi } from "../../services/api/authApi";
import { getErrorMessage } from "../../services/api/client";
import FormField from "../../components/FormField";
import Button from "../../components/Button";
import { Mail, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your registered email address.");
      return;
    }

    setLoading(true);
    try {
      await authApi.forgotPassword({ email: email.trim() });
      setSubmitted(true);
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Failed to send reset link. Please check your email.",
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
          Reset Password
        </h2>
        <p className="mt-2 text-xs text-[#54433A] font-sans">
          Enter your email to receive password recovery instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-[#FFFFFF] py-8 px-6 sm:px-10 border border-[#DAC2B6] rounded-md shadow-sm">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-[#CDEACE] text-[#2E4632] flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1C1B1B] mb-2">
                Recovery Link Dispatched
              </h3>
              <p className="text-xs text-[#54433A] leading-relaxed mb-6">
                If an account exists for <strong>{email}</strong>, you will
                receive a password reset link shortly (valid for 10 minutes).
              </p>
              <Link to="/login">
                <Button variant="outline" size="sm" className="w-full">
                  Return to Login
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-4 rounded bg-[#FFDAD6]/40 border border-[#BA1A1A]/30 flex items-start space-x-3 text-xs text-[#BA1A1A]">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                  label="Registered Email Address"
                  name="email"
                  type="email"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ananya@example.com"
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={loading}
                  className="w-full"
                >
                  Send Recovery Link
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center text-xs font-semibold text-[#6C2F00] hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
