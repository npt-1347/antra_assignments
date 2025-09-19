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
  let dom = {
    availableCourseList: document.getElementById("available-courses"),
    selectedCourseList: document.getElementById("selected-courses"),
    totalCredits: document.getElementById("credits"),
    selectButton: document.getElementById("selectBtn"),
  };

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

  class CourseList {
    #avlbCourses;
    #sltCourses;
    #counter;

    constructor() {
      this.#avlbCourses = [];
      this.#sltCourses = [];
      this.#counter = 0;
    }

    set availableCourseList(courseList) {
      this.#avlbCourses = courseList;
      let list = createListItems(courseList);
      render(dom.availableCourseList, list);
    }

    get availableCourseList() {
      return this.#avlbCourses;
    }

    set selectedCourseList(courseList) {
      this.#sltCourses = courseList;
      let list = createListItems(courseList);
      render(dom.selectedCourseList, list);
    }

    get selectedCourseList() {
      return this.#sltCourses;
    }

    set counter(totalCredits) {
      this.#counter = totalCredits;
      render(dom.totalCredits, totalCredits);
    }

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

  const init = async () => {
    let list = await courseListPromise;
    courseObj.availableCourseList = list;
    courseObj.counter = 0;
  };

  const addCourseEventListeners = (courses) => {
    courses.forEach((course) => {
      let elem = document.getElementById("course-" + course.courseId);
      elem.addEventListener("click", () => {
        if (course["selected"]) {
          course["selected"] = false;
          courseObj.counter -= course.credit;
          elem.style.removeProperty("background-color");
        } else {
          if (courseObj.counter < 18) {
            course["selected"] = true;
            courseObj.counter += course.credit;
            elem.style.backgroundColor = "#4892fbff";
          } else {
            window.alert("You cannot choose more than 18 credits.");
          }
        }
      });
    });
  };

  const addButtonEventListener = (buttonElm) => {
    buttonElm.addEventListener("click", () => {
      let confirmation = window.confirm(
        `You have chosen ${courseObj.counter} credits for this semester. You cannot change once you submit. Do you want to confirm?`
      );
      if (confirmation) {
        let filterCourses = courseObj.availableCourseList.filter(
          (elm) => elm.selected
        );
        let pendingCourses = courseObj.availableCourseList.filter(
          (elm) => !elm.selected
        );
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
