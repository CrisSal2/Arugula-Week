
class AuthService {
    login (token) {
        localStorage.setItem('token', token)
        window.location.assign('/myweek')
    }
    logout () {
        localStorage.removeItem('token')
        window.location.assign('/')
    }
    isLoggedIn () {
        return localStorage.getItem('token') !== null
    }
}

export default new AuthService();