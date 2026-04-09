import { defineFunction } from '@aws-amplify/backend'

export const uploadPresign = defineFunction({
  name: 'upload-presign',
  entry: './handler.ts',
  timeoutSeconds: 30,
})
