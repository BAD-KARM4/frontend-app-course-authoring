export const DATE_FORMAT = 'MM/dd/yyyy';
export const TIME_FORMAT = 'HH:mm';
export const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss\\Z';
export const COMMA_SEPARATED_DATE_FORMAT = 'MMMM D, YYYY';
export const DEFAULT_EMPTY_WYSIWYG_VALUE = '<p>&nbsp;</p>';
export const STATEFUL_BUTTON_STATES = {
  default: 'default',
  pending: 'pending',
  error: 'error',
};

export const USER_ROLES = {
  admin: 'instructor',
  staff: 'staff',
};

export const BADGE_STATES = {
  danger: 'danger',
  secondary: 'secondary',
};

export const NOTIFICATION_MESSAGES = {
  adding: 'Добавление',
  saving: 'Сохранение',
  duplicating: 'Копирование',
  deleting: 'Удаление',
  copying: 'Copying',
  pasting: 'Pasting',
  discardChanges: 'Discarding changes',
  publishing: 'Publishing',
  hidingFromStudents: 'Hiding from students',
  makingVisibleToStudents: 'Making visible to students',
  empty: '',
};

export const DEFAULT_TIME_STAMP = '00:00';

export const COURSE_CREATOR_STATES = {
  unrequested: 'unrequested',
  pending: 'pending',
  granted: 'granted',
  denied: 'denied',
  disallowedForThisSite: 'disallowed_for_this_site',
};

export const DECODED_ROUTES = {
  COURSE_UNIT: [
    '/container/:blockId/:sequenceId',
    '/container/:blockId',
  ],
};

export const UPLOAD_FILE_MAX_SIZE = 20 * 1024 * 1024; // 100mb

export const COURSE_BLOCK_NAMES = ({
  chapter: { id: 'chapter', name: 'Модуль' },
  sequential: { id: 'sequential', name: 'Подмодуль' },
  vertical: { id: 'vertical', name: 'Юнит' },
  component: { id: 'component', name: 'Компонент' },
});

export const STUDIO_CLIPBOARD_CHANNEL = 'studio_clipboard_channel';

export const CLIPBOARD_STATUS = {
  loading: 'loading',
  ready: 'ready',
  expired: 'expired',
  error: 'error',
};

export const STRUCTURAL_XBLOCK_TYPES = ['vertical', 'sequential', 'chapter', 'course'];

export const REGEX_RULES = {
  specialCharsRule: /^[a-zA-Z0-9_\-.'*~\s]+$/,
  noSpaceRule: /^\S*$/,
};
