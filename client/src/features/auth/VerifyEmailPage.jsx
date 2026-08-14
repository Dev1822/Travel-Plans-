import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { authApi } from "../../services/api/authApi";
import { getErrorMessage } from "../../services/api/client";
import Button from "../../components/Button";
import { CheckCircle, AlertCircle, Loader2, ArrowRight } from "lucide-react";

export const VerifyEmailPage = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setLoading(false);
        setSuccess(false);
        setMessage("Invalid or missing verification token.");
        return;
      }

      try {
        const res = await authApi.verifyEmail(token);
        setSuccess(true);
        setMessage(
          res.data?.msg || "Your email address has been verified successfully.",
        );
      } catch (err) {
        setSuccess(false);
        setMessage(
          getErrorMessage(err, "Verification link is invalid or expired."),
        );
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#FCF9F8] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-md w-full text-center bg-[#FFFFFF] p-8 sm:p-10 border border-[#DAC2B6] rounded shadow-sm">
        {loading ? (
          <div className="py-12">
            <Loader2 className="w-10 h-10 text-[#6C2F00] animate-spin mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-[#1C1B1B]">
              Verifying Your Address...
            </h2>
            <p className="text-xs text-[#54433A] mt-2">
              Validating your security token with the sanctuary.
            </p>
          </div>
        ) : success ? (
          <div>
            <div className="w-16 h-16 rounded-full bg-[#CDEACE] text-[#2E4632] flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2E4632] block mb-2">
              Verification Complete
            </span>

            <h1 className="font-serif text-3xl font-bold text-[#1C1B1B] mb-3">
              Email Verified
            </h1>

            <p className="text-xs sm:text-sm text-[#54433A] leading-relaxed mb-8">
              {message} You may now sign in and start planning your travel
              itineraries.
            </p>

            <Link to="/login">
              <Button variant="primary" size="md" className="w-full">
                <span>Sign In Now</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="w-16 h-16 rounded-full bg-[#FFDAD6] text-[#BA1A1A] flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#BA1A1A] block mb-2">
              Verification Issue
            </span>

            <h1 className="font-serif text-3xl font-bold text-[#1C1B1B] mb-3">
              Unable to Verify
            </h1>

            <p className="text-xs sm:text-sm text-[#BA1A1A] leading-relaxed mb-8">
              {message}
            </p>

            <div className="space-y-3">
              <Link to="/register">
                <Button variant="terracotta" size="md" className="w-full">
                  Create New Account
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="md" className="w-full">
                  Return to Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
