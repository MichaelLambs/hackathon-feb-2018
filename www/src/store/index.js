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
        tidbits: []
    },
    mutations: {
        setGram(state, payload) {
            console.log("muts")
            state.grams = payload
        },
        setGrams(state, payload){
            state.grams = payload
        }

    },
    actions: {
        createGram({ commit, dispatch }, payload) {
            console.log("action")
            api.post("home", payload)
                .then(results => {
                    commit("setGram", payload)
                })
        },
        getGrams({commit, dispatch }, payload) {
            api.get("home")
                .then(result=>{
                    console.log(result)
                    commit("setGrams", result.data)
                })
                .catch(err=>{console.log(err)})
        }
    }
})