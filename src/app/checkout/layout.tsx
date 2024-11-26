import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Thanh toán - ECO Shop',
  description: 'ECO Shop',
}

export default function Checkoutayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>{children}</>
  );
}