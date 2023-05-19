<template>
    <div class="">

        <vs-sidebar absolute hover-expand reduce v-model="active" open>
            <template #logo>
                <!-- ...img logo -->
            </template>

            <div @click="redirectToRoute('/')">
                <vs-sidebar-item id="home">
                    <template #icon>
                        <i class='bx bx-home'></i>
                    </template>
                    Home
                </vs-sidebar-item>
            </div>

            <div @click="redirectToRoute('/about')">
                <vs-sidebar-item id="about">
                    <template #icon>
                        <i class='bx bx-grid-alt'></i>
                    </template>
                    About
                </vs-sidebar-item>
            </div>
            <vs-sidebar-group>
                <template #header>
                    <vs-sidebar-item arrow>
                        <template #icon>
                            <i class='bx bx-code-alt'></i>
                        </template>
                        Coding
                    </vs-sidebar-item>
                </template>
                <div @click="inputRepos = !inputRepos">
                    <vs-sidebar-item id="github">
                        <template #icon>
                            <i class='bx bxl-github'></i>
                        </template>
                        Public repository
                    </vs-sidebar-item>
                </div>

                <div v-if="user !== null" @click="redirectToRoute('/user/profile')">
                    <vs-sidebar-item id="profile">
                        <template #icon>
                            <i class='bx bxl-codepen'></i>
                        </template>
                        Profile
                    </vs-sidebar-item>
                </div>
                <div v-if="user !== null" @click="redirectToRoute(`/user/${user.login}/repos`)">
                    <vs-sidebar-item id="yourRepo">
                        <template #icon>
                            <i class='bx bx-git-repo-forked'></i>
                        </template>
                        Your Repository
                    </vs-sidebar-item>
                </div>

            </vs-sidebar-group>
            <vs-sidebar-item id="donate">
                <template #icon>
                    <i class='bx bxs-donate-heart'></i>
                </template>
                Donate
            </vs-sidebar-item>
            <div v-if="user === null">
                <div @click="loginPage = !loginPage">
                    <vs-sidebar-item id="login">
                        <template #icon>
                            <i class='bx bx-log-in'></i>
                        </template>
                        Login
                    </vs-sidebar-item>
                </div>
            </div>

            <div v-if="user !== null">
                <div @click="logoutPage = !logoutPage">
                    <vs-sidebar-item id="logout">
                        <template #icon>
                            <i class='bx bx-log-out'></i>
                        </template>
                        Logout
                    </vs-sidebar-item>
                </div>
            </div>




            <template #footer>
                <vs-row justify="space-between">


                    <div v-if="user !== null">
                        <a :href="user.html_url">
                            <vs-avatar>
                                <img :src="user.avatar_url" alt="">
                            </vs-avatar>
                        </a>
                    </div>
                    <vs-switch @click="changeThemeEvent" warn v-model="curTheme">
                        <template #off>
                            <i class="bx bxs-moon"></i>
                        </template>
                        <template #on>
                            <i class="bx bxs-sun"></i>
                        </template>
                    </vs-switch>
                </vs-row>
            </template>
        </vs-sidebar>



        <!-- Login modal -->
        <vs-dialog v-model="loginPage">
            <template #header>
                <h4 class="not-margin">
                    Login to <b>Github</b>
                </h4>
            </template>
            <h6>Input your personal acces token</h6>


            <div class="con-form">
                <div class="my-3">
                    <vs-input type="password" v-model="password" placeholder="Password">
                        <template #icon>
                            <i class='bx bxs-lock'></i>
                        </template>
                    </vs-input>
                </div>
                <div class="flex justify-content-between">
                    <vs-checkbox v-model="remember">Remember me</vs-checkbox>
                    <a style="line-height: 3;" href="#">Forgot Password?</a>
                </div>
            </div>

            <template #footer>
                <div class="footer-dialog">
                    <vs-button @click="login" block>
                        Sign In
                    </vs-button>

                    <div class="new d-flex justify-content-around">
                        New Here? <a href="#">Create New Account</a>
                    </div>
                </div>
            </template>
        </vs-dialog>

        <!-- logout modal -->
        <vs-dialog width="550px" not-center v-model="logoutPage">
            <template #header>
                <h4 class="not-margin">
                    Вы уверены что хотите выйти из Аккаунта?
                </h4>
            </template>


            <div class="con-content">
                <p>
                    Здесь должен быть длинный текст о том как важно обдумывать свои действия и том что ничего не сохранится
                    если выйдете, но его всё равно никто не читает :(
                </p>
            </div>

            <template #footer>
                <div class="con-footer d-flex">
                    <vs-button @click="logout" transparent>
                        Ok
                    </vs-button>
                    <vs-button @click="logoutPage = false" dark transparent>
                        Cancel
                    </vs-button>
                </div>
            </template>
        </vs-dialog>

        <!-- Public repository -->
        <vs-dialog width="300px" not-center v-model="inputRepos">
            <template #header>
                <h4 class="not-margin">
                    Write <b>Login</b>
                </h4>
            </template>

            <div class="con-content">
                <vs-input v-model="reposUser" placeholder="Name"></vs-input>
            </div>

            <template #footer>
                <div class="con-footer">
                    <div class="d-flex justify-content-between">
                        <vs-button @click="redirectToRepos" transparent>
                            Ok
                        </vs-button>
                        <vs-button @click="inputRepos = false" dark transparent>
                            Cancel
                        </vs-button>
                    </div>
                </div>
            </template>
        </vs-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    props: ['route'],
    data: () => ({
        active: 'home',
        inputRepos: false,
        curTheme: false,
        loginPage: false,
        logoutPage: false,
        remember: false,
        password: '',
        reposUser: "",
    }),
    created() {
        this.active = this.route;
    },
    methods: {
        ...mapActions([
            'changeTheme',
            'loginUser',
            'saveToken'
        ]),
        login() {
            this.loginPage = false;
            if (this.password !== '') {
                fetch(`/api/user/${this.password}`)
                    .then(response => response.json())
                    .then(data => this.loginUser(data))
                    .then(localStorage.setItem('token', this.password));

            }
        },
        logout() {
            this.logoutPage = false;
            this.loginUser(null);
            localStorage.removeItem('token');
        },

        redirectToRepos() {
            this.inputRepos = false;
            if (this.reposUser !== '') {
                this.$router.push(`user/${this.reposUser}/repos`);
            }
        },
        redirectToRoute(route) {
            this.$router.push(route);
        },
        changeThemeEvent(event) {
            this.changeTheme();

        }
    },
    computed: {
        ...mapGetters(['isLogged','theme', 'user']),
    },
    mounted() {
     
        this.curTheme = this.theme=='dark'?false:true;
        if (localStorage.getItem('token') != null) {
            fetch(`/api/user/${localStorage.getItem('token')}`)
                .then(response => response.json())
                .then(data => this.loginUser(data));
        }
    }
}
</script>


 
