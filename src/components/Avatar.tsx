type AvatarSize = "sm" | "md" | "lg";
type AvatarVariant = "violet" | "blue";

interface AvatarProps {
  size?: AvatarSize;
  src?: string;
  alt?: string;
  initials?: string;
  variant?: AvatarVariant;
  className?: string;
}

const variantClasses: Record<AvatarVariant, string> = {
  violet: "bg-gradient-to-br from-violet-600 to-indigo-600 ring-violet-500/30",
  blue: "bg-gradient-to-br from-blue-600 to-cyan-600 ring-blue-500/30",
};

const sizeClasses: Record<AvatarSize, string> = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
};

export function Avatar({
  size = "md",
  src,
  alt = "Profile",
  initials = "KA",
  variant = "violet",
  className = "",
}: AvatarProps) {
  return (
    <div
      className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full overflow-hidden flex items-center justify-center font-bold text-white shadow-lg ring-2 ${className}`.trim()}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
