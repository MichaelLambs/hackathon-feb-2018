<template>
    <div>
        <div class="flexor mar-bottom border-grey">
            <div class="mar-right">
                <img v-bind:src="gramProp.img" class="gram-img">
                <div class="margin-top">
                    <button @click="addLike(gramProp)" class="btn btn-lg">
                        <i class="fas fa-1x fa-arrow-circle-up"></i>
                        <b>{{gramProp.like}}</b>
                    </button>
                    <button @click="getTidbits(gramProp._id)" class="btn btn-lg">
                        <i class="fas fa-1x fa-comment-alt"></i>
                        <b>tidbits</b>
                    </button>
                </div>
            </div>
            <div class="comments-holder">
                <div class="caption-box">
                    <h3>
                        <em>
                            <b class="username">{{gramProp.user}}:</b>
                        </em>
                        {{gramProp.caption}}</h3>
                </div>
                <transition-group name="bounce" enter-active-class="animated bounceInRight" leave-active-class="animated bounceOut">
                    <div v-if="show" :key="tidbit._id" :class="{'list-group' : listGroup}" v-for="tidbit in tidbits">
                        <div class="flexor border-grey">
                            <div class="flexor">
                                <img class="mar-right-2" v-bind:src="tidbit.portrait + tidbit.user" height="40">
                                <h5 class="comment-text">
                                    <b>{{tidbit.user}}:</b> {{tidbit.content}}</h5>
                            </div>
                            <div>
                                <i @click="deleteTidbit(tidbit)" class="fas red fa-minus-circle"></i>
                            </div>
                        </div>
                    </div>
                </transition-group>
                <form class="tidbit-post" @submit.prevent="createTidbit(tidbit)">
                    <input type="text" class="tidbit-post-large-input" placeholder=" What's your Tidbit?" v-model="tidbit.content">
                    <button type="submit" class="btn">
                        <b>add tidbit</b>
                    </button>
                </form>
            </div>
            <div>
                <i @click="deleteGram(gramProp)" class="mar-left far grey fa-times-circle"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import router from '../router'
    export default {
        name: "gram",
        props: ["gramProp"],
        data() {
            return {
                tidbit: {
                    gramId: ''
                },
                listGroup: true,
                show: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
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
                if (this.show == false) {
                    this.show = true
                } else {
                    this.show = false
                }
            },
            createTidbit(data) {
                data.gramId = this.gramProp._id
                this.$store.dispatch("createTidbit", data)
                this.tidbit = {
                    gramId: ''
                }
            },
            deleteTidbit(tidbit) {
                this.$store.dispatch('deleteTidbit', tidbit)
            },
            deleteGram(gram) {
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

    .border-grey {
        border: .1rem solid #eee;
    }

    .flexor {
        display: flex;
        margin-bottom: .3rem;
        padding: .5rem;
        border-radius: 10px;
        justify-content: space-between
    }

    .comments-holder {
        align-self: center;
        padding: .5rem;
        width: 100%;
        /* border: .1rem solid #eee; */
    }

    .mar-right {
        margin-right: 1rem;
    }

    .mar-right-2 {
        margin-right: .3rem;
    }

    .margin-top {
        margin-top: 1rem;
    }

    .mar-bottom {
        margin-bottom: 2rem;
    }

    .comment-text {
        align-self: center;
        margin-bottom: 0;
    }

    .red {
        color: rgba(255, 68, 0, 0.452);
        transition: all .3s linear;
        font-size: 1rem;
    }

    .red:hover {
        color: orangered;
        cursor: pointer
    }

    .grey {
        color: #b9b9b9ea;
        cursor: pointer
    }

    .align-front {
        align-self: flex-end;
    }

    .mar-left {
        margin-left: 1rem;
    }

    .tidbit-post input {
        border-radius: 10px;
        height: 2.5rem;
    }

    .tidbit-post {
        display: flex;
        justify-content: space-between;
    }

    .tidbit-post-large-input {
        flex-grow: 2;
    }

    .username {
        color: #3e91d6;
    }

    .caption-box {
        margin-bottom: 1rem;
        border-left: 6px solid #3e91d6;
        padding-left: .6rem;
    }

    @media screen and (max-width: 1220px) {
        .tidbit-post {
            flex-direction: column;
        }
    }
</style>