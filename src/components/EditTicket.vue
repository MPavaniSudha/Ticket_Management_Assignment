<template>
   <q-page class="column items-center justify-center">
    <div class="q-pa-md bg-image">
    <q-layout class="vertical-center ">
      <center>
      <q-card class="q-pa-lg">
      <q-form class="q-gutter-md vertical-center "><br/>
        
        <q-input
          filled
          type="text"
          v-model="RaiseTicket.UserName"
          label="Enter Your Name *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-select
          filled
          v-model="RaiseTicket.Title"
          :options="options"
          label="Enter Your Title *"
        />

        <q-select
          filled
          v-model="RaiseTicket.status"
          :options="option"
          label="Enter Status *"
        />

        <q-input
          filled
          formatModel="string"
          format="YYYY/MM/DD"
          v-model="RaiseTicket.Date"
          type="date"
          :rules="[(val) => (val && val.length > 0) || 'When is missing']"
        />
        <center>
          <div class="row justify-evenly">
            <q-btn
              label="Submit"
              type="button"
              v-on:click="updateTicket"
              color="green"
            ></q-btn>
            <q-btn
              label="Cancel"
              type="button"
              v-on:click="Cancel"
              color="red"
            ></q-btn> 
          </div>
        </center>
      </q-form>
         </q-card>
      </center>
    </q-layout>
  </div>
   </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: "EditTicket",
  data() {
    return {
           RaiseTicket:{
                 TicketNo:"",
                 UserName: "",
                 Title: "",
                 status: "",
                 Date: "",
            },
            options: [
                    'Page Error', 
                     "Server Busy",
                    'Page Buffering', 
                    'Server Error', 
                    'Server Not Responding', 
                    'Page is Not Loading'
      ],
            option:[
                'Pending',
                'Approved',
                'Closed'
            ],
    };
  },
  methods: {
     async updateTicket() 
    {
      console.warn(this.RaiseTicket);
      const data= await axios.put("http://localhost:3000/RaiseTickets/"
      + this.$route.params.id,
      {
        UserName:this.RaiseTicket.UserName,
        Title:this.RaiseTicket.Title,
        status:this.RaiseTicket.status,
         Date:this.RaiseTicket.Date
      });
      if(data.status==200)
      {
        this.$router.push({name:'Home'});
      }
      console.warn("data",data);
      alert("Ticket Updated Successfully"); 
    },
    Cancel()
    {
      this.$router.push({name:'Home'});
    }
 },
  
async mounted() {
    const result = await axios.get(
      "http://localhost:3000/RaiseTickets/" + this.$route.params.id
    );
    console.warn(result.data);
    this.RaiseTicket = result.data;
}
}
</script>

<style scoped>
.q-pa-lg {
   width: 450px;

}
.q-gutter-md {
  height: 400px;
  width: 400px;
}
 .bg-image {
    height:550px;
    width: 1330px;
    background-image: url(https://images.unsplash.com/photo-1550522667-09c9bdb293a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80);
    background-repeat: no-repeat;
    background-size: cover;
  
  }
</style>