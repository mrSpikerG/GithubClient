const state = {
    user: null,
    theme: "dark",
}

const actions = {

    changeTheme(ctx) {
        if (state.theme === "dark") {
            ctx.commit("updateTheme", "white");
            document.getElementById('git-body').setAttribute("vs-theme", "white");
        } else {
            ctx.commit("updateTheme", "dark");
            document.getElementById('git-body').setAttribute("vs-theme", "dark");
        }
    },
    loginUser(ctx, user) {
        ctx.commit("updateUser", user);
    },
 

}
const mutations = {
    updateTheme(state, theme) {
        state.theme = theme;
    },
    updateUser(state, user) {
        state.user = user;
    },
   
}

const getters = {
    user: state => state.user,
    isLogged: state => state.user != null,
    theme: state => state.theme,
}

export default {
    state,
    getters,
    actions,
    mutations
}