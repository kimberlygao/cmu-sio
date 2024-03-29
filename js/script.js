// objects for course data
function Course(number, name, lectures, info) {
    this.number = number;
    this.name = name;
    this.lectures = lectures;
    this.info = info;
}

function Lecture(time, number, prof, sections, location, days) {
    this.time = time;
    this.number = number;
    this.prof = prof;
    this.sections = sections
    this.location = location;
    this.days = days
}

function Section(letter, time, day, location) {
    this.letter = letter;
    this.time = time;
    this.day = day;
    this.location = location;
}

function CourseInfo(specs, description, prereqs, profile) {
    this.specs = specs;
    this.description = description;
    this.prereqs = prereqs;
    this.profile = profile;
}

function Specs(units, dept, level) {
    this.units = units;
    this.dept = dept;
    this.level = level;
}

function Prereqs(courses, knowledge) {
    this.courses = courses;
    this.knowledge = knowledge;
}

function Profile(topics, relevance, goals, structure, resources, commitment) {
    this.topics = topics;
    this.relevance = relevance;
    this.goals = goals;
    this.structure = structure;
    this.resources = resources;
    this.commitment = commitment;
}

function CourseSelection(courseNum, lecNum, secLet) {
    this.courseNum = courseNum;
    this.lecNum = lecNum;
    this.secLet = secLet;
}

// global variables
let currentCourse;
let courseCatalog;
let selectedCourses = [];


// HELPER FUNCTIONS

// returns string of section info
function getSectionInfo(section) {
    return "Section " + section.letter + " " + "<br>" + section.day + " " + section.time + " | " + section.location
}

// returns course object based on number search
function findCourseByNum(courseNum) {
    let catalog = JSON.parse(sessionStorage.getItem("catalog"))
    for(let i = 0; i < catalog.length; i++) {
        if(catalog[i].number == courseNum)
            return catalog[i];
    }

    return null;
}

// returns lecture dates in string
function getLectureDates(course) {
    let dates = "";
    for(let i = 0; i < course.lectures[0].days.length; i++)
            dates += course.lectures[0].days[i];

    return dates;
}

