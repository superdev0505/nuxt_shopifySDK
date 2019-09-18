import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
    if(process.browser) {
        window.onNuxtReady(() => {
            createPersistedState()(store)
        })
    }
  
}

console.log('localStorage Set');