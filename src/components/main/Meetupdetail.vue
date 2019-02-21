<template>
    <div>
        <div class="meetup-detail-intro">
            <div class="row container">
                <div class="col s8 meetup-detail-box" v-if="meetup">
                    <h2 class="meetup-detail-box-text1">{{ meetup.description }}</h2>
                    <h2 class="meetup-detail-box-text2">Organised by: <span class="text-dull"> {{ meetup.group }} </span></h2>
                    <div class="margin-top">
                        <h2 class="meetup-detail-box-text3 ">Date: <span class="text-dull"> {{ meetup.date }} </span></h2>
                        <h2 class="meetup-detail-box-text3 margin-left">Time: <span class="text-dull"> {{ meetup.time }} </span></h2>
                    </div>
                </div>
                <div class="col s4 center">
                    <h1 class="meetup-detail-box-text3">Are you interested?</h1>
                    <div class="rsvp-btn center">
                        <i class="medium material-icons">check</i>
                    </div>
                    
                    <div class="rsvp-btn center">
                         <i class="medium material-icons">clear</i>
                    </div>
                   
                </div>
            </div>
        </div>
       <div class="eventdetails row container">
           <div class="col s6">
               <h2 class="meetup-detail-box-text4">Event Details: <span class="text-dull2"> {{ meetup.details }} </span></h2>
           </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
// import slugify from 'slugify'

export default {
    name: 'Meetupdetail',
    data () {
        return {
             meetup: null
        }
    },
    created () {
        let ref = db.collection('meetups').where('slug', '==', this.$route.params.meetupdetail_slug )
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
.meetup-detail-intro{
    border-top: 2px solid #ab47bc;
    border-bottom: 2px solid #ab47bc;
    background: #fff;
    padding: 20px;
}

.meetup-detail-box-text1 {
  font-size: 50px;
  color: #111;
  font-weight: 600;
  padding: 0;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
}

.meetup-detail-box-text2 {
  font-size: 30px;
  color: rgba(46,62,72,.6);
  font-weight: 400;
  padding: 0;
  margin: 20px 0 0 0;
  font-family: 'Montserrat', sans-serif;
}
.meetup-detail-box-text3 {
  font-size: 20px;
  color: rgba(46,62,72,.6);
  font-weight: 200;
  padding: 0;
  margin: 0;
  display: inline;
  font-family: 'Montserrat', sans-serif;
}
.meetup-detail-box-text4 {
  font-size: 20px;
  color: #111;
  font-weight: 200;
  padding: 0;
  margin: 20px 0 0 0;
  display: inline;
  font-family: 'Montserrat', sans-serif;
}
.text-dull2{
    color:  rgba(46,62,72,.6);
    font-weight: 300;
    margin-top: 20px;
    display: block;
}
.margin-top{
    margin-top: 20px;
}
.margin-left{
    margin-left: 20px;
}
.text-dull{
    color: #ab47bc;
    font-weight: 600;
}
.rsvp-btn{
  font-weight: 400;
  font-size: 25px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 4px 28px;
  border-radius: 50px;
  transition: 0.5s;
  margin: 10px;
  border: 2px solid #ab47bc;
  color: #ab47bc;
  background: transparent;
  font-weight: bold; 
  font-family: 'Montserrat', sans-serif;
  width: 200px;
}
.rsvp-btn:hover{
  color: #fff;
  background: #ab47bc;
}
.eventdetails{
    margin-top: 40px;
}


@media only screen and (max-width: 600px) { 

  .row .col.s8{
      display: block;
      width: 100%;
  }

   .row .col.s4{
      display: block;
      width: 100%;
      margin: 20px auto;
  }

  .rsvp-btn{
      width: 90%;
      font-size: 5px;
  }

   .row .col.s6{
      display: block;
      width: 100%;
  }
}

@media only screen and (max-width: 800px) { 

  
}
</style>

