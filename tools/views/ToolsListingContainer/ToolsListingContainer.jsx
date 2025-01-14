import { Grid, Typography } from '@mui/material';
import { TOOLS_ID } from '@/tools/libs/constants/tools';

import styles from './styles';

import ToolCard, { ToolCardSkeleton } from '@/tools/components/ToolCard';

const DEFAULT_TOOLS = new Array(8)
  .fill()
  .map((_, index) => ({ id: index + 1 }));

/**
 * Renders the Tools Listings component.
 *
 * @param {object} props - The props object containing data and the category.
 * @param {object} props.data - The data to be rendered.
 * @param {object} props.category - The category of the tools.
 * @return {JSX.Element} The rendered Tools Listings component.
 */
const ToolsListingContainer = (props) => {
  const { data, loading, category } = props;

  const renderTitle = () => {
    return (
      <Grid {...styles.headerGridProps}>
        <Typography {...styles.categoryTitleProps}>
          {category} {data && `(${data?.length})`}
        </Typography>
      </Grid>
    );
  };

  const renderCards = () => {
    const sortedTools = [...(data || [])].sort((a, b) => {
      const aInToolsId = Object.values(TOOLS_ID).includes(a.id);
      const bInToolsId = Object.values(TOOLS_ID).includes(b.id);
      
      if (aInToolsId && !bInToolsId) return -1;
      if (!aInToolsId && bInToolsId) return 1;
      return 0;
    });

    return (
      <Grid {...styles.containerGridProps}>
        <Grid {...styles.innerListGridProps}>
          {sortedTools?.map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </Grid>
      </Grid>
    );
  };

  const renderLoader = () => {
    return (
      <Grid {...styles.containerGridProps}>
        <Grid {...styles.innerListGridProps}>
          {DEFAULT_TOOLS?.map((tool) => (
            <ToolCardSkeleton key={tool.id} />
          ))}
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {loading ? renderLoader() : renderCards()}
    </Grid>
  );
};

export default ToolsListingContainer;
