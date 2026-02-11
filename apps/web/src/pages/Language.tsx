import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";

const Language = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("fr");

  const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="gradient-card text-white p-6 rounded-b-[2rem]">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
            className="text-white hover:bg-white/10 -ml-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Langue</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-3">
        {languages.map((lang) => (
          <Card
            key={lang.code}
            className={`p-4 flex items-center justify-between cursor-pointer border-0 shadow-soft hover:shadow-card transition-all ${selectedLanguage === lang.code ? "ring-2 ring-primary" : ""
              }`}
            onClick={() => setSelectedLanguage(lang.code)}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{lang.flag}</span>
              <span className="font-medium text-foreground">{lang.name}</span>
            </div>
            {selectedLanguage === lang.code && (
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Language;
