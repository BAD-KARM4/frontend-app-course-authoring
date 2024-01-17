import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { AppProvider } from '@edx/frontend-platform/react';
import { initializeMockApp } from '@edx/frontend-platform';
import MockAdapter from 'axios-mock-adapter';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import initializeStore from '../store';
import { courseTeamMock, courseTeamWithOneUser, courseTeamWithoutUsers } from './__mocks__';
import { getCourseTeamApiUrl, updateCourseTeamUserApiUrl } from './data/api';
import { getUserPermissionsUrl, getUserPermissionsEnabledFlagUrl } from '../generic/data/api';
import { fetchUserPermissionsQuery, fetchUserPermissionsEnabledFlag } from '../generic/data/thunks';
import CourseTeam from './CourseTeam';
import messages from './messages';
import { USER_ROLES } from '../constants';
import { executeThunk } from '../utils';
import { changeRoleTeamUserQuery, deleteCourseTeamQuery } from './data/thunk';

let axiosMock;
let store;
const mockPathname = '/foo-bar';
const courseId = '123';
const userId = 3;
const userPermissionsData = { permissions: ['manage_all_users'] };

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: mockPathname,
  }),
}));

const RootWrapper = () => (
  <AppProvider store={store}>
    <IntlProvider locale="en">
      <CourseTeam courseId={courseId} />
    </IntlProvider>
  </AppProvider>
);

