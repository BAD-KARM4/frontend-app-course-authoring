import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import PropTypes from 'prop-types';

import { Hyperlink } from '@openedx/paragon';
import { HelpSidebar } from '../../generic/help-sidebar';
import messages from './messages';
import { useHelpUrls } from '../../help-urls/hooks';

const TextbookSidebar = ({ courseId }) => {
  const intl = useIntl();
  const { textbooks: textbookUrl } = useHelpUrls(['textbooks']);

  return (
    <HelpSidebar courseId={courseId} className="pt-4">
    </HelpSidebar>
  );
};

TextbookSidebar.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default TextbookSidebar;
