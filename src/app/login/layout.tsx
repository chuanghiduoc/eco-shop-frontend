import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Đăng nhập - ECO Shop',
  description: 'ECO Shop',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>{children}</>
  );
}