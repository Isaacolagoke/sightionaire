<template>
     <div class="login container container3">
        <form @submit.prevent="login" class="card-panel">
            <h2 class="center purple-text text-lighten-1">Login</h2>
      
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email">
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password">
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
          <button class="intro-btn">Login</button>
      </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Login',
    data () {
        return {
            feedback: null,
            email: null,
            password: null,
        }
    },
        methods: {
            login () {
              if (this.email && this.password){
                  firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                  .then(cred => {
                    console.log(cred.user)
                    this.$router.push({ name: 'meetup' })
                  }).catch(err => {
                    this.feedback = err.message
                  })
                  this.feedback = null
              } else {
                this.feedback = 'You must enter all fields to login'
              }
            }
        }
}
</script>

<style>
 .login{
    margin: 100px auto auto auto;
}
.container3{
    width: 40%;
    box-sizing: border-box;
     overflow: hidden;
}
label{
    font-size: 20px;
}
.intro-btn{
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 8px 28px;
  border-radius: 50px;
  transition: 0.5s;
  margin: 10px;
  border: 2px solid #ab47bc;
  color: #ab47bc;
  background: transparent;
  font-weight: bold; 
  font-family: 'Montserrat', sans-serif;
}
h2{
  font-size: 2.8rem !important;
}
.intro-btn:hover {
  color: #fff;
  background: #ab47bc;
} 

@media only screen and (max-width: 600px) { 

  .container3{
    width: 90%;
  }
}

@media only screen and (max-width: 800px) { 

  .container3{
    width: 90%;
  }
}
</style>


