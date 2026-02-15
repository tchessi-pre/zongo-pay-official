import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type HeaderProps = {
  title?: string;
  variant?: "gradient" | "plain";
  onBack?: () => void;
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  children?: ReactNode;
  profileImageUrl?: string;
  profileInitials?: string;
  onProfileClick?: () => void;
};

export default function Header({
  title,
  variant = "gradient",
  onBack,
  left,
  right,
  className,
  containerClassName,
  titleClassName,
  children,
  profileImageUrl,
  profileInitials,
  onProfileClick,
}: HeaderProps) {
  const isGradient = variant === "gradient";
  const containerBase = isGradient
    ? "gradient-card text-white p-6 rounded-b-[2rem]"
    : "p-6";
  const backBtnClass = isGradient
    ? "text-white hover:bg-white/10 -ml-2"
    : "hover:bg-muted -ml-2";
  const titleClass = cn(
    isGradient ? "text-xl font-bold" : "text-xl font-bold text-foreground",
    titleClassName
  );

  const finalContainerClass = containerClassName ?? cn(containerBase, className);

  return (
    <div className={finalContainerClass}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {left ? (
            left
          ) : onBack ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className={backBtnClass}
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
          ) : null}
          {title ? <h1 className={titleClass}>{title}</h1> : null}
        </div>
        {right ? (
          <div className="ml-auto">{right}</div>
        ) : profileImageUrl !== undefined || profileInitials ? (
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={onProfileClick}
              className={isGradient ? "hover:bg-white/10" : "hover:bg-muted"}
            >
              <Avatar className={cn("h-9 w-9", isGradient ? "border-2 border-white/30" : "")}>
                <AvatarImage src={profileImageUrl} alt="Profil" />
                <AvatarFallback>
                  {(profileInitials || "U").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>
        ) : null}
      </div>
      {children}
    </div>
  );
}

