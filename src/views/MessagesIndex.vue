<template>
  <div class="messages-index">
    <h2>New Message</h2>
    <form v-on:submit.prevent="createMessage()">
      <textarea v-model="newMessageParams.body" cols="30" rows="5"></textarea
      ><br />
      <input type="submit" value="Create" />
    </form>
    <div v-for="message in messages" v-bind:key="message.id">
      <p>
        <strong>{{ message.user.name }}</strong
        >: {{ message.created_at }}
      </p>
      <p>{{ message.body }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ActionCable from "actioncable";

export default {
  data: function () {
    return {
      messages: [],
      newMessageParams: {}
    };
  },
  created: function () {
    axios.get("/messages").then((response) => {
      console.log(response.data);
      this.messages = response.data;
    });
    var cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    cable.subscriptions.create("MessagesChannel", {
      connected: () => {
        // Called when the subscription is ready for use on the server
        console.log("Connected to MessagesChannel");
      },
      disconnected: () => {
        // Called when the subscription has been terminated by the server
      },
      received: (data) => {
        // Called when there's incoming data on the websocket for this channel
        console.log("Data from MessagesChannel:", data);
        // push the data into the array of messages
        this.messages.unshift(data);
      }
    });
  },
  methods: {
    createMessage: function () {
      axios.post("/messages", this.newMessageParams).then((response) => {
        console.log(response.data);
      });
    }
  }
};
</script>
