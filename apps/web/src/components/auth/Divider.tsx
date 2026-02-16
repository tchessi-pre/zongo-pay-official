type DividerProps = {
  label?: string;
};

export const Divider = ({ label = "ou" }: DividerProps) => (
  <div className="relative my-2">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t border-muted" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-card px-2 text-muted-foreground">{label}</span>
    </div>
  </div>
);

