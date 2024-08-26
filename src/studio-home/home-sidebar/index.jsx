import React from 'react';
import { useSelector } from 'react-redux';
import { MailtoLink } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { COURSE_CREATOR_STATES } from '../../constants';
import { useHelpUrls } from '../../help-urls/hooks';
import { HelpSidebar, HelpSidebarLink } from '../../generic/help-sidebar';
import { getStudioHomeData } from '../data/selectors';
import messages from './messages';

const HomeSidebar = () => {
  const intl = useIntl();
  const {
    studioName,
    platformName,
    studioShortName,
    studioRequestEmail,
    techSupportEmail,
    courseCreatorStatus,
  } = useSelector(getStudioHomeData);
  const { home: aboutHomeLink } = useHelpUrls(['home']);

  // eslint-disable-next-line max-len
  const isShowMailToGetInstruction = courseCreatorStatus === COURSE_CREATOR_STATES.disallowedForThisSite
    && !!studioRequestEmail;
  const isShowUnrequestedInstruction = courseCreatorStatus === COURSE_CREATOR_STATES.unrequested;
  const isShowDeniedInstruction = courseCreatorStatus === COURSE_CREATOR_STATES.denied;

  return (
    <HelpSidebar>
      <h4 className="help-sidebar-about-title">
        Это заголовок
      </h4>
      <p className="help-sidebar-about-descriptions">
        Это текст под ним, а ниже должна быть ссылка.
      </p>
      <HelpSidebarLink
        as="span"
        pathToPage={aboutHomeLink || ''}
        title={intl.formatMessage(messages.studioHomeLinkToGettingStarted, { studioName })}
      />
      
    </HelpSidebar>
  );
};

export default HomeSidebar;
