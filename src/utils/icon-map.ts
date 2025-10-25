import IconLucideChevronDown from '~icons/lucide/chevron-down'
import IconOcticonTabExternal from '~icons/octicon/tab-external-24'
import IconCarbonMigrate from '~icons/carbon/migrate'
import IconGardenShapes26 from '~icons/garden/shapes-26'
import IconProiconsJavascript from '~icons/proicons/javascript'

// Import commonly used tech stack icons
import IconNodejs from '~icons/simple-icons/nodedotjs'
import IconPython from '~icons/simple-icons/python'
import IconGo from '~icons/simple-icons/go'
import IconJava from '~icons/ri/java-line'
import IconTeenyiconsNextjsOutline from '~icons/teenyicons/nextjs-outline'
import IconSpringboot from '~icons/simple-icons/springboot'
import IconFlask from '~icons/simple-icons/flask'
import IconDjango from '~icons/simple-icons/django'
import IconRipple from '~icons/simple-icons/ripple'
import IconExpress from '~icons/simple-icons/express'
import IconReaddotcv from '~icons/simple-icons/readdotcv'
import IconStreamlinePlumpBusinessProgressBar2 from '~icons/streamline-plump/business-progress-bar-2'

import IconLucideFileVideoCamera from '~icons/lucide/file-video-camera'
import IconLucideSquareCode from '~icons/lucide/square-code'
import IconLucideGithub from '~icons/lucide/github'
import IconStreamlineFreehandLearningProgrammingFlag from '~icons/streamline-freehand/learning-programming-flag'
import IconStreamlineFreehandLearningProgrammingBook from '~icons/streamline-freehand/learning-programming-book'
import IconFluentLearningApp24Regular from '~icons/fluent/learning-app-24-regular'
import IconMaterialSymbolsCodeRounded from '~icons/material-symbols/code-rounded'
import IconLucideBookOpenText from '~icons/lucide/book-open-text'
import IconHugeiconsTypescript01 from '~icons/hugeicons/typescript-01'
import IconLucideMessageCircleQuestionMark from '~icons/lucide/message-circle-question-mark'
import IconHugeiconsResourcesAdd from '~icons/hugeicons/resources-add'
import IconArcticonsEmojiEightSpokedAsterisk from '~icons/arcticons/emoji-eight-spoked-asterisk'
import IconLucideOutlineWebhook from '~icons/ic/outline-webhook'
import IconMaterialSymbolsMotionSensorAlertRounded from '~icons/material-symbols/motion-sensor-alert-rounded'

// Import navigation icons
import IconLucideShield from '~icons/lucide/shield'
import IconLucideBot from '~icons/lucide/bot'
import IconLucideBookOpen from '~icons/lucide/book-open'
import IconLucideBell from '~icons/lucide/bell'
import IconLucideCode from '~icons/lucide/code'
import IconLucideWrench from '~icons/lucide/wrench'

// Static icon mapping for supported technologies
export const iconMap = {
  nodejs: IconNodejs,
  node: IconNodejs,
  javascript: IconProiconsJavascript,
  js: IconProiconsJavascript,
  python: IconPython,
  py: IconPython,
  golang: IconGo,
  go: IconGo,
  java: IconJava,
  nextjs: IconTeenyiconsNextjsOutline,
  next: IconTeenyiconsNextjsOutline,
  springboot: IconSpringboot,
  spring: IconSpringboot,
  flask: IconFlask,
  django: IconDjango,
  ripple: IconRipple,
  express: IconExpress,
  expressjs: IconExpress,
  read: IconReaddotcv,
  blog: IconReaddotcv,
  progress: IconStreamlinePlumpBusinessProgressBar2,
  migrate: IconCarbonMigrate,
  video: IconLucideFileVideoCamera,
  code: IconMaterialSymbolsCodeRounded,
  'code-sample': IconLucideSquareCode,
  github: IconLucideGithub,
  tutorial: IconFluentLearningApp24Regular,
  library: IconStreamlineFreehandLearningProgrammingBook,
  book: IconLucideBookOpenText,
  // Navigation icons
  shield: IconLucideShield,
  authenticate: IconLucideShield,
  bot: IconLucideBot,
  'agent-actions': IconLucideBot,
  'book-open': IconLucideBookOpen,
  'api-reference': IconLucideBookOpen,
  'rest-apis': IconLucideBookOpen,
  bell: IconLucideBell,
  webhooks: IconLucideOutlineWebhook,
  events: IconMaterialSymbolsMotionSensorAlertRounded,
  wrench: IconLucideWrench,
  'developer-resources': IconLucideWrench,
  integrations: IconLucideWrench,
  'code-samples': IconLucideCode,
  'chevron-down': IconLucideChevronDown,
  typescript: IconHugeiconsTypescript01,
  support: IconLucideMessageCircleQuestionMark,
  resources: IconHugeiconsResourcesAdd,
}

export type IconKey = keyof typeof iconMap

// Helper function to get icon component by key
export function getIconComponent(key?: string) {
  if (!key) return IconOcticonTabExternal
  const iconKey = key.toLowerCase() as IconKey
  return iconMap[iconKey] || IconOcticonTabExternal
}

// Export commonly used icons for other components for SecondaryNav.astro
export {
  IconLucideChevronDown,
  IconOcticonTabExternal,
  IconCarbonMigrate,
  IconGardenShapes26,
  IconProiconsJavascript,
  // Navigation icons
  IconLucideShield,
  IconLucideBot,
  IconLucideBookOpen,
  IconLucideBell,
  IconLucideCode,
  IconLucideWrench,
  IconHugeiconsResourcesAdd,
  IconLucideOutlineWebhook,
}
