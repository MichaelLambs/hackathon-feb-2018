<template>
    <div>
        <h1>GranolaGram</h1>
        <div>
            <div>
                <p>{{gramProp.user}}</p>
                <img v-bind:src="gramProp.img">
                <div>
                    <button @click="getTidbits(gramProp._id)">view tidbits</button>
                    <button @click="">like</button>
                </div>
            </div>
            <div>
                <h4>{{gramProp.caption}}</h4>
            </div>
            <form @submit.prevent="createTidbit(tidbit)">
                <input type="text" placeholder="What's your Tidbit?" v-model="tidbit.content">
                <input type="text" placeholder="Username" v-model="tidbit.user">
                <button type="submit">Post</button>
            </form>
        </div>
        <div class="list-group" v-for="tidbit in tidbits">
            <p>{{tidbit.user}}: {{tidbit.content}}</p>
        </div>

    </div>
</template>

<script>
    export default {
        name: "gram",
        props: ["gramProp"],
        data() {
            return {
                tidbit: {
                    gramId: ''
                }
            }
        },
        computed: {
            grams() {
                return this.$store.state.grams
            },
            tidbits() {
                return this.$store.state.tidbits[this.gramProp._id]
            }
        },
        components: {

        },
        methods: {
            getTidbits(gramId) {
                this.$store.dispatch("getTidbits", gramId)
            },
            createTidbit(data){ 
                data.gramId = this.gramProp._id
                this.$store.dispatch("createTidbit", data)
            }
        }
    }

</script>