<template>
    <div class="">
       <div class="edit-meetup container9" v-if="meetup">
            <h2 class="center purple-text text-lighten-1">Edit {{ meetup.description }}</h2>

            <form class="card-panel" @submit.prevent="editMeetup">

            <div class="field">
                <label for="group">Group or Association:</label>
                <input id="group" type="text" name="group" v-model="meetup.group">
            </div>
            <div class="field">
                <label for="description">Meetup Description</label>
                <input id="description" type="text" v-model="meetup.description">
            </div>
            <div class="field">
                <label for="time">Time</label>
                <input id="time" type="time" v-model="meetup.time">
            </div>
            <div class="field">
                <label for="date">Date</label>
                <input id="date" type="date" v-model="meetup.date">
            </div>
            <div v-for="(hash, index) in meetup.hashtags" :key="index" class="field">
                <label for="hashtags">Hashtags</label>
                <input id="hashtags" type="text" v-model="meetup.hashtags[index]">
                <i class="material-icons edit-hash" @click="deleteHash(hash)">delete</i>
            </div>
            <div class="field">
                <label for="hashtags">Meetup hashtags</label>
                <input id="hashtags" type="text" @keydown.tab.prevent="addHashTag" v-model="another">
            </div>
            <p v-if="feedback" class="red-text center">{{ feedback }}</p>
            <div class="field center">
                <button class="edit-meetup-btn">Update meetup</button>
            </div>
        </form>
       </div>
       
    </div>
</template>

<script>
// import firestore database

import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'Editmeetup',
    data () {
        return {
            meetup: null,
            another: null,
            feedback: null
        }
    },
    methods: {
        editMeetup () {
            if(this.meetup.group && this.meetup.description && this.meetup.time && this.meetup.date){
                this.feedback = null
                // create slug (url)
                this.meetup.slug = slugify(this.meetup.description, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                //  communicate with the database, get the doc 
                 db.collection('meetups').doc(this.meetup.id).update({
                    group: this.meetup.group,
                    description: this.meetup.description,
                    time: this.meetup.time,
                    date:this.meetup.date,
                    hashtags: this.meetup.hashtags,
                    slug: this.meetup.slug
                 }).then(() => {
                     this.$router.push({ name: 'meetup'})
                 }).catch( err => {
                     console.log(err)
                 })

            } else{
                this.feedback = 'You must enter all the fields to create a meetup'
            }
        },
        addHashTag() {
            if(this.another){
                this.meetup.hashtags.push(this.another)
                this.another = null
                this.feedback = null
            }else {
                this.feedback = 'You must enter hashtags to create a meetup'
            }
        },
        deleteHash(hash) {
            this.meetup.hashtags = this.meetup.hashtags.filter(hashtags => {
                return hashtags != hash
            })
        }
        
    },
    created () {
        let ref = db.collection('meetups').where('slug', '==', this.$route.params.editmeetup_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.meetup = doc.data()
                this.meetup.id = doc.id
            })
        })
    }
}
</script>

<style>
.container9{
    width: 40%;
    box-sizing: border-box;
    overflow: hidden;
    margin: 20px auto;
}
label {
    font-size: 20px;
}
.edit-meetup-btn{
  font-weight: 400;
  font-size: 25px;
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

.edit-meetup-btn:hover {
  color: #fff;
  background: #ab47bc;
}
.field {
    position: relative;
}
.edit-hash{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 25px;
    cursor: pointer;
}

@media only screen and (max-width: 800px) { 
 .container9{
    width: 95%;
  }
}

@media only screen and (max-width: 600px) { 
 .container9{
    width: 95%;
  }
}
</style>

