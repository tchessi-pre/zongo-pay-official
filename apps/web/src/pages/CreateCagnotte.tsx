import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Wallet, Calendar, Target, Users, User } from "lucide-react";
import { toast } from "sonner";

const CreateCagnotte = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    target: "",
    type: "cagnotte",
    endDate: "",
    visibility: "private",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.target) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Simuler la création
    toast.success("Cagnotte créée avec succès !");
    navigate("/cagnottes");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/cagnottes")}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Nouvelle Cagnotte</h1>
                <p className="text-sm text-muted-foreground">Créez votre projet d'épargne</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="rounded-full"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type de cagnotte */}
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
                onValueChange={(value) => setFormData({ ...formData, type: value })}
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

          {/* Informations de base */}
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="rounded-xl pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Paramètres de confidentialité */}
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
                onValueChange={(value) => setFormData({ ...formData, visibility: value })}
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

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/cagnottes")}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button type="submit" className="flex-1">
              Créer la cagnotte
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCagnotte;
