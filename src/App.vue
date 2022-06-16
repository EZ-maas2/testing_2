<template>
  <div class="flex flex-col justify-center items-center text-center h-96 flex-wrap">
    <div class="max-w-max my-1" v-for="m in modules" :key="m.id">
      <button 
      class="bg-slate-300 shadow-lg px-4 py-2 rounded-full hover:bg-slate-100" 
      @click="matchModules(m)">
      {{m.subject}}{{m.code}}
      </button>
    </div>
  </div>

  <!-- <div class="flex flex-col justify-center items-center text-center h-96 flex-wrap">
    <div class="max-w-max my-1" v-for="m in courses" :key="m.id">
      <button 
      class="bg-sky-300 shadow-lg px-4 py-2 rounded-full hover:bg-sky-100" 
      @click="triggerRemoveCourse(m.id, m.subject, m.code, m.start1, m.end1, m.start2, m.end2)">
      {{m.subject}}{{m.code}}
      </button>
    </div>
    <div class="max-w-max my-1" v-for="m in practicals" :key="m.id">
      <button 
      class="bg-amber-300 shadow-lg px-4 py-2 rounded-full hover:bg-amber-100" 
      @click="triggerRemovePractical(m.id, m.subject, m.code, m.start1, m.end1)">
      {{m.subject}}{{m.code}}
      </button>
    </div>
  </div> -->
  <div v-for="(choice, index) in choices" :key="index">
    {{choice.subject}}{{choice.code}}
  </div>
</template>


<script>
import { supabase } from "./supabase.js"
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      modules: [],
      courses: [],
      practicals: [],
      choices: [],
      testListOfAvailableModules: []
    }
  },
  mounted() {
    //this.matchModules();
    this.fetchAllModules();
  },
  methods: {
    async fetchAllCourses() {
      const response = await supabase
        .from('courses')
        .select()
      this.courses = response.data;
    },

/*
--------------------------------------------------------------------------------------------
@requires: all modules available for selection (provided by calling it on fetchAllModules())

@requires: all of the column entries of the module that user selects, specifically id in the data table, 
subject(PRA/NEU/MAT/etc.), code(1011/3008/etc.), and start-end time pairs in Date format,
where each pair corresponds to day of the week and the specific timeslot 
(i.e. 2022-06-14 8:30, 2022-06-14 10:30 which corresponds to Monday morning slot)

@returns:  all of the options available after the selection has been made

TODO: assert that no more than two courses can be available for selection
TODO: refactor! the functions used for filtering can be extracted to improve readability
*/

    matchModules(selectedModule) {

      // console.log(selectedModule.code)

      // ----- Scenario 1: Practical was selected, show all courses available for selection

      if (selectedModule.subject == 'PRA') {
        
        // We dont want to remove them now APPARENTELY
        // // Step 1: remove all other practicals from availability list
        // this.modules = this.modules.filter(function(practical) {
        //  return practical.subject !== 'PRA'
        // })

        // Step 2: compare timeslot for each course in the availability list and remove overlapping ones
        this.modules = this.modules.filter(courseInTheTable => this.filterOutPractical(courseInTheTable, selectedModule))
      }

      // ----- Scenario 2: Course was selected, show all practicals and courses available for selection
      else {

        // show all available courses
        this.modules = this.modules.filter(function(course) {

        // get timeslots for the course from the list of available courses
          const rangeCourseDay1 = moment.range(course.start1, course.end1)
          const rangeCourseDay2 = moment.range(course.start2, course.end2)

        // get timeslots of the course that was selected (input course)
          const rangePracticalDay1 = moment.range(selectedModule.start1, selectedModule.end1);
          const rangePracticalDay2 = moment.range(selectedModule.start2, selectedModule.end2);

          // if at least one timeslot overlaps -> remove course
          return (!(rangeCourseDay1.overlaps(rangePracticalDay1) || rangeCourseDay1.overlaps(rangePracticalDay2)) || !(rangeCourseDay2.overlaps(rangePracticalDay1) || rangeCourseDay2.overlaps(rangePracticalDay2)))
        })

        // show all available practicals
        this.modules = this.modules.filter(practicalInTheTable => this.filterOutPractical(selectedModule, practicalInTheTable))
      }
      this.addChoice(selectedModule.id, selectedModule.subject, selectedModule.code);
      return this.modules
    },
//--------------------------------------------------------------------------------------------

    async fetchAllModules() {
      const response = await supabase
        .from('modules')
        .select()
        .eq('period', 4)
      this.modules = response.data;
      this.modules.forEach(element => {
        if (element.start1 != null) {
          element.start1 = new Date(element.start1);
          element.end1 = new Date(element.end1);
        }
        // element.start1 = new Date(element.start1);
        // element.end1 = new Date(element.end1);
        if (element.start2 != null) {
          element.start2 = new Date(element.start2);
          element.end2 = new Date(element.end2);
        }
        if (element.start3 != null) {
          element.start3 = new Date(element.start3);
          element.end3 = new Date(element.end3);
        }
      });
      return this.modules
      // console.log(this.modules)
    },
    addChoice(id, subject, code) {
      // console.log('Hi')
      const choice = {
        id: id,
        subject: subject,
        code: code
      };
      this.choices = [...this.choices, choice]
      return this.choices
    },

    /* @requires: practical input and course input, one of which will correspond to the selected module 
    and the other will represent the module object passed in by the filter function, as per selectedModule() function
    */
    filterOutPractical(course, practical){
      {   
          // get timeslots of the course 
          const rangeCourseDay1 = moment.range(course.start1, course.end1)
          const rangeCourseDay2 = moment.range(course.start2, course.end2)

           // get the timeslot for the first day when the practical is offered
          const rangePracticalDay1 = moment.range(practical.start1, practical.end1)

          // if the practical is only offered on one day
           if (practical.start2 == null) 
           {
            return (!(rangeCourseDay1.overlaps(rangePracticalDay1) || rangeCourseDay2.overlaps(rangePracticalDay1)))
          }

          // if the practical is offered on two different days
          if ((practical.start3 == null) && (practical.start2 !== null)) {
            const rangePracticalDay2 = moment.range(practical.start2, practical.end2);

            return(!(rangeCourseDay1.overlaps(rangePracticalDay1) || rangeCourseDay2.overlaps(rangePracticalDay1)) 
            || !(rangeCourseDay1.overlaps(rangePracticalDay2) || rangeCourseDay2.overlaps(rangePracticalDay2)))

          }

          // if the practical is offered on three different days
          if (practical.start3 !== null) {
            const rangePracticalDay2 = moment.range(practical.start2, practical.end2);
            const rangePracticalDay3 = moment.range(practical.start3, practical.end3);

            return (!(rangeCourseDay1.overlaps(rangePracticalDay1) || rangeCourseDay2.overlaps(rangePracticalDay1)) 
            || !(rangeCourseDay1.overlaps(rangePracticalDay2) || rangeCourseDay2.overlaps(rangePracticalDay2)) 
            || !(rangeCourseDay1.overlaps(rangePracticalDay3) || rangeCourseDay2.overlaps(rangePracticalDay3)))
          }}},

          // needed to extract the list after the selection has been made for testing purposes
          testMatchModules(){
            return  this.finalModuleListAfterMatching
          },
          getModules(){
            return this.modules

          },
          printHi(){
            return 'hi'
          }


  }
}
</script>
