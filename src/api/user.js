var list = [
  {
    username: 'admin',
    password: '123456',
    accessToken: 'adminToken',
    permissions: ['admin'],
  },
]

export async function login(data) {
  let res = ''
  list.forEach((item, index) => {
    if (item.username == data.username && item.password == data.password) {
      res = Object.assign({}, item)
    }
  })
  return res
}

export function getUserInfo(accessToken) {
  let res = ''
  list.forEach((item, index) => {
    if (item.accessToken == accessToken) {
      res = Object.assign({}, item)
    }
  })
  return res
}

export function logout() {
  return true
}
