import { defineBackend } from '@aws-amplify/backend'
import { HttpApi, HttpMethod, CorsHttpMethod } from 'aws-cdk-lib/aws-apigatewayv2'
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations'
import { auth } from './auth/resource'
import { data } from './data/resource'
import { fileStorage } from './storage/resource'
import { uploadPresign } from './functions/upload-presign/resource'

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  fileStorage,
  uploadPresign,
})

const uploadApiStack = backend.createStack('upload-http-api')

const httpApi = new HttpApi(uploadApiStack, 'UploadHttpApi', {
  description: 'Presigned S3 uploads via Lambda',
  corsPreflight: {
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: [CorsHttpMethod.POST, CorsHttpMethod.OPTIONS],
    allowOrigins: ['*'],
  },
})

const presignIntegration = new HttpLambdaIntegration(
  'UploadPresignIntegration',
  backend.uploadPresign.resources.lambda,
)

httpApi.addRoutes({
  path: '/upload/presign',
  methods: [HttpMethod.POST],
  integration: presignIntegration,
})

backend.addOutput({
  custom: {
    uploadApiUrl: httpApi.apiEndpoint,
  },
})
