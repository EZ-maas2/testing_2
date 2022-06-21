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
      removedModules: [], // maybe make a nested array with three entries (removed after first selection, removed after second selection, removed after last selection_)
      choices: [],
      canMakeChoice: true
    }
  },
  mounted() {
    //this.matchModules();
    this.fetchAllModules();
  },
  methods: {
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
      this.checkChoices();
      return this.choices
    },
    checkChoices() {
      var iterator = 0;
      this.choices.forEach(element => {
        if (element.subject !== 'PRA') {
          iterator++;
        }
      })

      // iterator corresponds to  the number of courses that have been selected
      if (iterator == 2) {
        this.modules = this.modules.filter(course => course.subject == 'PRA')
      }

      if (this.choices.length == 3) {
        this.canMakeChoice = false;
        this.modules = []
        
      }
      else {
        this.canMakeChoice = true;
      }

      // console.log(this.canMakeChoice)
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

      if (this.canMakeChoice) {

          // ----- Scenario 1: Practical was selected, show all courses available for selection

          if (selectedModule.subject == 'PRA') {
            // Step 1: remove all other practicals from availability list
            this.modules = this.modules.filter(function(practical) {
            return practical.subject !== 'PRA'
            })
            // Step 2: compare timeslot for each course in the availability list and remove overlapping ones
            this.modules = this.modules.filter(courseInTheTable => this.filterPractical(courseInTheTable, selectedModule, false))
          }

          // ----- Scenario 2: Course was selected, show all practicals and courses available for selection
          else {
            // show all available courses
            this.modules = this.modules.filter(function(course) {

            // get timeslots for the course from the list of available courses
              const rangeCourseDay1 = moment.range(course.start1, course.end1)
              const rangeCourseDay2 = moment.range(course.start2, course.end2)

            // get timeslots of the course that was selected (input course)
              const rangeChosenCourseDay1 = moment.range(selectedModule.start1, selectedModule.end1);
              const rangeChosenCourseDay2 = moment.range(selectedModule.start2, selectedModule.end2);

              // if at least one timeslot overlaps -> remove course
              return (!(rangeCourseDay1.overlaps(rangeChosenCourseDay1) || rangeCourseDay1.overlaps(rangeChosenCourseDay2)) || !(rangeCourseDay2.overlaps(rangeChosenCourseDay1) || rangeCourseDay2.overlaps(rangeChosenCourseDay2)))
            })

            // show all available practicals
            this.modules = this.modules.filter(practicalInTheTable => this.filterPractical(selectedModule, practicalInTheTable, true))
          }
          this.addChoice(selectedModule.id, selectedModule.subject, selectedModule.code);

          return this.modules
        }
  },      

           /* @requires: practical input and course input, one of which will correspond to the selected module 
          and the other will represent the module object passed in by the filter function, as per selectedModule() function
          */
          filterPractical(course, practical, removingPracticalsFromAvailabilityList)
          {
            // extract the course ranges
            const rangeCourseDay1 = moment.range(course.start1, course.end1)
            const rangeCourseDay2 = moment.range(course.start2, course.end2)
            // create the course range array
            let courseRanges = [rangeCourseDay1, rangeCourseDay2]
            let practicalDays = [practical.start1, practical.start2, practical.start3]
            let practicalEnds = [practical.end1, practical.end2, practical.end3]
            let overlaps = []
            // we go over all three practical days..
            for (let i = 0; i < practicalDays.length; i++)
            {
              // and check if its not null
              if (practicalDays[i] !== null) 
              { 
                  overlaps[i] = false
                  let rangePractical = moment.range(practicalDays[i], practicalEnds[i])
                  courseRanges.forEach(courseRange =>
                  {
                      if (rangePractical.overlaps(courseRange))
                    {
                      overlaps[i] = true
                      if (removingPracticalsFromAvailabilityList)
                      {
                        switch (i)
                        {
                          case 0:
                            practical.start1 = null;
                            practical.end1 = null;
                            break;
                          case 1:
                            practical.start2 = null;
                            practical.end2 = null;
                            break;
                          case 2:
                            practical.start3 = null;
                            practical.end3 = null;
                            break;
                        }
                        } }}) }}

              let finalClause = false
              overlaps.forEach(clause => {
                finalClause = finalClause || !clause
              })
              return finalClause
            }
          }


  }

</script>


