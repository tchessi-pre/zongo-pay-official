import { Button } from "@/components/ui/button";

type CagnotteActionsProps = {
  onContribute: () => void;
  onInvite: () => void;
};

const CagnotteActions = ({ onContribute, onInvite }: CagnotteActionsProps) => {
  return (
    <div className="space-y-3 pt-2">
      <Button className="w-full" size="lg" variant="default" onClick={onContribute}>
        Contribuer maintenant
      </Button>
      <Button className="w-full" size="lg" variant="outline" onClick={onInvite}>
        Inviter des participants
      </Button>
    </div>
  );
};

export default CagnotteActions;

