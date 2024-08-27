import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  heading: {
    id: 'course-authoring.pages-resources.progress.heading',
    defaultMessage: 'Настройки',
  },
  enableProgressLabel: {
    id: 'course-authoring.pages-resources.progress.enable-progress.label',
    defaultMessage: 'Прогресс',
  },
  enableProgressHelp: {
    id: 'course-authoring.pages-resources.progress.enable-progress.help',
    defaultMessage: `По мере того, как учащиеся будут выполнять задания с оценками, на вкладке "Прогресс" будут отображаться оценки. Вкладка "Прогресс" содержит таблицу всех заданий курса с оценками, а также список всех заданий и оценок ниже.`,
  },
  enableProgressLink: {
    id: 'course-authoring.pages-resources.progress.enable-progress.link',
    defaultMessage: 'Learn more about progress',
  },
  enableGraphLabel: {
    id: 'course-authoring.pages-resources.progress.enable-graph.label',
    defaultMessage: 'Включить график выполнения',
  },
  enableGraphHelp: {
    id: 'course-authoring.pages-resources.progress.enable-graph.help',
    defaultMessage: 'Если этот параметр включен, учащиеся могут просматривать график успеваемости',
  },
});

export default messages;
