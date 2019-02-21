<template>
    <div class="create-meetup container7">
         <h2 class="center purple-text text-lighten-1">Create a meetup</h2>

        <form class="card-panel" @submit.prevent="createMeetup">
            <div class="field">
                <label for="group">Group or Association:</label>
                <input id="group" type="text" name="group" v-model="group">
            </div>
            <div class="field">
                <label for="description">Meetup Description</label>
                <input id="description" type="text" v-model="description">
            </div>
            <div class="field">
                <label for="time">Time</label>
                <input id="time" type="time" v-model="time">
            </div>
            <div class="field">
                <label for="date">Date</label>
                <input id="date" type="date" v-model="date">
            </div>
            <div class="field">
                <label for="details">Meetup details</label>
                <textarea  id="details" type="text" v-model="details" cols="30" rows="10"></textarea>
            </div>
            <div v-for="(hash, index) in hashtags" :key="index" class="field">
                <label for="hashtags">Hashtags</label>
                <input id="hashtags" type="text" v-model="hashtags[index]">
                <i class="material-icons delete-hash" @click="deleteHash(hash)">delete</i>
            </div>
            <div class="field">
                <label for="hashtags">Meetup hashtags</label>
                <input id="hashtags" type="text" @keydown.tab.prevent="addHashTag" v-model="another">
            </div>
            <p v-if="feedback" class="red-text center">{{ feedback }}</p>
            <div class="field center">
                <button class="create-meetup-btn">Create meetup</button>
            </div>
        </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'Createmeetup',
    data () {
        return {
            group: null,
            description: null,
            time: null,
            date: null,
            feedback: null,
            another: null,
            details: null,
            hashtags: [],
            slug: null
        }
    },
    methods: {
        createMeetup() {
            if(this.group && this.description && this.time && this.date && this.details){
                this.feedback = null
                // create slug (url)
                this.slug = slugify(this.description, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                //  communicate and add new meetup to the database
                 db.collection('meetups').add({
                    group: this.group,
                    description: this.description,
                    time: this.time,
                    date:this.date,
                    details: this.details,
                    hashtags: this.hashtags,
                    slug: this.slug

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
                this.hashtags.push(this.another)
                this.another = null
                this.feedback = null
            }else {
                this.feedback = 'You must enter hashtags to create a meetup'
            }
        },
        deleteHash(hash) {
            this.hashtags = this.hashtags.filter(hashtags => {
                return hashtags != hash
            })
        }
    }
}
</script>

<style>
.container7{
    width: 40%;
    box-sizing: border-box;
    overflow: hidden;
    margin: 20px auto;
}
label {
    font-size: 20px;
}
.create-meetup-btn{
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

.create-meetup-btn:hover {
  color: #fff;
  background: #ab47bc;
}
.field {
    position: relative;
}
.delete-hash{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 25px;
    cursor: pointer;
}
textarea{
    height: 70px;
    padding: 10px;
    border: none;
    border-bottom: 1px solid #9e9e9e;
}
@media only screen and (max-width: 600px) { 
    .container7{
    width: 95%;
}
}

@media only screen and (max-width: 800px) { 
    .container7{
    width: 80%;
}
}
</style>

