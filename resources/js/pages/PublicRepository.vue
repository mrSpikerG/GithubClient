<template>
  <div class="container card-container justify-content-center">
    <h2 class="my-5">Public Repository</h2>

    <div v-if="isLogged">
      <div v-if="this.$route.params.name == this.user.login">
        <side-bar-component route="yourRepo"></side-bar-component>
      </div>
      <div v-if="this.$route.params.name != this.user.login">
        <side-bar-component route="github"></side-bar-component>
      </div>
    </div>
    <div v-if="!isLogged">
      <side-bar-component route="github"></side-bar-component>
    </div>
    <vs-table>
      <template #thead>
        <vs-tr>
          <vs-th>
            Name
          </vs-th>
          <vs-th>
            Visibility
          </vs-th>
          <vs-th>
            Language
          </vs-th>
          <vs-th>
            Description
          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr :key="i" v-for="(tr, i) in items">
          <vs-td>
            <a :href="`${tr.html_url}`">
              {{ tr.name }}
            </a>
          </vs-td>
          <vs-td>
            {{ tr.visibility }}
          </vs-td>
          <vs-td>
            {{ tr.language == null ? "not set" : tr.language }}
          </vs-td>
          <vs-td>
            {{ tr.description == null ? "not set" : tr.description }}
          </vs-td>

          <template #expand>

            <div class="con-content d-flex justify-content-between">
              <div class="d-flex">
                <vs-avatar>
                  <img :src="tr.owner.avatar_url" alt="">
                </vs-avatar>
                <p class="fs-2 ms-3 mb-0">
                  {{ tr.owner.login }}
                </p>
              </div>
              <div v-if="isLogged">
                <div v-if="tr.owner.login == user.login" class="d-flex">
                  <vs-button @click="updateVisibility(tr.name, tr.visibility)" flat icon>
                    <div v-if="tr.visibility == 'private'">
                      <i class='bx bx-lock-open-alt'></i>
                    </div>
                    <div v-if="tr.visibility != 'private'">
                      <i class='bx bx-lock-alt'></i>
                    </div>
                  </vs-button>
                  <vs-button flat icon>
                    <vs-tooltip loading>
                      funny button
                      <template #tooltip></template>
                    </vs-tooltip>
                  </vs-button>
                  <vs-button @click="deleteRepo(tr.name)" border danger>
                    Delete
                  </vs-button>
                </div>
              </div>
            </div>

          </template>
        </vs-tr>
      </template>
    </vs-table>
    <div class="center con-pagination">

      <vs-pagination :color="color" v-model="page" :length="max" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {


  data: () => ({
    items: [],
    username: '',
    page: 1,
    max: 3,
    color: 'success',
    curRoute: 'github',
  }),
  methods: {

    openNotification(position = null, color, icon,text) {
      const noti = this.$vs.notification({
        progress: 'auto',
        icon,
        color,
        position,
        title: 'Successful operation',
        text:  `${text}`
      })
    },
    deleteRepo(reponame) {

      fetch(`/api/user/${this.$route.params.name}/repos/${reponame}/delete/${localStorage.getItem('token')}`)
        .then(response => response.json())
        .then(data => {
         

          const index = this.items.indexOf( this.items.find(x => x.name === reponame));
          if (index > -1) { 
            this.items.splice(index, 1); 
          }
          
          this.openNotification('top-right', 'danger', `<i class='bx bx-error' ></i>`,'Repository successfully has been deleted');
        });
    },

    updateVisibility(reponame, visibility) {
      let newVisibility = visibility == 'private' ? 'public' : 'private';
      fetch(`/api/user/${this.$route.params.name}/repos/${reponame}/update/${newVisibility}/${localStorage.getItem('token')}`)
        .then(response => response.json())
        .then(data => {
          this.items.find(x => x.name === reponame).visibility = newVisibility;
          this.openNotification('top-right', 'success', `<i class='bx bx-select-multiple' ></i>`,'Repository visibility successfully has been changed');
        });
    }
  },
  mounted() {
    this.username = this.$route.params.name;

    let isAuth = false;
    if (this.isLogged) {
      if (this.$route.params.name == this.user.login) {
        isAuth = true;
      }
    }

    if (isAuth) {
      this.curRoute = 'yourRepo';
      fetch(`/api/user/${this.$route.params.name}/repos/${this.page}/${localStorage.getItem('token')}`)
        .then(response => response.json())
        .then(data => this.items = data);

      fetch(`/api/user/reposPage/${localStorage.getItem('token')}`)
        .then(response => response.json())
        .then(data => this.max = data);

    } else {
      fetch(`/api/user/${this.$route.params.name}/repos/${this.page}`)
        .then(response => response.json())
        .then(data => this.items = data);

      fetch(`/api/user/${this.$route.params.name}/reposPage`)
        .then(response => response.json())
        .then(data => this.max = data);
    }

  },
  computed: {
    ...mapGetters(['isLogged', 'user']),
  },
  watch: {
    page: function (val) {

      if (val) {

        let isAuth = false;
        if (this.isLogged) {
          if (this.$route.params.name == this.user.login) {
            isAuth = true;
          }
        }

        if (isAuth) {

          fetch(`/api/user/${this.$route.params.name}/repos/${val}/${localStorage.getItem('token')}`)
            .then(response => response.json())
            .then(data => this.items = data);



        } else {
          fetch(`/api/user/${this.$route.params.name}/repos/${val}`)
            .then(response => response.json())
            .then(data => this.items = data);
        }
        // fetch(`/api/user/${this.$route.params.name}/repos/${val}`)
        //   .then(response => response.json())
        //   .then(data => this.items = data);
      }
    }
  }

}
</script>
