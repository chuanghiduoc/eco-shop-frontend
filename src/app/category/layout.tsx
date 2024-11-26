import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Danh mục sản phẩm- ECO Shop',
  description: 'ECO Shop',
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>{children}</>
  );
}