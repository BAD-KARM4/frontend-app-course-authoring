import React from 'react';
import PropTypes from 'prop-types';
import { Hyperlink } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { HelpSidebar } from '../../generic/help-sidebar';
import { useHelpUrls } from '../../help-urls/hooks';
import { getFormattedSidebarMessages } from './utils';

const OutlineSideBar = ({ courseId }) => {
  const intl = useIntl();
  const {
    visibility: learnMoreVisibilityUrl,
    grading: learnMoreGradingUrl,
    outline: learnMoreOutlineUrl,
  } = useHelpUrls(['visibility', 'grading', 'outline']);

  const sidebarMessages = getFormattedSidebarMessages(
    {
      learnMoreGradingUrl,
      learnMoreOutlineUrl,
      learnMoreVisibilityUrl,
    },
    intl,
  );


};

OutlineSideBar.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default OutlineSideBar;
