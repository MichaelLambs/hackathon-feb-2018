import vue from "vue";
import vuex from "vuex";
import axios from "axios";

var api = axios.create({
    baseURL: '//localhost:3000/granolagram/',
    // timeout: 3000
});

// ALLOWS VUE TO USE VUEX
vue.use(vuex)

// THE STORE
export default new vuex.Store({
    state: {
        user: {},
        grams: [],
        tidbits: {}
    },
    mutations: {
        setGram(state, payload) {
            state.grams.unshift(payload)
        },
        setGrams(state, payload) {
            payload.sort(function(a, b) {
                return b.like - a.like;
            })
            state.grams = payload
        },
        setTidbits(state, payload) {
            // state.tidbits[payload.id] = payload.data
            vue.set(state.tidbits, payload.id, payload.data)
        },
    },
    actions: {
        createGram({ commit, dispatch }, payload) {
            api.post("home", payload)
                .then(results => {
                    commit("setGram", results.data)
                })
        },
        getGrams({ commit, dispatch }, payload) {
            api.get("home")
                .then(result => {
                    // console.log(result)
                    commit("setGrams", result.data)
                })
                .catch(err => { console.log(err) })
        },
        getTidbits({ commit, dispatch }, payload) {
            api.get("grams/" + payload + "/tidbits")
                .then(result => {
                    // console.log(result)
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
                    dispatch('getGrams', payload)
                })
        },
        createUser({commit, dispatch}, payload) {
            api.post("auth/register", payload)
                .then(result => {
                    console.log("created user")
                })
        }
    }
})