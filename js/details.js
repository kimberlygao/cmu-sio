// shows the button to add a class
function showAddBtn() {
    $("#add-btn").css("display", "inline-block");
}

// gets label for each piece of info
function getLabel(detail) {
    return detail.innerHTML;
}

// adds course to cart and updates the number of courses
function addCourse() {
    // get course on current details page
    let course = JSON.parse(sessionStorage.getItem("currentCourse"));
    // get the course cart
    let cart = JSON.parse(sessionStorage.getItem("cart"))

    // check if course is already in the cart -> alert user if so
    for(let i = 0; i < cart.length; i++) {
        if(cart[i].courseNum == course.number) {
            alert("Cannot add course already in plan")
            return;
        }
            
    }

    // get the selected secion and add selection to cart
    let section = $('input[name=section]:checked', '#details-section').val()
    cart.push(new CourseSelection(course.number, 1, section));
    sessionStorage.setItem("cart", JSON.stringify(cart))

    // update num courses and open schedule to view new class
    updateNumCourses();
    window.location.href = "schedule.html";
}

// called when details page is opened from catalog to update correct course details
function updateDetails() {
    let c = JSON.parse(sessionStorage.getItem("currentCourse"))
    let detail;
    
    document.getElementById("details-num-name").innerHTML = c.number + " " + c.name;
    
    detail = document.getElementById("details-lecture")
    detail.innerHTML = getLabel(detail) + c.lectures[0].number;

    detail = document.getElementById("details-prof");
    detail.innerHTML = c.lectures[0].prof;

    detail = document.getElementById("details-time-location");
    detail.innerHTML = getLectureDates(c) + " " + c.lectures[0].time + " | " + c.lectures[0].location;

    detail = document.getElementById("details-sectionA");
    detail.innerHTML = getSectionInfo(c.lectures[0].sections[0]);

    detail = document.getElementById("details-sectionB");
    detail.innerHTML = getSectionInfo(c.lectures[0].sections[1]);

    detail = document.getElementById("details-units");
    detail.innerHTML = getLabel(detail) + c.info.specs.units;

    detail = document.getElementById("details-dept");
    detail.innerHTML = getLabel(detail) + c.info.specs.dept;

    detail = document.getElementById("details-course-level");
    detail.innerHTML = getLabel(detail) + c.info.specs.level;

    detail = document.getElementById("details-description");
    detail.innerHTML = c.info.description;

    detail = document.getElementById("details-prereq-courses");
    detail.innerHTML = getLabel(detail) + c.info.prereqs.courses;

    detail = document.getElementById("details-knowledge");
    detail.innerHTML = getLabel(detail) + c.info.prereqs.knowledge;

    detail = document.getElementById("details-topics");
    detail.innerHTML = getLabel(detail) + c.info.profile.topics;

    detail = document.getElementById("details-relevance");
    detail.innerHTML = getLabel(detail) + c.info.profile.relevance;

    detail = document.getElementById("details-goals");
    detail.innerHTML = getLabel(detail) + c.info.profile.goals;

    detail = document.getElementById("details-structure");
    detail.innerHTML = getLabel(detail) + c.info.profile.structure;

    detail = document.getElementById("details-resources");
    detail.innerHTML = getLabel(detail) + c.info.profile.resources;

    detail = document.getElementById("details-extra-time");
    detail.innerHTML = getLabel(detail) + c.info.profile.commitment;
}

