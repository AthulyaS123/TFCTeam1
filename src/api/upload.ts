import outputs from '../../amplify_outputs.json'

export type PresignUploadResponse = {
  uploadUrl: string
  key: string
  method: string
  headers: { 'Content-Type': string }
}

function getUploadApiBaseUrl(): string {
  const custom = (outputs as { custom?: { uploadApiUrl?: string } }).custom
  const base = custom?.uploadApiUrl?.trim()
  if (!base) {
    throw new Error(
      'custom.uploadApiUrl is missing from amplify_outputs.json. Deploy the backend (e.g. npx ampx sandbox) and refresh outputs.',
    )
  }
  return base.replace(/\/$/, '')
}

/**
 * Calls API Gateway → Lambda to get a short-lived S3 PUT URL, then uploads the file bytes to the bucket.
 */
export async function requestPresignedPutUrl(params: {
  fileName: string
  contentType: string
  /** Subfolder under `uploads/` (sanitized server-side). */
  folder?: string
}): Promise<PresignUploadResponse> {
  const url = `${getUploadApiBaseUrl()}/upload/presign`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fileName: params.fileName,
      contentType: params.contentType,
      folder: params.folder,
    }),
  })
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`Presign request failed (${res.status}): ${text}`)
  }
  return JSON.parse(text) as PresignUploadResponse
}

export async function uploadFileToStorage(
  file: File,
  options?: { folder?: string },
): Promise<{ key: string }> {
  const { uploadUrl, key, headers } = await requestPresignedPutUrl({
    fileName: file.name,
    contentType: file.type || 'application/octet-stream',
    folder: options?.folder,
  })

  const putRes = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': headers['Content-Type'],
    },
  })

  if (!putRes.ok) {
    const errBody = await putRes.text().catch(() => '')
    throw new Error(`S3 upload failed (${putRes.status}): ${errBody || putRes.statusText}`)
  }

  return { key }
}
