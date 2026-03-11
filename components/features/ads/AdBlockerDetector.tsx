"use client";

import { useEffect, useState } from "react";

export default function AdBlockerDetector() {
  const [adBlockEnabled, setAdBlockEnabled] = useState(false);

  useEffect(() => {
    // Create a test ad element
    const testAd = document.createElement('div');
    testAd.className = 'adsbygoogle';
    testAd.style.display = 'none';
    document.body.appendChild(testAd);

    // Check if ad is blocked
    setTimeout(() => {
     const isBlocked = testAd.offsetHeight === 0;
      setAdBlockEnabled(isBlocked);
      testAd.remove();
    }, 100);
  }, []);

  if (!adBlockEnabled) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm">
            Please consider disabling your ad blocker to support TinyLink.
          </p>
        </div>
      </div>
    </div>
  );
}

