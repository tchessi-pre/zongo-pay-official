import LanguageCard from "./LanguageCard";

type Language = {
  code: string;
  name: string;
  flag: string;
};

type LanguageSelectorProps = {
  languages: Language[];
  value: string;
  onChange: (code: string) => void;
  className?: string;
};

const LanguageSelector = ({ languages, value, onChange, className = "space-y-3" }: LanguageSelectorProps) => {
  return (
    <div className={className}>
      {languages.map((lang) => (
        <LanguageCard
          key={lang.code}
          code={lang.code}
          name={lang.name}
          flag={lang.flag}
          selected={value === lang.code}
          onSelect={onChange}
        />
      ))}
    </div>
  );
};

export default LanguageSelector;

