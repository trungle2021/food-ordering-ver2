import  { ReactNode } from 'react'
import { Link } from 'react-router-dom';

type SectionProps = {
    sectionName: string,
    viewAllLink: string,
    children: ReactNode
}

export const Section = ({sectionName, viewAllLink, children}: SectionProps) => {
    return (
        <div className="section">
          <div className="section__header">
            <h1 className="section__title">{sectionName}</h1>
            <Link to={viewAllLink}>View All</Link>
          </div>
          {children}
        </div>
      );
}


