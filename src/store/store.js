//import {createStore} from 'vuex'
import { defineStore } from 'pinia'

const favouritesData = JSON.parse(localStorage.getItem('jokes'));

//Pinia
export const useStore = defineStore('store', {
    state:()=> {
        return {
            loading: false,
            joke: {
                jokeText: "",
                id: "",
                isFav: false,
            },
            categories:[],
            favourites: favouritesData ? favouritesData : []
        }
    },
    getters:{
        getJoke: (state) => state.joke,
        getCategories: (state) => state.categories,
        getLoading: (state) => state.loading,
        getIsFavorite: (state) => {
            return state.favourites.some(favJoke=>favJoke.id===state.joke.id);
        },
        getFavorites: (state) => state.favourites,
    },

    actions: {
        async fetchJoke (category){
            console.log('debug here',category);
             const url = !category ? `https://api.chucknorris.io/jokes/random` :
               `https://api.chucknorris.io/jokes/random?category=${category}`;
            try {
                this.setLoading(true);
                const res = await fetch(url);
                const data = await res.json();
                this.setJoke(data);
                this.setLoading(false);
            }
            catch (error) {
                console.log(error)
           }
        },

        async fetchCategories() {
             try {
                const res = await fetch ('https://api.chucknorris.io/jokes/categories');
                const data = await res.json();
                this.saveCategories(data);
            }
            catch (error) {
                console.log(error);
            }
        },

        addToFavourites(joke) {
             const newJoke = {...joke, isFav: !joke.isFav};
             this.joke.isFav = newJoke.isFav;
             this.setFavourites(newJoke);

         },

        setLoading (isLoading){
            this.loading = isLoading;
        },

        setJoke(data) {
            this.joke.jokeText = data.value;
            this.joke.id = data.id;
            this.joke.isFav = false;
        },

        saveCategories(data){
            this.categories = data;
        },

        setFavourites(joke) {
            if (!this.favourites.some(favJoke=>favJoke.id === joke.id) && joke.isFav) {
                this.favourites.push(joke);
            }
            if (this.favourites.some(favJoke=>favJoke.id === joke.id) && !joke.isFav) {
                this.favourites = this.favourites.filter(favJoke=>favJoke.id !== joke.id);
            }
            localStorage.setItem('jokes', JSON.stringify(this.favourites));
        },

        deleteFromFavourites(id) {
             this.deleteFavourite(id);
         },

            deleteFavourite(id) {
            this.favourites = this.favourites.filter(favJoke=>favJoke.id !== id);
            localStorage.setItem('jokes', JSON.stringify(this.favourites));
        }
    },
})


//Vuex
// const store = createStore({
//     state(){
//         return  {
//             loading: false,
//             joke: {
//                 jokeText: "",
//                 id: "",
//                 isFav: false,
//             },
//             categories: [],
//             favourites: favouritesData ? favouritesData : [],
//         }
//     },
//
//     actions: {
//         async fetchJoke({commit}, category){
//             const url = !category ? `https://api.chucknorris.io/jokes/random` :
//                 `https://api.chucknorris.io/jokes/random?category=${category}`;
//             try {
//                 commit('setLoading', true)
//                 const res = await fetch(url);
//                 const data = await res.json();
//                 commit("setJoke", data)
//                 commit('setLoading', false)
//             }
//             catch (error) {
//                 console.log(error)
//             }
//         },
//
//         async fetchCategories({commit}) {
//             try {
//                 const res = await fetch ('https://api.chucknorris.io/jokes/categories');
//                 const data = await res.json();
//                 commit('saveCategories', data)
//             }
//             catch (error) {
//                 console.log(error);
//             }
//         }
//         ,
//         addToFavourites(context, joke) {
//             const newJoke = {...joke, isFav: !joke.isFav};
//             context.state.joke.isFav = newJoke.isFav;
//             context.commit('setFavourites', newJoke);
//         }
//         ,
//         deleteFromFavourites({commit}, id) {
//             commit('deleteFavourite', id)
//         }
//     }
// ,
//     getters: {
//         getJoke (state) {
//             return state.joke;
//         },
//         getCategories (state) {
//             return state.categories;
//         },
//         getLoading (state) {
//             return state.loading;
//         },
//         getIsFavorite (state) {
//             return state.favourites.some(favJoke=>favJoke.id===state.joke.id);
//         },
//         getFavorites (state) {
//             return state.favourites;
//         }
//     }
//     ,
//     mutations: {
//         setJoke(state, newJoke){
//             state.joke.jokeText = newJoke.value;
//             state.joke.id = newJoke.id;
//             state.joke.isFav = false;
//         },
//         saveCategories(state, fetchedCategories){
//             state.categories = fetchedCategories;
//         },
//         setLoading(state, isLoading) {
//             state.loading = isLoading;
//         },
//         setFavourites(state, joke){
//             if (!state.favourites.some(favJoke=>favJoke.id === joke.id) && joke.isFav) {
//                 state.favourites.push(joke);
//
//             }
//             if (state.favourites.some(favJoke=>favJoke.id === joke.id) && !joke.isFav) {
//                state.favourites = state.favourites.filter(favJoke=>favJoke.id !== joke.id);
//             }
//         },
//         deleteFavourite(state, id) {
//             state.favourites = state.favourites.filter(favJoke=>favJoke.id !== id);
//             localStorage.setItem('jokes', JSON.stringify(state.favourites));
//         }
//     }
// })

//export default useStore;