import { mount } from '@vue/test-utils'
import App from './../src/App.vue'



const wrapper = mount(App);


describe('Mounted App', () => {
    test("testing tests", () =>{
        expect(1).toBe(1)
    })


    test('does a wrapper exist', () => {
      expect(typeof wrapper.vm.getModules).toBe('function')
    })

    //test case 1 
    test('select a first course successful', async()=>{
        // get all modules
        //modules is a dictionary type
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
        expect(recievedOutputArray.sort()).toEqual(expectedOutput)
    }),

    test("Given we selected a course, select a second course", async ()=>
    {
        let expectedOutput =    [
            'BIO2001', 'BIO2005', 'BIO2010',
            'BIO3010', 'CHE2007', 'INT2009',
            'INT3003', 'INT3008', 'MAT2006',
            'MAT2008', 'PHY1101', 'PHY2004',
            'PHY2008', 'PHY3005', 'PHY3008',
            'PRA1005', 'PRA2002', 'PRA2014',
            'PRA2019', 'PRA2022','PRA3012',
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


        // filter out outputs such that we only get subject and code
        let recievedOutputArray = []
        for (let i = 0; i < recievedOutput.length; i++) {
            let recievedOutputArrayELement = ""
            recievedOutputArrayELement += recievedOutput[i]["subject"]
            recievedOutputArrayELement +=recievedOutput[i]["code"]
            recievedOutputArray[i] = recievedOutputArrayELement
          }
       
        expect(recievedOutputArray.sort()).toEqual(expectedOutput)
    }),

    test("Given we have selected a course, select a practical",async()=>{

    let expectedOutput =  [
        'BIO2001', 'BIO2005',
        'BIO2010', 'BIO3010',
        'INT3008', 'MAT2006',
        'MAT2008', 'PHY1101',
        'PHY2004', 'PHY3005',
        'PRA1005', 'PRA2002',
        'PRA2014', 'PRA2019',
        'PRA2022', 'PRA3012',
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
            if (modules[i]["code"] == 3024 && modules[i]["subject"] == "PRA"){
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
        
          console.log("Recieved:")
          console.log(recievedOutputArray.sort())
          console.log("Expected:")
          console.log(expectedOutput)
        expect(recievedOutputArray.sort()).toEqual(expectedOutput)
}
)
      
  })
