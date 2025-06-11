"use client";
import Fetch from "@/utils/axios";
import { useEffect, useState } from "react";
const { useRouter } = require("next/navigation");

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const [isAccess, setIsAccess] = useState(null);

  useEffect(() => {
    Fetch.patch("/auth")
      .then(() => setIsAccess(true))
      .catch(() => router.replace("/auth"));
  }, []);

  return isAccess && children;
};

export default AuthGuard;
