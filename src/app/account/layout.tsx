import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Tài khoản - ECO Shop',
  description: 'ECO Shop',
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>{children}</>
  );
}