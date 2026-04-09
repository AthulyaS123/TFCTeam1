import { defineStorage } from '@aws-amplify/backend'
import { uploadPresign } from '../functions/upload-presign/resource'

export const fileStorage = defineStorage({
  name: 'fileStorage',
  access: (allow) => ({
    'uploads/*': [allow.resource(uploadPresign).to(['read', 'write'])],
  }),
})
