function Course(number, name, lecture, units) {
    this.number = number;
    this.name = name;
    this.lecture = lecture;
    this.units = units;
}

function Lecture(time, number, prof, sections, location, days) {
    this.time = time;
    this.number = number;
    this.prof = prof;
    this.sections = sections
    this.location = location;
    this.days = days
}

function section(letter, time, day, location) {
    this.time = time;
    this.day = day;
    this.location = location;
}

let courses;

function loadCourses () {
    let puiSections = [new Section("A", "10:30 AM - 11:30 AM", "M", "PH 226A"), new Section("B", "10:30 AM - 11:30 AM", "M", "BH 110")];
    let puiLecture = new Lecture("08:30 AM - 10:30 AM", 1, "Hudson", puiSections, "NSH 1305", ["M", "W"]);
    let pui = new Course("05-430", "Programmable User Interfaces", "Hudson", puiLecture, 15);

    let ucreSections = [new Section("A", "12:00 PM - 02:00 PM ", "M", "GHC 4401"), new Section("B", "10:30 AM - 11:30 AM", "M", "BH 110")];
    let ucreLecture = new Lecture("12:00 PM - 02:00 PM ", 1, "Kittur, Musuraca", puiSections, "MM 103", ["W"]);
    let ucre = new Course("05-430", "Programmable User Interfaces", "Kittur, Musuraca", puiLecture, 15);

}
function onLoad() {
    // populate course catalog

    // update current number of courses
    let numCourses = 1;
    let numCourseElements = document.getElementsByClassName("num-courses");
    console.log(numCourseElements);

    for(let i = 0; i < numCourseElements.length; i++) {
        numCourseElements[i].innerHTML = `(${numCourses})`
    }

    // add fillers to schedule
    let numFillers = 15 * 5 - (numCourses * 2);
    let div = document.getElementById("inner-schedule");
    console.log(div);
    for(let i = 0; i < numFillers; i++) {
        let filler = document.createElement("p");
        filler.classList.add("white");
        div.append(filler)
    }
}