<template>
    <div class="navbar-fixed">
        <nav id="mynav">
            <div class="container">
                <router-link :to="{ name: 'Index' }" class="brand-logo left">Sightionaire</router-link>
                <ul class="right">  
		                  <li v-if="!user"><router-link :to="{ name: 'Login' }"> Log in </router-link></li>

                      <li  v-if="!user"><router-link :to="{ name: 'Signup' }"> Sign up </router-link></li>
                      <li class="nav-email" v-if="user"><a> {{ user.email }} </a></li>
                      <li  v-if="user"><a @click="logout">Logout</a></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Navbar',
  data () {
    return {
      user: null
    }
  },
  methods: {
         logout() {
           firebase.auth().signOut().then(() => {
             this.$router.push({ name: 'Index'})
           })
         }
  },
      created () {
            window.onscroll = () => {
          const nav = document.querySelector('#mynav');
          if(this.scrollY <= 10) nav.className = ''; else nav.className = 'scroll';
        },
        // conditionally output nacbar links on authentication change
        firebase.auth().onAuthStateChanged((user) => {
          if(user){
              this.user = user
          } else {
              this.user = null
          } 
        })
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.scroll { background-color:#ab47bc; }


nav .nav-content{
  
}
nav {
     background: transparent;
     box-shadow: none;

}

.p-width{
  width: 90%;
  margin: auto;
  overflow: hidden;
}

.fz{
  font-size: 25px;
}
.brand-logo{
  text-transform: uppercase;
  line-height: 1;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 3px;
   margin: 20px 0 0 0;
  padding: 0;
  
}

@media (max-width: 700px) { 
    .brand-logo{
      font-size: 15px;
    }

    .right{
      display: block;

    }

}
</style>
