import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Plus, Users, TrendingUp, User } from "lucide-react";

const Cagnottes = () => {
  const navigate = useNavigate();

  const cagnottes = [
    {
      id: 1,
      name: "Vacances à Grand-Bassam",
      target: 500000,
      current: 325000,
      participants: 8,
      color: "gradient-card",
    },
    {
      id: 2,
      name: "Cadeau d'anniversaire Kofi",
      target: 150000,
      current: 145000,
      participants: 12,
      color: "gradient-success",
    },
    {
      id: 3,
      name: "Projet associatif",
      target: 1000000,
      current: 420000,
      participants: 25,
      color: "bg-primary",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 gradient-card text-white p-6 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-2xl font-bold">Mes Cagnottes</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
            className="text-white hover:bg-white/10"
          >
            <User className="w-6 h-6" />
          </Button>
        </div>

        <p className="text-white/90">Épargnez ensemble pour vos projets communs</p>
      </div>

      {/* Cagnottes list */}
      <div className="p-6 space-y-4 animate-fade-in">
        {cagnottes.map((cagnotte) => {
          const progress = (cagnotte.current / cagnotte.target) * 100;

          return (
            <Card
              key={cagnotte.id}
              className="p-6 shadow-card border-0 hover:shadow-button transition-shadow cursor-pointer"
              onClick={() => navigate(`/cagnottes/${cagnotte.id}`)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">{cagnotte.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{cagnotte.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{progress.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
                <div className={`w-12 h-12 ${cagnotte.color} rounded-2xl flex items-center justify-center shadow-soft`}>
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-foreground">
                    {cagnotte.current.toLocaleString("fr-FR")} F CFA
                  </span>
                  <span className="text-muted-foreground">
                    sur {cagnotte.target.toLocaleString("fr-FR")} F CFA
                  </span>
                </div>
              </div>
            </Card>
          );
        })}

        {/* Create new cagnotte */}
        <Button
          onClick={() => navigate("/cagnottes/new")}
          variant="gradient"
          className="w-full"
          size="lg"
        >
          <Plus className="mr-2 w-5 h-5" />
          Créer une cagnotte
        </Button>
      </div>
    </div>
  );
};

export default Cagnottes;
