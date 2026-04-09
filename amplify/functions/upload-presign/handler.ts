import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
import { randomUUID } from 'crypto'

const BUCKET = process.env.fileStorage_BUCKET_NAME

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
}

function json(statusCode: number, body: unknown): APIGatewayProxyResultV2 {
  return {
    statusCode,
    headers: { ...cors, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

export const handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  if (event.requestContext.http.method === 'OPTIONS') {
    return { statusCode: 204, headers: cors }
  }

  if (!BUCKET) {
    return json(500, { message: 'Bucket not configured (fileStorage_BUCKET_NAME)' })
  }

  if (!event.body) {
    return json(400, { message: 'Missing body' })
  }

  let parsed: { fileName?: string; contentType?: string; folder?: string }
  try {
    parsed = JSON.parse(event.body) as typeof parsed
  } catch {
    return json(400, { message: 'Invalid JSON' })
  }

  const fileName = parsed.fileName?.trim() || 'file'
  const contentType = parsed.contentType?.trim() || 'application/octet-stream'
  const folder = (parsed.folder ?? 'general')
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-zA-Z0-9/_-]/g, '_')
    .slice(0, 128)

  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 200)
  const key = ['uploads', folder || 'general', `${randomUUID()}-${safeName}`]
    .filter(Boolean)
    .join('/')

  const client = new S3Client({})
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  })

  const uploadUrl = await getSignedUrl(client, command, { expiresIn: 300 })

  return json(200, {
    uploadUrl,
    key,
    method: 'PUT',
    headers: { 'Content-Type': contentType },
  })
}
