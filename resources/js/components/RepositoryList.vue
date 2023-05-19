<template>
    <div class="d-flex w-100 justify-content-center">
        <div class="">


            <div v-for="item in items" class="repositoryContainer">
                <div>
                    <a :href="`${item.html_url}`">
                        {{ item.name }}
                    </a>
                    ( Public )
                </div>
                <p>
                    {{ item.language }}
                </p>
            </div>

            <nav aria-label="Page navigation ">
                <ul class="pagination d-flex justify-content-center repository-pagination">
                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>

        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            items: '',
            username: 'mrSpikerG',
            page: 1
        }
    },


    mounted() {

        fetch(`/api/user/${this.username}/repos/${this.page}`)
            .then(response => response.json())
            .then(data => this.items = data);

    }
}
</script>
