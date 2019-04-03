Vue.component('Principal', {
  props: {
    text: {
      type: String,
      default: 'Principal'
    }
  },
  template: `
    <h1>{{text}}</h1>  
  `
});

Vue.component('Cercador', {
  template: `
    <div>
      <label>Cercar:</label>
      <input type="text" 
        v-on:keyup.enter.esc="$emit('input', $event.target.value)" />
    </div>
  `
});

Vue.component('LlistaNaus', {
  props: {
    nau: {
      type: Object
    }
  },
  template: `
    <li>
      {{nau.name}} <button v-on:click="$emit('nau-selected', nau.url)">veure</button>
    </li>
  `
});

Vue.component('LlistaPilots', {
  computed: {
    pilots: function() {
      return this.$store.state.pilots;
    }
  },
  template: `
    <div>
      <h2>Pilots</h2>
      <ul v-if="pilots.length > 0">
        <PilotItem v-for="pilot in pilots" v-bind:key="pilot.url" v-bind:pilot="pilot" />
      </ul> 
    </div>
  `
});

Vue.component('PilotItem', {
  props: {
    pilot: {
      type: Object
    }
  },
  template: `
    <li>
      <h3>Nom: <small>{{pilot.name}}</small></h3>
    </li>
  `
});

Vue.component('DadesNau', {
  props: {
    label: String,
    value: String
  },
  template: `
  <h3>{{label}}: <small>{{value}}</small></h3>
  `
});

Vue.component('NauActual', {
  computed: {
    nau: function() {
      return this.$store.state.nau;
    }
  },
  template: `
    <div v-show="nau.name">
      <h2>Nau Actual</h2>

      <DadesNau label="Nom" v-bind:value="nau.name" />
      <DadesNau label="Fabricant" v-bind:value="nau.manufacturer" />
      <DadesNau label="Classe" v-bind:value="nau.starship_class" />
      <DadesNau label="Tripulacio" v-bind:value="nau.crew" />

      <slot></slot>
    </div>
  `
});

var app = new Vue({
  el: '#app',
  data: {
    appLabel: 'Cercador'
  },
  store,
  computed: {
    naus: function() {
      return this.$store.state.naus.results;
    }
  },
  methods: {
    search: function(search) {
      store.dispatch('search', { searchText: search });
    },
    veureNau: function(url) {
      this.$store.dispatch({ type: 'setShip', url: url });
    }
  },
  template: `
      <div>

        <Principal v-bind:text="appLabel"/>

        <Cercador v-on:input="search" />
                
        <ul>
          <LlistaNaus 
            v-for="nau in naus" 
            v-bind:key="nau.url" 
            v-bind:nau="nau" 
            v-on:nau-selected="veureNau" />
        </ul>

        <NauActual>
          <LlistaPilots />
        </NauActual>

      </div>
      `
});