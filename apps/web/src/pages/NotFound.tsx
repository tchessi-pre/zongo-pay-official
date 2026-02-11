import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import zongoLogo from "@/assets/zongo-logo.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
      <div className="text-center space-y-6 animate-fade-in">
        <img src={zongoLogo} alt="Zongo Pay" className="h-16 mx-auto" />
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-bold text-foreground">Page introuvable</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>
        <Button onClick={() => window.location.href = "/"} size="lg" variant="gradient">
          <Home className="mr-2 w-5 h-5" />
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
