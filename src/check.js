filterOutPractical(course, practical, removingPracticalsFromAvailabilityList){
    {   
        // get timeslots of the course 
        const rangeCourseDay1 = moment.range(course.start1, course.end1)
        const rangeCourseDay2 = moment.range(course.start2, course.end2)

         // get the timeslot for the first day when the practical is offered
        const rangePracticalDay1 = moment.range(practical.start1, practical.end1)

        // if practical is only offered once a day 
        // we cant assume which day it is, so we check all three

        // first slot is not null
        if ((practical.start1 !== null )&& (practical.start2 == null) && (practical.start3 == null)) 
        {
        const rangePracticalDay1 = moment.range(practical.start1, practical.end1)
         return (!(rangeCourseDay1.overlaps(rangePracticalDay1) || rangeCourseDay2.overlaps(rangePracticalDay1)))
       }
// second slot is not null
       if ((practical.start2 !== null) && (practical.start1 == null) && (practical.start3 == null)) 
       {
       const rangePracticalDay1 = moment.range(practical.start2, practical.end2)
        return (!(rangeCourseDay1.overlaps(rangePracticalDay1) || rangeCourseDay2.overlaps(rangePracticalDay1)))
      }
// third slot is not null
      if ((practical.start3 !== null) && (practical.start1 == null) && (practical.start2 == null)) 
       {
       const rangePracticalDay1 = moment.range(practical.start3, practical.end3)
        return (!(rangeCourseDay1.overlaps(rangePracticalDay1) || rangeCourseDay2.overlaps(rangePracticalDay1)))
      }


        // if the practical is offered on two different days
        // first and second day are not null
        if ((practical.start3 == null) && (practical.start2 !== null) && (practical.start1 !== null)) {
          const rangePracticalDay2 = moment.range(practical.start2, practical.end2);
          const rangePracticalDay1 = moment.range(practical.start1, practical.end1)

          // make sure that it doesnt work when we have already selected 
          // a practical and now checking available courses
          const overlap1 = rangeCourseDay1.overlaps(rangePracticalDay1)
          const overlap2 = rangeCourseDay2.overlaps(rangePracticalDay1)

          const overlap3 = rangeCourseDay1.overlaps(rangePracticalDay2) 
          const overlap4 = rangeCourseDay2.overlaps(rangePracticalDay2)
          if (removingPracticalsFromAvailabilityList){
            if(overlap1 || overlap2){
              practical.start1 = null
              practical.end1 = null
            }
            if(overlap3 || overlap4){
              practical.start2 = null
              practical.end2 = null
            }

          }

          return(!(rangeCourseDay1.overlaps(rangePracticalDay1) || rangeCourseDay2.overlaps(rangePracticalDay1)) 
          || !(rangeCourseDay1.overlaps(rangePracticalDay2) || rangeCourseDay2.overlaps(rangePracticalDay2)))

        }

           // if the practical is offered on two different days
           // first and third slots are not null
           if ((practical.start3 !== null) && (practical.start1 !== null) && (practical.start2 == null)) {
            const rangePracticalDay2 = moment.range(practical.start3, practical.end3);
            const rangePracticalDay1 = moment.range(practical.start1, practical.end1)
  
            // make sure that it doesnt work when we have already selected 
            // a practical and now checking available courses
            const overlap1 = rangeCourseDay1.overlaps(rangePracticalDay1)
            const overlap2 = rangeCourseDay2.overlaps(rangePracticalDay1)
  
            const overlap3 = rangeCourseDay1.overlaps(rangePracticalDay2) 
            const overlap4 = rangeCourseDay2.overlaps(rangePracticalDay2)

            if (removingPracticalsFromAvailabilityList){
              if(overlap1 || overlap2){
                practical.start1 = null
                practical.end1 = null
              }
              if(overlap3 || overlap4){
                practical.start3 = null
                practical.end3 = null
              }
  
            }
  
            return(!(rangeCourseDay1.overlaps(rangePracticalDay1) || rangeCourseDay2.overlaps(rangePracticalDay1)) 
            || !(rangeCourseDay1.overlaps(rangePracticalDay2) || rangeCourseDay2.overlaps(rangePracticalDay2)))
  
          }

             // if the practical is offered on two different days
             // second and third slots are not null
        if ((practical.start3 !== null) && (practical.start2 !== null) && (practical.start1 == null)) {
            const rangePracticalDay1 = moment.range(practical.start2, practical.end2);
            const rangePracticalDay2 = moment.range(practical.start3, practical.end3)
  
            // make sure that it doesnt work when we have already selected 
            // a practical and now checking available courses
            const overlap1 = rangeCourseDay1.overlaps(rangePracticalDay1)
            const overlap2 = rangeCourseDay2.overlaps(rangePracticalDay1)
  
            const overlap3 = rangeCourseDay1.overlaps(rangePracticalDay2) 
            const overlap4 = rangeCourseDay2.overlaps(rangePracticalDay2)
            if (removingPracticalsFromAvailabilityList){
              if(overlap1 || overlap2){
                practical.start2 = null
                practical.end2 = null
              }
              if(overlap3 || overlap4){
                practical.start3 = null
                practical.end3 = null
              }
  
            }
  
            return(!(rangeCourseDay1.overlaps(rangePracticalDay1) || rangeCourseDay2.overlaps(rangePracticalDay1)) 
            || !(rangeCourseDay1.overlaps(rangePracticalDay2) || rangeCourseDay2.overlaps(rangePracticalDay2)))
  
          }

        // if the practical is offered on three different days
        if ((practical.start3 !== null)&& (practical.start1 !== null) &&(practical.start2 !== null)) {
            const rangePracticalDay1 = moment.range(practical.start1, practical.end1);
            const rangePracticalDay2 = moment.range(practical.start2, practical.end2);
            const rangePracticalDay3 = moment.range(practical.start3, practical.end3);

          const overlap1 = rangeCourseDay1.overlaps(rangePracticalDay1)
          const overlap2 = rangeCourseDay2.overlaps(rangePracticalDay1)

          const overlap3 = rangeCourseDay1.overlaps(rangePracticalDay2) 
          const overlap4 = rangeCourseDay2.overlaps(rangePracticalDay2)

          const overlap5 = rangeCourseDay1.overlaps(rangePracticalDay3)
          const overlap6 = rangeCourseDay2.overlaps(rangePracticalDay3)

          if (removingPracticalsFromAvailabilityList){
            if(overlap1 || overlap2){
              practical.start1 = null
              practical.end1 = null
            }
            if(overlap3 || overlap4){
              practical.start2 = null
              practical.end2 = null
            }
             if(overlap5 || overlap6){
              practical.start3 = null
              practical.end3 = null
            }

          }

          return (!(rangeCourseDay1.overlaps(rangePracticalDay1) || rangeCourseDay2.overlaps(rangePracticalDay1)) 
          || !(rangeCourseDay1.overlaps(rangePracticalDay2) || rangeCourseDay2.overlaps(rangePracticalDay2)) 
          || !(rangeCourseDay1.overlaps(rangePracticalDay3) || rangeCourseDay2.overlaps(rangePracticalDay3)))
        }}}