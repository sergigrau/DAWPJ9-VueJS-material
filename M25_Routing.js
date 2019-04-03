const error = {
  data: function() {
    return {
      url: window.location.hash
    };
  },
  template: `
  <div>
    <p>URL no encaminada : {{url}} </p>
  </div>
  `
};

const principal = {
  template: `
    <p>Benvinguts a Vue.js</p>
  `
};
const contacte = {
  template: `
    <p>sergi.grau@fje.edu</p>
  `
};

const rutes = {
  '#/': principal,
  '#/contacte': contacte
};

var app = new Vue({
  el: '#app',
  data: {
    rutaActual: window.location.hash,
    rutes: rutes
  },
  methods: {
    navegar: function($event) {
      this.rutaActual = $event.target.hash;
    }
  },
  computed: {
    vistaActual: function() {
      return this.rutes[this.rutaActual] || error;
    }
  },
  template: `
    <div>
      <ul>
        <li>
          <a href="#/" 
            v-on:click="navegar">
              Principal
          </a>
        </li>
        <li>
          <a href="#/contacte" 
            v-on:click="navegar">
              Contacte
          </a>
        </li>
      </ul>
      <div v-bind:is="vistaActual">        
      </div>
    </div>
    `
});