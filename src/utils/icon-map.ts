import IconOcticonTabExternal from '~icons/octicon/tab-external-24'
import IconCarbonMigrate from '~icons/carbon/migrate'
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
import IconProgress from '~icons/simple-icons/progress'
import IconLucideShield from '~icons/lucide/shield'
import IconLucideBook from '~icons/lucide/book'
import IconLucideCode from '~icons/lucide/code'
import IconLucideUsers from '~icons/lucide/users'
import IconLucideBuilding from '~icons/lucide/building'
import IconLucideWrench from '~icons/lucide/wrench'
import IconLucidePackage from '~icons/lucide/package'
import IconLucidePuzzle from '~icons/lucide/puzzle'
import IconLucideWebhook from '~icons/lucide/webhook'

// Static icon mapping for supported technologies
export const iconMap = {
  // Programming languages
  nodejs: IconNodejs,
  node: IconNodejs,
  javascript: IconProiconsJavascript,
  js: IconProiconsJavascript,
  python: IconPython,
  py: IconPython,
  golang: IconGo,
  go: IconGo,
  java: IconJava,

  // Frameworks
  nextjs: IconTeenyiconsNextjsOutline,
  next: IconTeenyiconsNextjsOutline,
  springboot: IconSpringboot,
  spring: IconSpringboot,
  flask: IconFlask,
  django: IconDjango,
  express: IconExpress,
  expressjs: IconExpress,

  // Generic/utility icons
  ripple: IconRipple,
  read: IconReaddotcv,
  blog: IconReaddotcv,
  progress: IconProgress,
  migrate: IconCarbonMigrate,
  external: IconOcticonTabExternal,

  // Category icons
  shield: IconLucideShield,
  book: IconLucideBook,
  code: IconLucideCode,
  users: IconLucideUsers,
  building: IconLucideBuilding,
  wrench: IconLucideWrench,
  package: IconLucidePackage,
  puzzle: IconLucidePuzzle,
  webhook: IconLucideWebhook,
}

export type IconKey = keyof typeof iconMap

// Helper function to get icon component by key
export function getIconComponent(key?: string) {
  if (!key) return IconOcticonTabExternal
  const iconKey = key.toLowerCase() as IconKey
  return iconMap[iconKey] || IconOcticonTabExternal
}
