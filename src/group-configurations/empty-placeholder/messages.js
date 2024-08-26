import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  title: {
    id: 'course-authoring.group-configurations.empty-placeholder.title',
    defaultMessage: 'Вы еще не создали никаких групп контента.',
    description: 'Title displayed when there are no content groups created yet.',
  },
  experimentalTitle: {
    id: 'course-authoring.group-configurations.experimental-empty-placeholder.title',
    defaultMessage: 'Вы еще не создали никаких групповых конфигураций.',
    description: 'Title displayed when there are no experimental group configurations created yet.',
  },
  button: {
    id: 'course-authoring.group-configurations.empty-placeholder.button',
    defaultMessage: 'Добавьте свою первую группу контента',
    description: 'Label for the button to add the first content group when none exist.',
  },
  experimentalButton: {
    id: 'course-authoring.group-configurations.experimental-empty-placeholder.button',
    defaultMessage: 'Добавьте свою первую групповую конфигурацию',
    description: 'Label for the button to add the first experimental group configuration when none exist.',
  },
});

export default messages;
