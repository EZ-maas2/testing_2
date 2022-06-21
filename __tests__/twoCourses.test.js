import { mount } from '@vue/test-utils'
import App from './../src/App.vue'



const wrapper = mount(App);


describe('Mounted App', () => {

    test("Given we selected a course, select a second course", async ()=>
    {
        let expectedOutput = [
            'PRA1005',
            'PRA2002',
            'PRA2014',
            'PRA2019',
            'PRA2022',
            'PRA3012',
            'PRA3014'
          ]

        let modules = await wrapper.vm.fetchAllModules();
        let inputCourse1 = {}

        // test as if user selected BIO2003 first and BIO2007 second
        for (let i = 0; i <modules.length; i++){
            if (modules[i]["code"] == 2003 && modules[i]["subject"] == "BIO"){
            inputCourse1 = modules[i]
        }}
        let inputCourse2 = {}
        for (let i = 0; i <modules.length; i++){
            if (modules[i]["code"] == 2007 && modules[i]["subject"] == "BIO"){
            inputCourse2 = modules[i]
        }}
        
        let recievedOutput = await wrapper.vm.matchModules(inputCourse1)

        recievedOutput = await wrapper.vm.matchModules(inputCourse2)

        let recievedOutputArray = []
    
        recievedOutput.forEach(element => {
            let recievedOutputArrayElement = ""
            recievedOutputArrayElement += element["subject"]
            recievedOutputArrayElement += element["code"]
            recievedOutputArray.push(recievedOutputArrayElement)
        });
          expect(recievedOutputArray).toEqual(expectedOutput)
    })
      
  })
