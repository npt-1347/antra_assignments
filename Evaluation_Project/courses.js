/****************************FETCHING DATA******************************************/
const API = (() => {
  const url = " http://localhost:4232/courseList";
  const courseListPromise = fetch(url).then((res) => {
    return res.json();
  });

  return {
    courseListPromise,
  };
})();

/************************************VIEW******************************************/
const View = (() => {
  // Interactive DOM elements
  let dom = {
    availableCourseList: document.getElementById("available-courses"),
    selectedCourseList: document.getElementById("selected-courses"),
    totalCredits: document.getElementById("credits"),
    selectButton: document.getElementById("selectBtn"),
  };

  // Creates list elements for an unordered or ordered list
  const createListItems = (dataList) => {
    let template = "";
    dataList.forEach((course) => {
      template += `<li key=${course.courseId} id='course-${
        course.courseId
      }'><span>${course.courseName}<br/> Course Type : ${
        course.required ? "Compulsory" : "Elective"
      }<br/>
    Course Credit: ${course.credit}</span></li>`;
    });

    return template;
  };

  //updates the dom element based on element and content provided
  const render = (elem, content) => {
    elem.innerHTML = content;
  };

  return {
    createListItems,
    render,
    dom,
  };
})();

/************************************MODEL******************************************/
const Model = ((view, api) => {
  const { createListItems, render, dom } = view;
  const { courseListPromise } = api;

  // Class that maintains the state of data after interaction
  class CourseList {
    #avlbCourses;
    #sltCourses;
    #counter;

    constructor() {
      this.#avlbCourses = [];
      this.#sltCourses = [];
      this.#counter = 0;
    }

    // setter for available courses
    set availableCourseList(courseList) {
      this.#avlbCourses = courseList;
      let list = createListItems(courseList);
      render(dom.availableCourseList, list);
    }

    // getter for available courses
    get availableCourseList() {
      return this.#avlbCourses;
    }

    // setter for selected courses
    set selectedCourseList(courseList) {
      this.#sltCourses = courseList;
      let list = createListItems(courseList);
      render(dom.selectedCourseList, list);
    }

    // getter for selected courses
    get selectedCourseList() {
      return this.#sltCourses;
    }

    // setter for counter that contains total credits selected
    set counter(totalCredits) {
      this.#counter = totalCredits;
      render(dom.totalCredits, totalCredits);
    }

    // getter for counter that contains total credits selected
    get counter() {
      return this.#counter;
    }
  }

  return { CourseList, courseListPromise };
})(View, API);

/************************************CONTROLLER******************************************/
const Controller = ((view, model) => {
  const { CourseList, courseListPromise } = model;
  const { dom } = view;
  const courseObj = new CourseList();

  // Initializes list based on the data fetched
  const init = async () => {
    let list = await courseListPromise;
    courseObj.availableCourseList = list;
    courseObj.counter = 0;
  };

  // function that adds event listener to each course list item to identify whether its selected or not.
  const addCourseEventListeners = (courses) => {
    courses.forEach((course) => {
      let elem = document.getElementById("course-" + course.courseId);
      elem.addEventListener("click", () => {
        if (course["selected"]) {
          course["selected"] = false;
          courseObj.counter -= course.credit;
          elem.style.removeProperty("background-color");
        } else {
          if (courseObj.counter + course.credit <= 18) {
            course["selected"] = true;
            courseObj.counter += course.credit;
            elem.style.backgroundColor = "#4892fbff";
          } else {
            window.alert(
              "You cannot choose more than 18 credits in one semester."
            );
          }
        }
      });
    });
  };

  // function that adds event listener to the select button
  const addButtonEventListener = (buttonElm) => {
    buttonElm.addEventListener("click", () => {
      let confirmation = window.confirm(
        `You have chosen ${courseObj.counter} credits for this semester. You cannot change once you submit. Do you want to confirm?`
      );
      if (confirmation) {
        let filterCourses = [];
        let pendingCourses = [];

        for (const course of courseObj.availableCourseList) {
          if (course.selected) {
            filterCourses.push(course);
          } else {
            pendingCourses.push(course);
          }
        }

        courseObj.availableCourseList = pendingCourses;
        courseObj.selectedCourseList = filterCourses;
        dom.selectButton.disabled = true;
      } else {
        //nothing
      }
    });
  };

  const bootstrap = async () => {
    await init();
    addCourseEventListeners(courseObj.availableCourseList);
    addButtonEventListener(dom.selectButton);
  };

  return { bootstrap };
})(View, Model);

Controller.bootstrap();
