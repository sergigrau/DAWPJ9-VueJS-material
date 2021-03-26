var store = new Vuex.Store({
  state: {
    nau: {},
    naus: { count: 0, results: [] },
    pilots: []
  },
  getters: {
    onlyStarFighters: function(state) {
      return state.naus.results.filter(function(nau) {
        return nau.starship_class === 'Starfighter';
      });
    },
    onlyStarFightersCount: function(state, getters) {
      return getters.onlyStarFighters.length;
    },
    setShip: function(state) {
      return function(url) {
        return state.naus.results.find(function(nau) {
          return nau.url === url;
        });
      };
    }
  },
  mutations: {
    setShips: function(state, payload) {
      state.naus = payload.newShips;
    },
    setShip: function(state, payload) {
      state.nau = payload.newShip;
    },
    clearPilots: function(state) {
      state.pilots = [];
    },
    addPilot: function(state, payload) {
      state.pilots.push(payload.newPilot);
    }
  },
  actions: {
    search: function(context, payload) {
      axios
        .get(`https://swapi.dev/api/starships/?search=${payload.searchText}`)
        .then(response => {
          context.commit('setShips', { newShips: response.data });
        });
    },
    setShip: function(context, payload) {
      context.commit('clearPilots');
      context.commit('setShip', {
        newShip: context.getters.setShip(payload.url)
      });
      context.dispatch('getPilots', { urls: context.state.nau.pilots });
    },
    getPilots: function(context, payload) {
      payload.urls.forEach(function(url) {
        axios.get(url).then(response => {
          context.commit('addPilot', { newPilot: response.data });
        });
      });
    }
  }
});