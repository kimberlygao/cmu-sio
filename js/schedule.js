// time blocks corresponding to grid rows
let timeBlocks = {
    "08:00 AM - 09:30 AM": [2, 4],
    "09:30 AM - 11:00 AM": [5, 7],
    "11:30 AM - 01:00 PM": [8, 10]
};

// loads whitespace fillers to schedule
function loadFillers(count) {
    let numFillers = 60 - count * 2;
    let div = $("#inner-schedule");
    for(let i = 0; i < numFillers; i++) {
        let filler = document.createElement("p");
        filler.classList.add("white");
        div.append(filler);
    }
}

// removes a course from the cart and reflects on schedule page
function removeCourse(courseNum) {
    let cart = JSON.parse(sessionStorage.getItem("cart"))
    let numCourses = cart.length;

    for(let i = 0; i < numCourses; i++) {
        if(cart[i].courseNum == courseNum) {
            cart.splice(i, 1)
            sessionStorage.setItem("cart", JSON.stringify(cart))
            $(`.plan-course, .c${courseNum}`).remove()
            updateNumCourses();
            return;
        }
    }

    
}

// build side bar course block
function loadSideBlock(course, lNum, sLet) {
    // get lecture and section
    let lec = course.lectures[lNum-1]
    let sec = lec.sections[sLet.charCodeAt(0) - 65]

    let sideBlock = $(`<div class="home-course c${course.number}">
                            <div class="course-num"> 
                                <div class="course-top">
                                    <p>${course.number}</p>
                                    <p>${lec.prof}</p>
                                </div>
                                <p>${course.name}</p>
                            </div>
                            <div class="course-time">
                                <div class="course-top">
                                    <div>
                                    <p>(${lec.number}) ${getLectureDates(course)}  ${lec.time} | ${lec.location}</p>
                                    <p>(${sec.letter}) ${sec.day} ${sec.time} | ${sec.location}</p>
                                    </div>
                                    <div>
                                    <br>
                                    <p class="underline" onclick="removeCourse('${course.number}')">Remove</p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>`)
    sideBlock.appendTo("#plan-courses")
}

// create and add course blocks to schedule
function loadScheduleBlocks(course, lNum, sLet) {
    let count = 0;
    let lec = course.lectures[lNum-1]
    let sec = lec.sections[sLet.charCodeAt(0) - 65]

    // create lecture blocks
    for(let i = 0; i < lec.days.length; i++) {
        let lecBlock = $(` <div class="plan-class ${lec.days[i]} c${course.number}">
                                <p>${course.number}</p>
                                <p>${course.name}</p>
                            </div>`)
        lecBlock.css("grid-row-start", timeBlocks[lec.time][0])
        lecBlock.css("grid-row-end", timeBlocks[lec.time][1])

        lecBlock.appendTo("#inner-schedule")
        count += 1
    }

    // create section blocks
    for(let i = 0; i < sec.day.length; i++) {
        let secBlock = $(` <div class="plan-class c${course.number} ${sec.day}">
                                <p>${course.number}</p>
                                <p>${course.name}</p>
                            </div>`)
        secBlock.css("grid-row-start", timeBlocks[sec.time][0])
        secBlock.css("grid-row-end", timeBlocks[sec.time][1])

        secBlock.appendTo("#inner-schedule")
        count += 1
    }

    // returns the number of blocks added
    return count;
}

// loads course cart to render on schedule
function loadSchedule() {
    let cart = JSON.parse(sessionStorage.getItem("cart"))
    let numCourses = cart.length;
    let fillerCount = 0;

    // go through each course in cart
    for(let i = 0; i < numCourses; i++) {
        let course = findCourseByNum(cart[i].courseNum)
        loadSideBlock(course, cart[i].lecNum, cart[i].secLet);
        fillerCount = loadScheduleBlocks(course, cart[i].lecNum, cart[i].secLet);
    }

    // loadFillers(fillerCount);
}