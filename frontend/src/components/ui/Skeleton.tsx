function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`animate-pulse rounded bg-foreground/80 ${className || ""}`} {...props} />;
}

export default Skeleton;
