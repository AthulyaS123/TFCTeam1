import { generateClient } from 'aws-amplify/data'
import type { Schema } from '../../amplify/data/resource'

/**
 * AppSync Data client for CRUDL on models defined in amplify/data/resource.ts
 */
export const dataClient = generateClient<Schema>()
