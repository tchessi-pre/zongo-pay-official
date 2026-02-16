import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type NameFieldsProps = {
  firstName: string;
  lastName: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
};

export const NameFields = ({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
}: NameFieldsProps) => (
  <div className="grid grid-cols-2 gap-3">
    <div className="space-y-2">
      <Label htmlFor="firstName">Prénom</Label>
      <Input
        id="firstName"
        placeholder="Prénom"
        value={firstName}
        onChange={(e) => onFirstNameChange(e.target.value)}
        required
        className="rounded-xl"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="lastName">Nom</Label>
      <Input
        id="lastName"
        placeholder="Nom"
        value={lastName}
        onChange={(e) => onLastNameChange(e.target.value)}
        required
        className="rounded-xl"
      />
    </div>
  </div>
);

