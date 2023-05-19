<template >
    <div>

        <side-bar-component route="about"></side-bar-component>

        <div class="container card-container justify-content-center">
            <h1>Github funs</h1>
            <p class="w=50">Мы компания, которая уже 1000 лет на рынке, знаем всё идеально, проекты выполняем за 5-15
                милисекунд</p>

            <h2 class="mt-5">Ведущие разработчики нашей компании:</h2>
            <div class="d-flex justify-content-center">
                <img class="rounded-2 my-3 w-75" src="https://www.soyuz.ru/public/uploads/files/2/7204157/20180514134336f23dc8072c.jpg"
                    alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {


    data: () => ({
        value: ''
    }),


    mounted() {



    }
}
</script>
