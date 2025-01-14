import { useEffect } from 'react';

import { ArrowBack } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import TOOL_OUTPUTS from './outputs';
import styles from './styles';

import ROUTES from '@/libs/constants/routes';

import theme from '@/libs/theme/theme';
import { actions as ToolActions } from '@/tools/data';
import ToolForm from '@/tools/views/ToolFormView';

const { resetCommunicator } = ToolActions;

/**
 * The ToolPage component renders the ToolPage component,
 * which displays a tool's details and allows interaction
 * through an accordion interface. It uses the AccordionInputGroupItem component
 * to display the tool's name and description, along with a response. This form
 * can be toggled open or closed by dispatching an action to update the state.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.toolDoc - The document containing tool information.
 * @param {boolean} props.formOpen - Indicates if the form is open.
 * @param {string} props.response - The response to display within the form.
 *
 * @return {JSX.Element} Returns the ToolPage component.
 */
const ToolPage = (props) => {
  const { toolDoc } = props;
  const router = useRouter();
  const dispatch = useDispatch();

  const { response, formOpen } = useSelector((state) => state.tools);

  const { id } = toolDoc;

  useEffect(() => {
    return () => {
      dispatch(resetCommunicator());
    };
  }, []);

  const handleRoute = () => router.push(ROUTES.HOME);

  const renderBackButton = () => {
    return (
      <Grid {...styles.backButtonGridProps}>
        <GradientOutlinedButton
          bgcolor="#24272F"
          icon={<ArrowBack />}
          textColor="#AC92FF"
          iconPlacement="left"
          onHoverTextColor={theme.palette.Background.white2}
          clickHandler={handleRoute}
          text="Back"
          {...styles.outlinedButtonProps}
        />
      </Grid>
    );
  };

  const ToolOutputComponent = TOOL_OUTPUTS[id];

  return (
    <Grid {...styles.mainGridProps}>
      {renderBackButton()}
      <ToolForm toolDoc={toolDoc} formOpen={formOpen} response={response} />
      {!formOpen && response && <ToolOutputComponent />}
    </Grid>
  );
};
export default ToolPage;
