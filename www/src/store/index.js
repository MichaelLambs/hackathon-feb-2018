import vue from "vue";
import vuex from "vuex";
import axios from "axios";

var api = axios.create({
    baseURL: '//localhost:3000/granolagram/',
    timeout: 3000
});

vue.use(vuex)
export default new vuex.Store({
    state: {
        user: {
            name: "test",
            img: "https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg"
        },
        //dummy data
        grams: [],
        tidbits: {}
    },
    mutations: {
        setGram(state, payload) {
            console.log("gram mutations")
            state.grams.unshift(payload)
        },
        setGrams(state, payload) {
            state.grams = payload
        },
        setTidbits(state, payload) {
            // state.tidbits[payload.id] = payload.data
            vue.set(state.tidbits, payload.id, payload.data)
        },
        setLikes(state, payload) {
            state.grams
        }
    },
    actions: {
        createGram({ commit, dispatch }, payload) {
            console.log("action")
            api.post("home", payload)
                .then(results => {
                    debugger
                    commit("setGram", payload)
                })
        },
        getGrams({ commit, dispatch }, payload) {
            api.get("home")
                .then(result => {
                    console.log(result)
                    commit("setGrams", result.data)
                })
                .catch(err => { console.log(err) })
        },
        getTidbits({ commit, dispatch }, payload) {
            api.get("grams/" + payload + "/tidbits")
                .then(result => {
                    console.log(result)
                    commit("setTidbits", { id: payload, data: result.data })
                })
                .catch(err => { console.log(err) })
        },
        createTidbit({ commit, dispatch }, payload) {
            api.post("tidbits", payload)
                .then(result => {
                    dispatch("getTidbits", payload.gramId)
                })
        },
        deleteTidbit({ commit, dispatch }, payload) {
            api.delete("tidbits/" + payload._id)
                .then(result => {
                    dispatch("getTidbits", payload.gramId)
                })
        },
        deleteGram({ commit, dispatch }, payload) {
            api.delete("grams/" + payload._id)
                .then(result => {
                    dispatch("getGrams", payload)
                })
        },
        addLike({ commit, dispatch }, payload) {

            payload.like++
            api.put('grams/' + payload._id, payload)
                .then(result => {
                    commit("setLikes", result.data.like)
                })

        }
    }
})