import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadRecipeButton from '../DownloadRecepieButton';

type Ingredient = {
  name: string;
  measure?: string;
};

type Recipe = {
  title: string;
  ingredients: Ingredient[];
  instructions: string;
};

type ExpandableSectionProps = {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  recipe?: Recipe;
};

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  children,
  defaultExpanded = false,
  recipe,
}) => {
  return (
    <Accordion defaultExpanded={defaultExpanded} sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${title}-content`}
        id={`${title}-header`}
      >
        <Typography variant="subtitle1" fontWeight={600}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
        {recipe && (
          <div style={{ marginTop: '1rem' }}>
            <DownloadRecipeButton recipe={recipe} />
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default ExpandableSection;
