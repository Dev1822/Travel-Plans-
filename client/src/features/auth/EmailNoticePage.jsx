import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import Button from "../../components/Button";

export const EmailNoticePage = () => {
  const location = useLocation();
  const email = location.state?.email || "your registered email";

  return (
    <div className="min-h-screen bg-[#FCF9F8] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-md w-full text-center bg-[#FFFFFF] p-8 sm:p-10 border border-[#DAC2B6] rounded shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#FFDBC9] text-[#6C2F00] flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6C2F00] block mb-2">
          Account Created
        </span>

        <h1 className="font-serif text-3xl font-bold text-[#1C1B1B] mb-3">
          Check Your Inbox
        </h1>

        <p className="text-xs sm:text-sm text-[#54433A] leading-relaxed mb-6">
          We have dispatched an activation link to <strong>{email}</strong>.
          Please click the link in your email to verify your address before
          logging in.
        </p>

        <div className="p-4 bg-[#F6F3F2] rounded border border-[#E5E2E1] text-xs text-[#877369] mb-8 text-left">
          <p className="font-semibold text-[#1C1B1B] mb-1">
            Didn't receive the dispatch?
          </p>
          <p>
            Please check your Spam or Junk folder. The verification token is
            valid for 24 hours.
          </p>
        </div>

        <Link to="/login">
          <Button variant="primary" size="md" className="w-full">
            <span>Proceed to Login</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmailNoticePage;
