import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/Send";
import Receive from "./pages/Receive";
import Scan from "./pages/Scan";
import Cagnottes from "./pages/Cagnottes";
import CreateCagnotte from "./pages/CreateCagnotte";
import CagnotteDetails from "./pages/CagnotteDetails";
import InviteParticipants from "./pages/InviteParticipants";
import ContributeToPool from "./pages/ContributeToPool";
import Profile from "./pages/Profile";
import PaymentMethods from "./pages/PaymentMethods";
import Security from "./pages/Security";
import Language from "./pages/Language";
import Help from "./pages/Help";
import HelpDetail from "./pages/HelpDetail";
import Support from "./pages/Support";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PWAInstallPrompt />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard />
          </ProtectedRoute>} />
          <Route path="/send" element={<ProtectedRoute><SendMoney /></ProtectedRoute>} />
          <Route path="/receive" element={<ProtectedRoute><Receive /></ProtectedRoute>} />
          <Route path="/scan" element={<ProtectedRoute><Scan /></ProtectedRoute>} />
          <Route path="/cagnottes" element={<ProtectedRoute><Cagnottes /></ProtectedRoute>} />
          <Route path="/cagnottes/new" element={<ProtectedRoute><CreateCagnotte /></ProtectedRoute>} />
          <Route path="/cagnottes/:id" element={<ProtectedRoute><CagnotteDetails /></ProtectedRoute>} />
          <Route path="/cagnottes/:id/invite" element={<ProtectedRoute><InviteParticipants /></ProtectedRoute>} />
          <Route path="/cagnottes/:id/contribute" element={<ProtectedRoute><ContributeToPool /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/payment-methods" element={<ProtectedRoute><PaymentMethods /></ProtectedRoute>} />
          <Route path="/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
          <Route path="/language" element={<ProtectedRoute><Language /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
          <Route path="/help/:category" element={<ProtectedRoute><HelpDetail /></ProtectedRoute>} />
          <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
          <Route path="/terms" element={<ProtectedRoute><Terms /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
