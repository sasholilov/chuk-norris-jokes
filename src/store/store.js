import {createStore} from 'vuex'

const store = createStore({
    state(){
        return  {
            loading: false,
            joke: {
                jokeText: "",
                id: "",
                isFav: false,
            },
            categories: [],
        }
    },

    actions: {
        async fetchJoke({commit}, category){
            const url = !category ? `https://api.chucknorris.io/jokes/random` :
                `https://api.chucknorris.io/jokes/random?category=${category}`;
            try {
                commit('setLoading', true)
                const res = await fetch(url);
                const data = await res.json();
                commit("setJoke", data)
                commit('setLoading', false)
            }
            catch (error) {
                console.log(error)
            }
        },

        async fetchCategories({commit}) {
            try {
                const res = await fetch ('https://api.chucknorris.io/jokes/categories');
                const data = await res.json();
                commit('saveCategories', data)
            }
            catch (error) {
                console.log(error);
            }
        }
    }
,
    getters: {
        getJoke (state) {
            return state.joke.jokeText;
        },
        getCategories (state) {
            return state.categories;
        },
        getLoading (state) {
            return state.loading;
        }
    }
    ,
    mutations: {
        setJoke(state, newJoke){
            state.joke.jokeText = newJoke.value;
            state.joke.id = newJoke.id;
        },
        saveCategories(state, fetchedCategories){
            state.categories = fetchedCategories;
            console.log(state.categories);
        },
        setLoading(state, isLoading){
            state.loading = isLoading;
        }
    }
})

export default store;