import type { ElementType } from "react";
import DocumentCard from "./DocumentCard";

type DocumentItem = {
  icon: ElementType;
  label: string;
  description: string;
};

type DocumentListProps = {
  documents: DocumentItem[];
  className?: string;
};

const DocumentList = ({ documents, className = "space-y-3" }: DocumentListProps) => {
  return (
    <div className={className}>
      {documents.map((d) => (
        <DocumentCard key={d.label} icon={d.icon} label={d.label} description={d.description} />
      ))}
    </div>
  );
};

export default DocumentList;

