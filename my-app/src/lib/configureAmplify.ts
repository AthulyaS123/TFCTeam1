import { Amplify } from 'aws-amplify'
import outputs from '../../amplify_outputs.json'

/**
 * Uses `amplify_outputs.json` at the project root (replaced when you run
 * `npx ampx sandbox`). The repo ships `{}` so the project builds before deploy.
 */
export function configureAmplify(): void {
  const config = outputs as Record<string, unknown>
  if (config && Object.keys(config).length > 0) {
    Amplify.configure(config)
  } else if (import.meta.env.DEV) {
    console.warn(
      '[Amplify] amplify_outputs.json is empty. Run: npx ampx sandbox — then commit or keep outputs local.',
    )
  }
}
