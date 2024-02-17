"use client";
import NavbarAdmin from "@/components/NavbarAdmin";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Admin = () => {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user && userProfile.role === "user") {
      router.push("/");
    }
  }, [user, userProfile, router]);
  return (
    <div className="flex justify-center items-center h-screen">
      <NavbarAdmin />
      <div className="flex flex-col items-center">
        <Image
          src={"/assets/logo.png"}
          width={1000 / 2}
          height={1125 / 4}
          alt="Logo"
        />
        <h1 className="text-3xl">Welcome To Admin Page</h1>
      </div>
    </div>
  );
};

export default Admin;
