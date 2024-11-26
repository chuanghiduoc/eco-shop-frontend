/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { setCookie, getCookie } from "cookies-next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AlertCustom from "@/components/alerts";
import { apiLogin } from "@/services/user";
import { useDispatch } from "react-redux";
import { login } from "@/store/userSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });
  const getAccessToken = getCookie("accessToken");
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await apiLogin({
        email,
        password,
      });

      if (response.status === 200) {
        const { accessToken, refreshToken, user } = response.data.data;

        // Store tokens in cookies
        setCookie("accessToken", accessToken, { maxAge: 60 * 0.5 });

        setCookie("refreshToken", refreshToken, { 
          maxAge: 60 * 60 * 24 * 7,
        });

        // Dispatch the login action to Redux
        dispatch(login({ userInfor: user }));

        setAlert({ message: "Đăng nhập thành công!", type: "success" });
      }
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      setAlert({
        message:
          (error as any).response?.data?.details ||
          "Đã xảy ra lỗi trong quá trình đăng nhập.",
        type: "error",
      });
      console.error("Login error:", error);
    }
  };

  const handleDismiss = () => {
    setAlert({ message: "", type: null });
  };

  useEffect(() => {
    if (getAccessToken) {
      window.location.href = "/";
    }
  }, [getAccessToken]);

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Đăng nhập</h1>
            <p className="text-balance text-muted-foreground">
              Nhập email của bạn dưới đây để đăng nhập vào tài khoản của bạn
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleLogin}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ecoshop@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mật khẩu</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Bạn quên mật khẩu?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {alert.message && alert.type && (
              <AlertCustom
                message={alert.message}
                status={alert.type}
                onDismiss={handleDismiss}
              />
            )}
            <Button type="submit" className="w-full">
              Đăng nhập
            </Button>
            <Button variant="outline" className="w-full">
              Đăng nhập bằng Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Bạn chưa có tài khoản?{" "}
            <Link href="/register" className="underline">
              Đăng kí
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://ui.shadcn.com/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
