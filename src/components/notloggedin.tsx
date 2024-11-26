/* eslint-disable @next/next/no-img-element */
export default function NotLoggedInPage() {
  return (
    <>
      <main className="relative isolate min-h-full">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <p className="text-base font-semibold leading-8 text-white">Bạn chưa đăng nhập</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Vui lòng đăng nhập hoặc đăng ký
          </h1>
          <p className="mt-4 text-base text-white/70 sm:mt-6">
            Để tiếp tục trải nghiệm dịch vụ của chúng tôi, vui lòng đăng nhập hoặc tạo một tài khoản mới.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a href="/login" className="inline-block px-4 py-2 text-sm font-semibold leading-7 text-white bg-indigo-600 rounded hover:bg-indigo-700">
              Đăng Nhập
            </a>
            <a href="/register" className="inline-block px-4 py-2 text-sm font-semibold leading-7 text-white bg-green-600 rounded hover:bg-green-700">
              Đăng Ký
            </a>
          </div>
          <div className="mt-10 flex justify-center">
            <a href="/" className="text-sm font-semibold leading-7 text-white">
              <span aria-hidden="true">&larr;</span> Trở về trang chủ
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
