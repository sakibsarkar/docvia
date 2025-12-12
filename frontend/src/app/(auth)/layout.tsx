const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[500px]">{children}</div>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-[20px] h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-[20px] bottom-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>
    </div>
  );
};

export default AuthLayout;
