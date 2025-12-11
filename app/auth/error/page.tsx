"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";

const errorMessages: Record<string, string> = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The verification token has expired or has already been used.",
  Default: "An unexpected error occurred.",
};

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Default";
  const errorMessage = errorMessages[error] || errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gold-50 via-white to-silver-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center mb-4"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </motion.div>

        <div>
          <h1 className="text-3xl font-serif font-bold text-navy-900 mb-2">
            Authentication Error
          </h1>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          
          {error === "Configuration" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-yellow-800">
                <strong>Possible causes:</strong>
              </p>
              <ul className="text-sm text-yellow-700 mt-2 list-disc list-inside space-y-1">
                <li>NEXTAUTH_SECRET is not set in .env</li>
                <li>NEXTAUTH_URL is incorrect</li>
                <li>Database connection issue</li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signin">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 py-3 bg-navy-900 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Sign In</span>
            </motion.button>
          </Link>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 py-3 bg-white text-navy-900 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow border-2 border-navy-900 flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </motion.button>
          </Link>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Error code: <code className="bg-gray-100 px-2 py-1 rounded">{error}</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}

