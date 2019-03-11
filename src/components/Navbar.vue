<template>
    <div class="navbar-fixed">
        <nav id="mynav">
            <div class="container">
                <router-link :to="{ name: 'Index' }" class="brand-logo left">Sightionaire</router-link>
                <input type="checkbox" id="chk">
                <label for="chk" class="show-menu-btn">
                    <i class="fas fa-bars"></i>
                </label>

                <ul class="right menu">  
		                  <li v-if="!user"><router-link :to="{ name: 'Login' }"> Log in </router-link></li>

                      <li  v-if="!user"><router-link :to="{ name: 'Signup' }"> Sign up </router-link></li>
                      <li class="nav-email" v-if="user"><a> {{ user.email }} </a></li>
                      <li  v-if="user"><a @click="logout">Logout</a></li>
                      <label for="chk" class="hide-menu-btn">
                  <i class="fas fa-times"></i>
                      </label>
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


nav {
     background: rgba(0, 0, 0, 0.2);
     box-shadow: none;

}
.right{
  float: left;
}
.p-width{
  width: 90%;
  margin: auto;
  overflow: hidden;
}

.brand-logo{
  text-transform: uppercase;
  line-height: 1;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 3px;
   margin: 20px 0 0 0;
  padding: 0;
  font-size: 1.6rem !important;
}

.show-menu-btn, .hide-menu-btn{
    transition: 0.4s;
    font-size: 20px;
    display: none;
    cursor: pointer;
    color: #fff;
}
.show-menu-btn{
   float: right;
}
.show-menu-btn:hover, .hide-menu-btn:hover {
    color: #ab47bc;
}

.show-menu-btn i{
   line-height: 50px;
}
#chk{
    position: absolute;
    visibility: hidden;
    z-index: -1111;
}

@media screen and (max-width:800px) {
    .show-menu-btn, .hide-menu-btn{
        display: block;
    }

    .menu{
        position: fixed;
        width:100%;
        height: 900px;
        background: #333;
        right: -100%;
        top: 0;
        text-align: center;
        padding: 80px 0;
        line-height: normal;
        transition: 0.7s;
    }

    .menu li a{
        display: block;
        padding: 20px;
    }
    nav ul li{
      float: none;
    }

    .hide-menu-btn{
        position: absolute;
        top: 40px;
        right: 40px;
    }

    nav ul li:hover{
       background:  #ab47bc;
       font-size: 20px;
    }
    #chk:checked ~ .menu{
        right: 0;
      }
}
</style>
