



import { mount } from '@vue/test-utils'
import App from './../src/App.vue'



const wrapper = mount(App);


describe('Mounted App', () => {
 

    test("Select a practical first",async()=>{

    let expectedOutput =  [
      'BIO2001', 'BIO2003',
      'BIO2005', 'BIO2010',
      'BIO3010', 'CHE2001',
      'INT1003', 'INT2008',
      'INT3008', 'INT3010',
      'MAT2006', 'MAT2008',
      'PHY1101', 'PHY2004',
      'PHY3005'
    ]
      let modules = await wrapper.vm.fetchAllModules();
        let inputCourse1 = {}

        // test what we output when only practical is selected
        for (let i = 0; i <modules.length; i++){
            if (modules[i]["code"] == 3024 && modules[i]["subject"] == "PRA"){
            inputCourse1 = modules[i]
        }}
        
        let recievedOutput = await wrapper.vm.matchModules(inputCourse1)


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
