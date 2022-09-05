import { mount } from '@vue/test-utils'
import router from '@/router'
import HomePage from '@/components/HomePage.vue'


describe('HomePage.vue', () => {
    
    it("renders a method to navigate the page", async() => {     
    const wrapper = mount(HomePage, {
        global: {
          plugins: [router]
        }
      })
    expect(wrapper.vm.onEdit()).toBe(undefined);
  })

})