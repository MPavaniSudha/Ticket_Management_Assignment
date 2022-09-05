import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import router from '@/router'

import CreateTicket from '@/components/CreateTicket.vue'


const wrapper=mount(CreateTicket);

describe('CreateTicket.vue', () => {
  
  it('renders has a button',() => {
    expect(wrapper.html()).toContain("q-btn")
  })

  it('renders a component via routing', async () => {
    // create local router
    const router = createRouter({
      history: createWebHistory(),
      routes: [{
        path: '/CreateTicket',
        name: 'Create',
        component: CreateTicket
      }]
    })
   // navigate to route
    router.push('/CreateTicket')
   // await navigation from push()
    await router.isReady()
   // install the local router
    const wrapper = mount(CreateTicket, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.findComponent(CreateTicket).exists()).toBe(true)
  })

  it('renders a method when all values are submitted',() => {
    const response = new Promise((resolve)=>{
      resolve({})
    })
    const wrapper = mount(CreateTicket, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.vm.createTicket()).toStrictEqual(response)
  })
});

