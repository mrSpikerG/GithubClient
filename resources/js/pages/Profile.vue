<template>
    <div>

        <side-bar-component route="profile"></side-bar-component>

        <div class="container card-container justify-content-center">
            <div class="d-flex align-content-center">
                <a :href="user.html_url">
                    <vs-avatar size="70" badge badge-color="success">
                        <img :src="user.avatar_url" alt="">
                    </vs-avatar>
                </a>
                <div class="my-auto mx-5 h-auto">
                    <p class="fs-2 mb-0">{{ user.name }}</p>
                    <p>{{ user.login }}</p>
                </div>
            </div>

            <div class="row mt-5">
              
                <div class="col-4 text-center">
                   
                        <div>
                            <h3>Repositories</h3>
                            <p>Public repository: {{ user.public_repos }}</p>
                            <p>Private repository: {{ user.total_private_repos }} / {{ user.plan.private_repos }}</p>
                        </div>
                        <div class="mt-5">
                            <h3>Gists</h3>
                            <p>Public gists: {{ user.public_gists }}</p>
                            <p>Private gists: {{ user.private_gists }}</p>
                        </div>
                   
                        <div>
                            <h3 class="mt-5">Social</h3>
                            <p>Followers: {{ user.followers }}</p>
                            <p>Following: {{ user.following }}</p>
                            <p>Collaborators: {{ user.collaborators }}</p>

                            <p class="my-4">Disk space: {{ user.disk_usage }} / {{ user.plan.space }}</p>
                        </div>
                  
                </div>
                <div class="col-8">
                    <p>{{ user.bio }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {




    computed: {
        ...mapGetters(['isLogged', 'user']),
    },
    mounted() {

        if (this.user == null) {
            this.$router.push(`/`);
        }

    }
}
</script>
