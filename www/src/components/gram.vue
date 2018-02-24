<template>
    <div>
        <div class="flexor border-grey">
            <div class="mar-right">
                
                <img v-bind:src="gramProp.img" class="gram-img">
                <div class="margin-top">
                    <button @click="addLike(gramProp)" class="btn btn-lg"><i class="fas fa-1x fa-arrow-circle-up"></i> <b>{{gramProp.like}}</b></button>
                    <button @click="getTidbits(gramProp._id)" class="btn btn-lg"><i class="fas fa-1x fa-comment-alt"></i> <b>tidbits</b></button>
                </div>
            </div>
            <div class="comments-holder">
                <div>
                        <h4>
                                <b>{{gramProp.user}}</b> {{gramProp.caption}}</h4>
                </div>
                <div class="list-group" v-for="tidbit in tidbits">
                    <div class="flexor border-grey">
                        <div class="flexor">
                            <img v-bind:src="tidbit.portrait + tidbit.user" height="40">
                            <h4 class="mar-right comment-text"><b>{{tidbit.user}}:</b> {{tidbit.content}}</h4>
                        </div>
                        <div>
                                <i @click="deleteTidbit(tidbit)" class="fas red fa-minus-circle"></i>
                        </div>
                    </div>
                </div>
                <form @submit.prevent="createTidbit(tidbit)">
                    <input type="text" placeholder="Username" v-model="tidbit.user">
                    <input type="text" placeholder="What's your Tidbit?" v-model="tidbit.content">
                    <button type="submit" class="btn btn-lg"><b>post</b></button>
                </form>
            </div>
            <div>
                    <i @click="deleteGram(gramProp)" class="mar-left far grey fa-times-circle"></i>
            </div>
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
            createTidbit(data) {
                data.gramId = this.gramProp._id
                this.$store.dispatch("createTidbit", data)
                this.tidbit=  {
                    gramId: ''
                }
            },
            deleteTidbit(tidbit) {
                this.$store.dispatch('deleteTidbit', tidbit)
            },
            deleteGram(gram){
                this.$store.dispatch('deleteGram', gram)
            },
            addLike(gram) {
                this.$store.dispatch('addLike', gram)
            }
        }
    }

</script>

<style scoped>
    .btn {
        background-color: #3e91d6;
        color: white
    }

    .gram-img {
        max-height: 450px;
        max-width: 450px
    }
    .border-grey{
        border: .1rem solid #eee;
    }
    .flexor {
        display: flex;
        margin-bottom: 1rem;
        padding: .5rem;
        border-radius: 10px;
        justify-content: space-between
    }
    .comments-holder{
        align-self: center;
        padding: .5rem;
        border: .1rem solid #eee;
    }
    .mar-right{
        margin-right: 1rem;
    }
    .margin-top{
        margin-top: 1rem;
    }
    .comment-text{
        align-self: center
    }
    .red {
        color: rgba(255, 68, 0, 0.452);
        transition: all .3s linear;
        font-size: 1rem;
    }
    .red:hover{
        color: orangered;
        cursor: pointer
    }
    .grey{
        color: #b9b9b9ea;
        cursor: pointer
    }
    .align-front{
        align-self: flex-end;
    }
    .mar-left{
        margin-left: 1rem;
    }
</style>