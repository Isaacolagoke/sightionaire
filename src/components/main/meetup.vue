<template>
    <div>

        <div class="banner center">
            <h1>Find a meetup</h1>
        </div>
        <div class="meet-container">
            <div class="row container6">
                <!-- current meetups -->
                <div class="col s9">
                        <div class="cont-card">
                        <div class="container4">
                            <ul class="row" v-for="meetup in meetups" :key="meetup.id">
                                <li class="meetup-card">
                                    <div class="col s3">
                                        <h3 class="meetup-text2">{{ meetup.date }}</h3>
                                        <h3 class="meetup-text4">{{ meetup.time }}</h3>
                                    </div>
                                    <div class="col s8">
                                        <h3 class="meetup-text3">{{ meetup.group }}</h3>
                                        <h3 class="meetup-text1">{{ meetup.description }}</h3>
                                            <ul class="hashtags">
                                                <li v-for="(hash, index) in meetup.hashtags" :key="index">
                                                    <span class="chip">{{ hash }}</span>
                                                </li>
                                            </ul>   
                                    </div>
                                    <div class="col s1 center">
                                        <h3 class="meetup-text5">RSVP</h3>
                                        <router-link class="card-link" :to="{ name: 'Meetupdetail', params: { meetupdetail_slug: meetup.slug} }">
                                                    <i class="medium material-icons">add_circle</i>
                                        </router-link> 
                                    </div>   
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- add meetups -->
                <div class="col s3 container4">
                    <div class="create-meetup-card center">
                        <h2 class="create-meetup-text">Create meetup</h2>
                            <p class="create-meetup-text2">The excitment never stops, create your meetup with just a click</p>
                         <router-link class="card-link" :to="{ name: 'Createmeetup' }">
                                <a class="create-btn">Create Meetup</a>
                         </router-link> 
                    </div>
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
//import firestore database

import db from '@/firebase/init'

export default {
    data () {
        return {
           meetups: [] 
        }
    },
    methods: {
        
    },
    created() {
        //fetch data from the firestore
        db.collection('meetups').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let meetup = doc.data()
                meetup.id = doc.id
                this.meetups.push(meetup)
            })
        })
    }
}
</script>

<style>
/* .container4{
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    margin: 20px auto;

} */
.container6{
    width: 70%;
    box-sizing: border-box;
    overflow: hidden;
    margin: 20px auto;

}
.banner{
  border: 1px solid #ab47bc;
  background: linear-gradient(0deg, #ab47bc 0%, #a26dac 100%);
  padding: 50px;
}
.banner h1{
  font-size: 42px;
  color: #fff;
  text-align: center;
  font-weight: 400;
  padding: 0;
  margin: 0;
}
.row{
  
}
.meetup-card{
    background: #fff;
    width: 100%;
    height: 170px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    padding: 10px;
   
}
.create-meetup-card{
    background: #fff;
    width: 100%;
    height: 300px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    padding: 10px;
    margin-top: 15px;
}
.meetup-card:hover{
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3); 
}
/* 
.meetup-card h3 {
 
} */
.create-meetup-text{
  font-size: 32px;
  color: #111;
  font-weight: 400;
  padding: 0;
  margin: 5px 0 0 0;
}
.create-meetup-text2{
  font-size: 19px;
  color: #111;
  font-weight: 300;
  padding: 0;
  margin: 5px 0 0 0;
}
.create-btn{
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

.create-btn:hover {
  color: #fff;
  background: #ab47bc;
} 
.meetup-text1{
  font-size: 26px;
  color: #111;
  font-weight: 400;
  padding: 0;
  margin: 10px 0 0 0;
}

.meetup-text2{
  font-size: 23px;
  color: #111;
  font-weight: 300;
  padding: 0;
  margin: 0;
}

.meetup-text3{
   font-size: 20px;
  color: rgb(90, 86, 86);
  font-weight: 400;
  padding: 0;
  margin: 0;
}
.meetup-text4{
   font-size: 17px;
  color: rgb(90, 86, 86);
  font-weight: 400;
  padding: 0;
  margin: 20px 0 0 0;
}
.meetup-text5{
  font-size: 23px;
  color: #111;
  font-weight: 400;
  padding: 0;
  margin: 0;
}
.card-link{
    position: relative;
    top: 20px;
    color: #ab47bc;
    right: 5px;
}
.card-link:hover{
    color: #a772b1;
}
.hashtags ul{
   
}
.hashtags li{
    display: inline-block;
     margin: 20px auto; 
}

@media only screen and (max-width: 600px) { 

  .container6{
    width: 95%;
  }

  .meet-container .row .col.s9{
      display: block;
      width: 100%;
  }
.meetup-card {
    height: 350px;
}
  .row .col.s3{
      width: 100%;
      display: block;
  }
  .row .col.s8{
      width: 100%;
      display: block;
  }
  .row .col.s1{
      width: 100%;
      display: block;
      text-align: left;
  }
  /* .card-link{
    position: relative;
    left: 100px;
    top: -35px;
    
  } */

  .create-btn{
      display: block;
      margin: auto;
      width: 70%;
  }
}

@media only screen and (max-width: 800px) { 
 .container6{
    width: 95%;
  }

  .meet-container .row .col.s9{
      display: block;
      width: 100%;
  }
  .meetup-card {
    height: 250px;
}
  .row .col.s3{
      width: 100%;
      display: block;
  }
}
</style>


