import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/header/Header";
import LanguageSelector from "@/components/language/LanguageSelector";

const Language = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("fr");

  const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇬🇧" }
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header title="Langue" variant="gradient" onBack={() => navigate("/profile")} />

      <LanguageSelector
        languages={languages}
        value={selectedLanguage}
        onChange={setSelectedLanguage}
        className="px-6 py-6 space-y-3"
      />
    </div>
  );
};

export default Language;
