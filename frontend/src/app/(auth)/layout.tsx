const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-10 rounded-2xl border border-gray-200 bg-white px-10 py-12">
        <div className="w-[400px]">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
