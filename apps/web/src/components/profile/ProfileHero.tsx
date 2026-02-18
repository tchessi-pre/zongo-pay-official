import { useRef, useState, ChangeEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Star } from "lucide-react";

type ProfileInfo = {
  name: string;
  joinDate: string;
  accountLevel: string;
};

type ProfileHeroProps = {
  profileInfo: ProfileInfo;
};

const ProfileHero = ({ profileInfo }: ProfileHeroProps) => {
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return url;
    });
  };

  const initials = profileInfo.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="text-center space-y-3">
      <div className="relative inline-block">
        <Avatar className="w-28 h-28 border-4 border-white shadow-lg overflow-hidden">
          <AvatarImage
            src={photoUrl ?? ""}
            alt={profileInfo.name}
            className="w-full h-full object-cover"
          />
          <AvatarFallback className="bg-white/20 text-white text-3xl font-bold backdrop-blur-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <button
          type="button"
          onClick={handlePickImage}
          className="absolute bottom-0 right-0 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-card hover:scale-105 transition-transform"
        >
          <Camera className="w-4 h-4 text-primary" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold">{profileInfo.name}</h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            <span className="text-sm font-medium">{profileInfo.accountLevel}</span>
          </div>
        </div>
        <p className=" text-sm mt-2">Membre depuis {profileInfo.joinDate}</p>
      </div>
    </div>
  );
};

export type { ProfileInfo };
export default ProfileHero;
