/**
 * @author 정규화
 * @desc RealGrid 라이센스
 */

const realGrid2LicObj: { [key: string]: string } = {
  development: 'upVcPE+wPOmtLjqyBIh9RkM/nBOseBrflwxYpzGZyYm9cY8amGDkiNBG+1qQWvM8o5MQ1U6QxRTA9tQkOwyK5l7svsLh1nO8NaM2nnqXc7mMNp9HhB9hNQ==', // dev
  test: 'upVcPE+wPOmtLjqyBIh9RkM/nBOseBrflwxYpzGZyYm9cY8amGDkiNBG+1qQWvM8o5MQ1U6QxRTA9tQkOwyK5l7svsLh1nO8NaM2nnqXc7mMNp9HhB9hNQ==', // stg
  production: 'upVcPE+wPOmtLjqyBIh9RkM/nBOseBrflwxYpzGZyYm9cY8amGDkiNBG+1qQWvM8o5MQ1U6QxRTA9tQkOwyK5l7svsLh1nO8NaM2nnqXc7mMNp9HhB9hNQ==', // prd
}
const SetRealGridLic = (): void => {
  const w = window as any

  if (!w.realGrid2Lic) w.realGrid2Lic = realGrid2LicObj[process.env['NODE_ENV'] || '']
}

export default SetRealGridLic