describe('<CourseTeam />', () => {
  beforeEach(() => {
    initializeMockApp({
      authenticatedUser: {
        userId,
        username: 'abc123',
        administrator: true,
        roles: [],
      },
    });

    store = initializeStore();
    axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock
      .onGet(getUserPermissionsEnabledFlagUrl)
      .reply(200, { enabled: true });
    axiosMock
      .onGet(getUserPermissionsUrl(courseId, userId))
      .reply(200, userPermissionsData);
  });

  it('render CourseTeam component with 3 team members correctly', async () => {
    axiosMock
      .onGet(getCourseTeamApiUrl(courseId))
      .reply(200, courseTeamMock);

    const {
      getByText, getByRole, getByTestId, queryAllByTestId,
    } = render(<RootWrapper />);

    await waitFor(() => {
      expect(getByText(messages.headingTitle.defaultMessage)).toBeInTheDocument();
      expect(getByText(messages.headingSubtitle.defaultMessage)).toBeInTheDocument();
      expect(getByRole('button', { name: messages.addNewMemberButton.defaultMessage })).toBeInTheDocument();
      expect(getByTestId('course-team-sidebar')).toBeInTheDocument();
      expect(queryAllByTestId('course-team-member')).toHaveLength(3);
    });
  });

  it('render CourseTeam component with 1 team member correctly', async () => {
    cleanup();
    axiosMock
      .onGet(getCourseTeamApiUrl(courseId))
      .reply(200, courseTeamWithOneUser);

    const {
      getByText, getByRole, getByTestId, getAllByTestId,
    } = render(<RootWrapper />);

    await waitFor(() => {
      expect(getByText(messages.headingTitle.defaultMessage)).toBeInTheDocument();
      expect(getByText(messages.headingSubtitle.defaultMessage)).toBeInTheDocument();
      expect(getByRole('button', { name: messages.addNewMemberButton.defaultMessage })).toBeInTheDocument();
      expect(getByTestId('course-team-sidebar')).toBeInTheDocument();
      expect(getAllByTestId('course-team-member')).toHaveLength(1);
    });
  });

  it('render CourseTeam component without team member correctly', async () => {
    cleanup();
    axiosMock
      .onGet(getCourseTeamApiUrl(courseId))
      .reply(200, courseTeamWithoutUsers);

    const {
      getByText, getByRole, getByTestId, queryAllByTestId,
    } = render(<RootWrapper />);

    await waitFor(() => {
      expect(getByText(messages.headingTitle.defaultMessage)).toBeInTheDocument();
      expect(getByText(messages.headingSubtitle.defaultMessage)).toBeInTheDocument();
      expect(getByRole('button', { name: messages.addNewMemberButton.defaultMessage })).toBeInTheDocument();
      expect(getByTestId('course-team-sidebar__initial')).toBeInTheDocument();
      expect(queryAllByTestId('course-team-member')).toHaveLength(0);
    });
  });

  it('render CourseTeam component with initial sidebar correctly', async () => {
    cleanup();
    axiosMock
      .onGet(getCourseTeamApiUrl(courseId))
      .reply(200, courseTeamWithoutUsers);

    const { getByTestId, queryByTestId } = render(<RootWrapper />);

    await waitFor(() => {
      expect(getByTestId('course-team-sidebar__initial')).toBeInTheDocument();
      expect(queryByTestId('course-team-sidebar')).not.toBeInTheDocument();
    });
  });

  it('render CourseTeam component without initial sidebar correctly', async () => {
    cleanup();
    axiosMock
      .onGet(getCourseTeamApiUrl(courseId))
      .reply(200, courseTeamMock);

    const { getByTestId, queryByTestId } = render(<RootWrapper />);

    await waitFor(() => {
      expect(queryByTestId('course-team-sidebar__initial')).not.toBeInTheDocument();
      expect(getByTestId('course-team-sidebar')).toBeInTheDocument();
    });
  });

  it('displays AddUserForm when clicking the "Add New Member" button', async () => {
    cleanup();
    axiosMock
      .onGet(getCourseTeamApiUrl(courseId))
      .reply(200, courseTeamWithOneUser);

    const { getByRole, queryByTestId } = render(<RootWrapper />);

    await waitFor(() => {
      expect(queryByTestId('add-user-form')).not.toBeInTheDocument();
      const addButton = getByRole('button', { name: messages.addNewMemberButton.defaultMessage });
      fireEvent.click(addButton);
      expect(queryByTestId('add-user-form')).toBeInTheDocument();
    });
  });

  it('displays AddUserForm when clicking the "Add a New Team member" button', async () => {
    cleanup();
    axiosMock
      .onGet(getCourseTeamApiUrl(courseId))
      .reply(200, courseTeamWithOneUser);

    const { getByRole, queryByTestId } = render(<RootWrapper />);

    await waitFor(() => {
      expect(queryByTestId('add-user-form')).not.toBeInTheDocument();
      const addButton = getByRole('button', { name: messages.addNewMemberButton.defaultMessage });
      fireEvent.click(addButton);
      expect(queryByTestId('add-user-form')).toBeInTheDocument();
    });
  });

  it('not displays "Add New Member" and AddTeamMember component when isAllowActions is false and hasManageAllUsersPerm is false', async () => {
    cleanup();
    axiosMock
      .onGet(getCourseTeamApiUrl(courseId))
      .reply(200, {
        ...courseTeamWithOneUser,
        allowActions: false,
      });
    axiosMock
      .onGet(getUserPermissionsEnabledFlagUrl)
      .reply(200, { enabled: true });

    const { queryByRole, queryByText } = render(<RootWrapper />);

    await waitFor(() => {
      expect(queryByRole('button', { name: messages.addNewMemberButton.defaultMessage })).not.toBeInTheDocument();
      expect(queryByText('add-team-member')).not.toBeInTheDocument();
    });
  });

  it('displays "Add New Member" and AddTeamMember component when hasManageAllUsersPerm is true', async () => {
    cleanup();
    axiosMock
      .onGet(getCourseTeamApiUrl(courseId))
      .reply(200, {
        ...courseTeamWithOneUser,
        allowActions: false,
      });
    axiosMock
      .onGet(getUserPermissionsEnabledFlagUrl)
      .reply(200, { enabled: true });
    axiosMock
      .onGet(getUserPermissionsUrl(courseId, userId))
      .reply(200, userPermissionsData);
    await executeThunk(fetchUserPermissionsQuery(courseId), store.dispatch);
    await executeThunk(fetchUserPermissionsEnabledFlag(), store.dispatch);

    const { getByRole } = render(<RootWrapper />);

    await waitFor(() => {
      expect(getByRole('button', { name: messages.addNewMemberButton.defaultMessage })).toBeInTheDocument();
    });
  });

  it('should delete user', async () => {
    cleanup();
    axiosMock
      .onGet(getCourseTeamApiUrl(courseId))
      .reply(200, courseTeamMock);

    const { queryByText } = render(<RootWrapper />);

    axiosMock
      .onDelete(updateCourseTeamUserApiUrl(courseId, 'staff@example.com'))
      .reply(200);

    await executeThunk(deleteCourseTeamQuery(courseId, 'staff@example.com'), store.dispatch);
    expect(queryByText('staff@example.com')).not.toBeInTheDocument();
  });

  it('should change role user', async () => {
    cleanup();
    axiosMock
      .onGet(getCourseTeamApiUrl(courseId))
      .reply(200, courseTeamMock);

    const { getAllByText } = render(<RootWrapper />);

    axiosMock
      .onPut(updateCourseTeamUserApiUrl(courseId, 'staff@example.com', { role: USER_ROLES.admin }))
      .reply(200, { role: USER_ROLES.admin });

    await executeThunk(changeRoleTeamUserQuery(courseId, 'staff@example.com', { role: USER_ROLES.admin }), store.dispatch);
    expect(getAllByText('Admin')).toHaveLength(1);
  });
});
