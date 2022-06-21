import { mount } from '@vue/test-utils'
import App from './../src/App.vue'



const wrapper = mount(App);


describe('Mounted App', () => {


    //test case 1 
    test('select a first course successful', async()=>{

        const modules = await wrapper.vm.fetchAllModules();
        let inputCourse = {}
        for (let i = 0; i <modules.length; i++){
            if (modules[i]["code"] == 2003 && modules[i]["subject"] == "BIO"){
            inputCourse = modules[i]
        }}

        let recievedOutput = await wrapper.vm.matchModules(inputCourse)

        // filter out outputs such that we only get subject and code
        let recievedOutputArray = []
        for (let i = 0; i < recievedOutput.length; i++) {
            let recievedOutputArrayELement = ""
            recievedOutputArrayELement += recievedOutput[i]["subject"]
            recievedOutputArrayELement +=recievedOutput[i]["code"]
            recievedOutputArray[i] = recievedOutputArrayELement
          }

        let expectedOutput =    [                                                                              
            'BIO2001', 'BIO2005', 'BIO2007',
            'BIO2010', 'BIO3010', 'CHE1101',
            'CHE2007', 'INT2009', 'INT2010',
            'INT3003', 'INT3008', 'MAT2006',
            'MAT2008', 'NEU1001', 'PHY1101',
            'PHY2002', 'PHY2004', 'PHY2008',
            'PHY3005', 'PHY3008', 'PRA1005',
            'PRA2002', 'PRA2005', 'PRA2011',
            'PRA2014', 'PRA2019', 'PRA2022',
            'PRA3012', 'PRA3014', 'PRA3017',
            'PRA3020', 'PRA3024'
          ]
        //console.log(recievedOutputArray.sort())
        recievedOutputArray = recievedOutputArray.sort()
        expect(recievedOutputArray).toEqual(expectedOutput)
    }) })
