<template>
   <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark salmon">
      <q-toolbar class="nav">
        <q-toolbar-title>
          Ticket Management
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs class="tab">
          <q-route-tab
            :to="{name:'Home'}"
            replace
            label="DashBoard"
            />
            <q-route-tab
            :to="{name:'Create'}"
            replace
            label="Raise a Ticket"
            />
        </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
 
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import {defineComponent} from 'vue'
export default defineComponent ({
  name: 'LayoutDefault',

  components: {
      /* HelloWorld   */
  },
})
</script>
<style scoped>
.nav{
  height: 50px;
  text-align: center;
  font-size: 25;
}
</style>