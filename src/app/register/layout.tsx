import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Đăng kí - ECO Shop',
  description: 'ECO Shop',
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>{children}</>
  );
}