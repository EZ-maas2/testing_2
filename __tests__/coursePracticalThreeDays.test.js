import { mount } from '@vue/test-utils'
import App from './../src/App.vue'



const wrapper = mount(App);


describe('Mounted App', () => {


    test("Given we have selected a course, select a practical (three days)",async()=>{

    let expectedOutput = [
        'BIO2001', 'BIO2005',
        'BIO2010', 'BIO3010',
        'INT3008', 'MAT2006',
        'MAT2008', 'PHY1101',
        'PHY2004', 'PHY3005'
      ]
      console.log(expectedOutput.sort())
      let modules = await wrapper.vm.fetchAllModules();
        let inputCourse1 = {}

        // test as if user selected BIO2003 first and BIO2007 second
        // Monday-Thursday
        for (let i = 0; i <modules.length; i++){
            if (modules[i]["code"] == 2003 && modules[i]["subject"] == "BIO"){
            inputCourse1 = modules[i]
        }}
        let inputCourse2 = {}
        // Monday-Tue-Thursday 
        // we can only take this on tuesday
        for (let i = 0; i <modules.length; i++){
            if (modules[i]["code"] == 2005 && modules[i]["subject"] == "PRA"){
            inputCourse2 = modules[i]
        }}
        
        let recievedOutput = await wrapper.vm.matchModules(inputCourse1)
        recievedOutput = await wrapper.vm.matchModules(inputCourse2)


        // filter out outputs such that we only get subject and code
        let recievedOutputArray = []
        for (let i = 0; i < recievedOutput.length; i++) {
            let recievedOutputArrayELement = ""
            recievedOutputArrayELement += recievedOutput[i]["subject"]
            recievedOutputArrayELement += recievedOutput[i]["code"]
            recievedOutputArray[i] = recievedOutputArrayELement
          }
        
       
        expect(recievedOutputArray.sort()).toEqual(expectedOutput)
}
)})