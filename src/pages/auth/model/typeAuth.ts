export const typeAuth = (type: string) => {
  switch (type) {
    case 'login':
      return [
        {
          id: 'username',
          field: 'input',
        },
        {
          id: 'password',
          field: 'input-password',
        }
      ]
    case 'register':
      return [
        {
          id: 'username',
          field: 'input',
        },
        {
          id: 'email',
          field: 'input-email',
        },
        {
          id: 'password',
          field: 'input-password'
        }
      ]
  }
}