// loads course catalog data objects
function loadCourseCatalog () {
    let puiProfile = new Profile("The course will cover the basics of rapid prototyping, discount usability, user testing, perception and cognition as related to UX design, and get a glimpse of the future of UX design.",
                                "Students taking this course will have a stronger grasp of concepts fundamental to UX design, including rapid prototyping, discount usability, perception and cognition, and more.",
                                "Students will have a deeper conceptual and procedural knowledge as to how to design, implement, and evaluate user interfaces.",
                                "There will be a midterm, final, in-class quizzes, labs, and several homework assignments.",
                                "Students will be required to read The Design of Everyday Things by Donald Norman. There will also be many web resources on rapid prototyping.",
                                "Students will be expected to meet with other students as part of some of the homework assignments.")
    let puiPrereqs = new Prereqs("15-100 15-127 or 15-104 or 15-110 or 15-112", 
                                 "Proficiency in a programming language, program structure, algorithm analysis, and data abstraction. Normally met through an introductory programming course using C, C++, Pascal or Java, such as 15100, 15112, 15127 or equivalent. Students entering this course should be able to independently write a 300-line program in 48 hours.")
    let puiSpecs = new Specs(15, "Human-Computer Interaction", "Undergraduate");
    let puiInfo = new CourseInfo(puiSpecs, 
                                 "This course is combines lecture, and an intensive programming lab and design studio. It is for those who want to express their interactive ideas in working prototypes. It will cover the importance of human-computer interaction/interface design, iterative design, input/output techniques, how to design and evaluate interfaces, and research topics that will impact user interfaces in the future. In lab, you will learn how to design and program effective graphical user interfaces, and how to perform user tests. We will cover a number of prototyping tools and require prototypes to be constructed in each, ranging from animated mock-ups to fully functional programs. Assignments will require implementing UIs, testing that interface with users, and then modifying the interface based on findings. Some class sessions will feature design reviews of student work. This course is for HCII Masters students and HCI dual majors with a minimal programming background. Students will often not be professional programmers, but will need to interact with programmers.\nRECITATION SELECTION: Students taking this course can sign up for either Prototyping Lab recitation.",
                                 puiPrereqs,
                                 puiProfile);
    let puiSections = [new Section("A", "09:30 AM - 11:00 AM", "M", "PH 226A"), new Section("B", "09:30 AM - 11:00 AM", "M", "BH 110")];
    let puiLectures = [new Lecture("08:00 AM - 09:30 AM", 1, "Hudson", puiSections, "NSH 1305", ["M", "W"])];
    let pui = new Course("05-430", "Programmable User Interfaces", puiLectures, puiInfo);

    let ucreProfile = new Profile("This course covers a variety of user research methods for both generating new systems designs and evaluating them.",
                                 "This course is intended to make you an effective, professional system designer and analyst incorporating user research.",
                                 "Students will collect and analyze information about the participants in a system, design new systems that fulfill the users' needs and goals, work in teams to access multiple perspectives and exploit varying talents, and communicate with a system's users to improve designs.",
                                 "Students will primarily learn by doing, in teams or solo, and will be evaluated based on the output of their projects. There will also be a final exam.",
                                 "Students will use a wide number of resources to learn a variety of user research methods.",
                                 "Students will need to find time for teamwork.")
    let ucrePrereqs = new Prereqs("None", "We assume you already have a strong background in some aspect of computer system design.");
    let ucreSpecs = new Specs(12, "Human-Computer Interaction", "Undergraduate");
    let ucreInfo = new CourseInfo(ucreSpecs,
                                 "This course provides and overview and introduction to the field of human-computer interaction (HCI). It introduces students to tools, techniques, and sources of information about HCI and provides a systematic approach to design. The course increases awareness of good and bad design through observation of existing technology, and teaches the basic skills of task analysis, and analytic and empirical evaluation methods. This is a companion course to courses in visual design (51-422) and software implementation (05-430, 05-431). When registering for this course, undergraduate students are automatically placed the wait list. Students will be then moved into the class, based on if they are in the BHCI second major and year in school e.g. seniors, juniors, etc. In the FALL: This course is NOT open to students outside the HCI major. When registering for this course, undergraduate students are automatically placed the wait list. Students will be then moved into the class, based on if they are in the BHCI second major and year in school. SPRING offering is open to other students.",
                                 ucrePrereqs,
                                 ucreProfile);
    let ucreSections = [new Section("A", "11:30 AM - 01:00 PM", "M", "GHC 4401"), new Section("B", "11:30 AM - 01:00 PM", "M", "GH 4402")];
    let ucreLectures = [new Lecture("11:30 AM - 01:00 PM", 1, "Kittur, Musuraca", ucreSections, "MM 103", ["W"])];
    let ucre = new Course("05-410", "User-Centered Research and Evaluation", ucreLectures, ucreInfo);

    courseCatalog = [pui, ucre];
    currentCourseDetails = courseCatalog[1];

    catalog = $("#catalog-table");

    for(let i = 0; i < courseCatalog.length; i++) {
        let curr = courseCatalog[i];
        let newCourse = document.createElement("tr");
        newCourse.classList.add("course");

        newCourse.onclick = function(e) {
            sessionStorage.setItem("currentCourse", JSON.stringify(curr));
            currentCourse = curr;
            console.log(curr);
            openDetails(curr.number);
        }

        let num = document.createElement("td");
        num.append(document.createTextNode(curr.number));
        newCourse.append(num);

        let name = document.createElement("td");
        name.append(document.createTextNode(curr.name));
        newCourse.append(name);

        let prof = document.createElement("td");
        prof.append(document.createTextNode(curr.lectures[0].prof));
        newCourse.append(prof);


        let time = document.createElement("td");
        time.append(document.createTextNode(getLectureDates(curr) + " " + curr.lectures[0].time));
        newCourse.append(time);

        let location = document.createElement("td");
        location.append(document.createTextNode(curr.lectures[0].location));
        newCourse.append(location);

        let units = document.createElement("td");
        units.append(document.createTextNode(curr.info.specs.units + " units"));
        newCourse.append(units);

        catalog.append(newCourse);
    }

    // adds catalog items to sessions storage
    sessionStorage.setItem("catalog", JSON.stringify(courseCatalog));
    sessionStorage.setItem("numCourses", 1);
    console.log("set");
    sessionStorage.setItem("course1", JSON.stringify(courseCatalog[1]));
}

// gets current number of courses and edits on page
function updateNumCourses() {
    // creates cart if not already
    if(!('cart' in sessionStorage))
        sessionStorage.setItem("cart", JSON.stringify([]))

    let numCourseElements = $(".num-courses");
    let cart = JSON.parse(sessionStorage.getItem("cart"));
    let num = cart.length
    console.log(num);
    for(let i = 0; i < numCourseElements.length; i++) {
        numCourseElements[i].innerHTML = `(${num})`
    }
}

updateNumCourses()