import { dataClient } from './client.ts'

export async function listTodos() {
  const { data, errors } = await dataClient.models.Todo.list()
  if (errors?.length) {
    throw new Error(errors.map((e) => e.message).join('; '))
  }
  return data ?? []
}

export async function createTodo(content: string) {
  const { data, errors } = await dataClient.models.Todo.create({ content })
  if (errors?.length) {
    throw new Error(errors.map((e) => e.message).join('; '))
  }
  return data
}

export async function deleteTodo(id: string) {
  const { data, errors } = await dataClient.models.Todo.delete({ id })
  if (errors?.length) {
    throw new Error(errors.map((e) => e.message).join('; '))
  }
  return data
}
