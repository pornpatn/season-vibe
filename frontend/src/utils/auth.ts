// Pseudo-code
// const token = localStorage.getItem("authToken")
// if (!token) redirectToLogin()
// else {
//   const user = parseJwt(token) // Or ping backend
//   if (user.isTemporaryPassword) redirectToForceResetPage()
// }

const fakeAuthApi = {
  async login(username: string, password: string) {
    if (username === 'admin' && password === '1234') {
      const accessToken = 'access-token-xyz'
      const refreshToken = 'refresh-token-abc'
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      return { success: true }
    }
    return { success: false }
  },
  async refreshToken() {
    const stored = localStorage.getItem('refreshToken')
    if (stored === 'refresh-token-abc') {
      const newToken = 'access-token-new'
      localStorage.setItem('accessToken', newToken)
      return { success: true, token: newToken }
    }
    return { success: false }
  },
  logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  },
  isLoggedIn() {
    return Boolean(localStorage.getItem('accessToken'))
  }
}

export default fakeAuthApi
