import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Giỏ hàng - ECO Shop',
  description: 'ECO Shop',
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>{children}</>
  );
}