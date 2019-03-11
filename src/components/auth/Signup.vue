<template>
   <div class="signup container3">
    <form class="card-panel" @submit.prevent="signup">
      <h2 class="center purple-text text-lighten-1">Signup</h2>
      <div class="field">
        <label for="name">Name</label>
        <input id="name" type="text" v-model="name">
      </div>
      <div class="field">
        <label for="name">Username</label>
        <input id="username" type="text" v-model="username">
      </div>
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
        <button class="intro-btn">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
import firebase from 'firebase'

export default {
    name: 'Signup',
    data () {
        return {
            feedback: null,
            email: null,
            password: null,
            name: null,
            username: null,
            slug: null
        }
    },
        methods: {
            signup () {
              if(this.name && this.username && this.email && this.password){
                this.slug = slugify(this.username, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true   
                })
                let ref = db.collection('users').doc(this.slug)
                ref.get().then(doc => {
                  if(doc.exists){
                    this.feedback = 'This username already exists'
                  } else {
                    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then(cred => {
                      ref.set({
                        name: this.name,
                        username: this.username,
                        user_id: cred.user.uid
                      })
                    }).then(() => {
                      this.$router.push({ name: 'meetup' })
                    })
                    .catch(err => {
                      console.log(err)
                      this.feedback = err.message
                    })
                    this.feedback = 'This username is available'
                  }
                })
                console.log(this.slug)
                this.feedback = null
              }else {
                this.feedback = 'You must enter all fields'
              }
            }
        }
}
</script>

<style>
.signup{
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


