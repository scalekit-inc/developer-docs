/**
 * Group-label → icon-map key for SDK language / framework groups.
 *
 * Starlight forbids `attrs` and extra keys on sidebar groups (z.strictObject +
 * attrs: z.never()). Icons cannot travel through sidebar.config.ts. Look up by
 * the group label instead, which is unique per language on the SDK topics.
 */
import type { SdkLangNav } from './sdk-sidebar'
import saaskitNodeNav from '../components/sdk-reference/saaskit/node/_nav.json'
import saaskitExpressNav from '../components/sdk-reference/saaskit/express/_nav.json'
import saaskitNextjsNav from '../components/sdk-reference/saaskit/nextjs/_nav.json'
import saaskitPythonNav from '../components/sdk-reference/saaskit/python/_nav.json'
import saaskitFlaskNav from '../components/sdk-reference/saaskit/flask/_nav.json'
import saaskitFastapiNav from '../components/sdk-reference/saaskit/fastapi/_nav.json'
import saaskitDjangoNav from '../components/sdk-reference/saaskit/django/_nav.json'
import saaskitGoNav from '../components/sdk-reference/saaskit/go/_nav.json'
import saaskitJavaNav from '../components/sdk-reference/saaskit/java/_nav.json'
import saaskitExpoNav from '../components/sdk-reference/saaskit/expo/_nav.json'
import saaskitIosNav from '../components/sdk-reference/saaskit/ios/_nav.json'

const navs: SdkLangNav[] = [
  saaskitNodeNav,
  saaskitExpressNav,
  saaskitNextjsNav,
  saaskitPythonNav,
  saaskitFlaskNav,
  saaskitFastapiNav,
  saaskitDjangoNav,
  saaskitGoNav,
  saaskitJavaNav,
  saaskitExpoNav,
  saaskitIosNav,
]

const iconByLabel = new Map(
  navs.filter((nav) => nav.icon).map((nav) => [nav.label, nav.icon as string]),
)

export function sidebarIconForLabel(label: string): string | undefined {
  return iconByLabel.get(label)
}
