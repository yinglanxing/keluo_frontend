export const show_login = () => useState("login_plain", () => 0)
export const user_state = () => useState("user_state", () => ({
    current: null,
    userToken: null,
}))


// export const mutations = {
//     setCurrent(state, user) {
//         state.current = user
//     },
//     setUserToken(state, userToken) {
//         state.userToken = userToken
//     },
// }


// export default actions = {
//     login_success() {
//
//     },
//     async get_current_user() {
//
//     },
//     async signin() {
//
//     },
// }
