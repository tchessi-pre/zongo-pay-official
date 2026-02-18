import { Card } from "@/components/ui/card";
import { Phone, Mail, ChevronRight } from "lucide-react";

type ProfileContact = {
  phone: string;
  email: string;
};

type ProfileContactCardProps = {
  contact: ProfileContact;
};

const ProfileContactCard = ({ contact }: ProfileContactCardProps) => {
  return (
    <Card className="p-6 shadow-card border-0">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
        Informations de contact
      </h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Phone className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Téléphone</p>
            <p className="font-semibold text-foreground">{contact.phone}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-semibold text-foreground">{contact.email}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
};

export type { ProfileContact };
export default ProfileContactCard;

