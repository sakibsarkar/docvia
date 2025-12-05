function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`animate-pulse rounded bg-gray-200 ${className || ""}`} {...props} />;
}

export default Skeleton;
