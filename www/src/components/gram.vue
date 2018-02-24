<template>
    <div>
        <h1>GranolaGram</h1>
        <div class="list-group" v-for="gram in grams">
            <div>
                <div>
                    <p>{{gram.user}}</p>
                    <img src="http://placehold.it/300x300">
                    <div>
                        <button @click="">comments</button>
                        <button @click="">like</button>
                    </div>
                </div>
                <div>
                    <h4>{{gram.caption}}</h4>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "gram",
        data() {
            return {

            }
        },
        computed: {
            grams() {
                return this.$store.state.grams
            }
        },
        components: {

        }
    }

</script>