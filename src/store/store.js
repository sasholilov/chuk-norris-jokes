import {createStore} from 'vuex'
import favourites from "@/components/Favourites.vue";

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
            favourites: [...JSON.parse(localStorage.getItem('jokes'))]
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
        ,
        addToFavourites(context, joke) {
            const newJoke = {...joke, isFav: !joke.isFav};
            context.state.joke.isFav = newJoke.isFav;
            console.log('joke', joke)
            console.log('newjoke', newJoke)
            context.commit('setFavourites', newJoke);
        }
        ,
        deleteFromFavourites(context, id) {
            context.commit('deleteFavourite', id)
        }
    }
,
    getters: {
        getJoke (state) {
            return state.joke;
        },
        getCategories (state) {
            return state.categories;
        },
        getLoading (state) {
            return state.loading;
        },
        getIsFavorite (state) {
            return state.favourites.some(favJoke=>favJoke.id===state.joke.id);
        },
        getFavorites (state) {
            return state.favourites;
        }
    }
    ,
    mutations: {
        setJoke(state, newJoke){
            state.joke.jokeText = newJoke.value;
            state.joke.id = newJoke.id;
            state.joke.isFav = false;
        },
        saveCategories(state, fetchedCategories){
            state.categories = fetchedCategories;
        },
        setLoading(state, isLoading){
            state.loading = isLoading;
        },
        setFavourites(state, joke){
            if (!state.favourites.some(favJoke=>favJoke.id === joke.id) && joke.isFav) {
                state.favourites.push(joke);
                localStorage.setItem('jokes', JSON.stringify(state.favourites));
            }
            if (state.favourites.some(favJoke=>favJoke.id === joke.id) && !joke.isFav) {
               state.favourites = state.favourites.filter(favJoke=>favJoke.id !== joke.id);
                localStorage.setItem('jokes', JSON.stringify(state.favourites));
            }
            console.log(state.favourites)
        },
        deleteFavourite(state, id) {
            state.favourites = state.favourites.filter(favJoke=>favJoke.id !== id);
            localStorage.setItem('jokes', JSON.stringify(state.favourites));
        }
    }
})

export default store;