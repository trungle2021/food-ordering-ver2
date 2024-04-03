import { Link } from "react-router-dom";

type SectionProps = {
  sectionName: string;
  viewAllLink: string;
  content: React.ReactNode;
};

export const Section = ({
  sectionName,
  viewAllLink,
  content,
}: SectionProps) => {
  return (
    <div className="section">
      <div className="section__header">
        <h1 className="section__title">{sectionName}</h1>
        <Link to={viewAllLink}>View All</Link>
      </div>
      {content}
    </div>
  );
};
