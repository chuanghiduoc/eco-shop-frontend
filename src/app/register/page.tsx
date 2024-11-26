/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validatePassword } from "@/utils/validation";
import AlertCustom from "@/components/alerts";
import { getCookie } from "cookies-next";
import { apiRegister } from "@/services/user";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" | null }>({ message: "", type: null });
  const getAccessToken = getCookie('accessToken');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { valid, message } = validatePassword(password, confirmPassword);
    if (!valid) {
      setAlert({ message, type: "error" });
      return;
    }

    try {
      const response = await apiRegister({ name, email, password });

      if (response.status === 201) {
        setAlert({ message: "Đăng ký thành công!", type: "success" });
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setAlert({
        message: (error as any).response?.data?.details || "Đã xảy ra lỗi trong quá trình đăng ký.",
        type: "error",
      });
      console.error("Registration error:", error);
    }
  };

  const handleDismiss = () => {
    setAlert({ message: "", type: null });
  };

  useEffect(() => {
    if (getAccessToken) {
      window.location.href = '/';
    }
  }, [getAccessToken]);
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <form className="mx-auto grid w-[350px] gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Đăng kí</h1>
            <p className="text-balance text-muted-foreground">
              Nhập thông tin của bạn vào ô dưới đây để đăng kí tài khoản của bạn
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Họ tên</Label>
              <Input
                id="name"
                type="text"
                placeholder="Nguyễn Văn A"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              Đăng kí
            </Button>
            <Button variant="outline" className="w-full">
              Đăng kí bằng Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Đăng nhập
            </Link>
          </div>
        </form>
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
