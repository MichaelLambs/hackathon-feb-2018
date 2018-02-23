import vue from "vue";
import vuex from "vuex";
import axios from "axios";

var api = axios.create({
    baseURL: '//localhost:3000/granolagram/', 
    timeout:3000
});

export default new vuex.Store({
    state:{
        user:{
            name: "test",
            img: "https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg"
        },
        //dummy data
        grams: [{
            name: "bob", 
            img: "http://placehold.it/200x200",
            user: "this web site",
            caption: "does this work",
            date: Date.now(),
            like: 0,
            _id: 1
        },
        {
            name: "rob", 
            img: "http://placehold.it/200x200",
            user: "this web site",
            caption: "does this work",
            date: Date.now(),
            like: 0,
            _id: 2
        }],
        tidbits: [{
            name: "tob", 
            user: "this web site",
            content: "does this work",
            date: Date.now(),
            gramId: 1
        }]
    },
    mutations:{

    },
    actions:{
       getGrams({commit,dispatch},payload){
           console.log(help)
           api.get("grams")
           .then (res=>{
               commit("setGrams",res.data)
           })
           .catch(err=>{
               console.log(err)
           })
       }
    }
})