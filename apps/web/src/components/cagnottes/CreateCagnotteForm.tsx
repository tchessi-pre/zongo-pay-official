import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, Calendar, Target, Users } from "lucide-react";

export type CreateCagnotteFormData = {
  name: string;
  description: string;
  target: string;
  type: string;
  endDate: string;
  visibility: string;
};

type CreateCagnotteFormProps = {
  formData: CreateCagnotteFormData;
  onChange: (data: CreateCagnotteFormData) => void;
  onSubmit: (event: React.FormEvent) => void;
  onCancel: () => void;
};

const CreateCagnotteForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
}: CreateCagnotteFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Type de cagnotte
          </CardTitle>
          <CardDescription>Choisissez le type d'épargne collective</CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={formData.type}
            onValueChange={(value) => onChange({ ...formData, type: value })}
          >
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Sélectionnez un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cagnotte">Cagnotte simple</SelectItem>
              <SelectItem value="tontine">Tontine rotative</SelectItem>
              <SelectItem value="epargne">Épargne collective</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Informations
          </CardTitle>
          <CardDescription>Décrivez votre projet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom de la cagnotte *</Label>
            <Input
              id="name"
              placeholder="Ex: Voyage de groupe"
              value={formData.name}
              onChange={(e) => onChange({ ...formData, name: e.target.value })}
              required
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Décrivez l'objectif de votre cagnotte..."
              value={formData.description}
              onChange={(e) => onChange({ ...formData, description: e.target.value })}
              rows={4}
              className="rounded-xl resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target">Objectif (FCFA) *</Label>
            <Input
              id="target"
              type="number"
              placeholder="100000"
              value={formData.target}
              onChange={(e) => onChange({ ...formData, target: e.target.value })}
              required
              min="1000"
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">Date de fin</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => onChange({ ...formData, endDate: e.target.value })}
                className="rounded-xl pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Visibilité
          </CardTitle>
          <CardDescription>Qui peut voir et rejoindre cette cagnotte</CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={formData.visibility}
            onValueChange={(value) => onChange({ ...formData, visibility: value })}
          >
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Sélectionnez la visibilité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private">Privée - Sur invitation uniquement</SelectItem>
              <SelectItem value="public">Publique - Tout le monde peut rejoindre</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Annuler
        </Button>
        <Button type="submit" className="flex-1">
          Créer la cagnotte
        </Button>
      </div>
    </form>
  );
};

export default CreateCagnotteForm;

