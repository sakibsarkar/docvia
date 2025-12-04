"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PassThrough = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const error = searchParams.get("error");
  const message = searchParams.get("message");

  useEffect(() => {
    if (!error || error === "0") {
      // No error → go home
      router.replace("/");
    }
  }, [error, router]);

  if (error === "1") {
    return (
      <div>
        <h1>Google Authentication Failed</h1>
        {message && <p>{message}</p>}
      </div>
    );
  }

  // While checking params or redirecting
  return <div>loading...</div>;
};

export default PassThrough;
