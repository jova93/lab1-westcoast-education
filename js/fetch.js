const jsonRequest = new Request("https://jova93.github.io/api/courses.json");

const courses = [];

class Course {
  constructor(input) {
    this.id = input.id;
    this.courseNumber = input.courseNumber;
    this.title = input.title;
    this.description = input.description;
    this.courseLength = input.courseLength;
    this.price = input.price;
    this.image = input.image;
  }
}

function populatePopularCourses(array) {
  for (let i = 0; i < 3; i++) {
    const courseTemp = array[i];
    let innerHTML = generateCourseHTML(courseTemp);
    document.getElementById("popularCourses").innerHTML += innerHTML;
  }
}

function populateActualCourses(array) {
  for (let i = 0; i < array.length; i++) {
    const courseTemp = array[i];
    let innerHTML = generateCourseHTML(courseTemp);
    document.getElementById("actualCourses").innerHTML += innerHTML;
  }
}

fetch(jsonRequest)
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      const courseTemp = new Course(data[i]);
      courses.push(courseTemp);
    }
    populatePopularCourses(courses);
    populateActualCourses(courses);
  })
  .catch(console.error);

function generateCourseHTML(course) {
  let innerHTML = `
    <div class="course-text-box">
      <h4 class="course-number"><span class="course-bold">Kursnr: </span>${course.courseNumber}</h4>
      <img src="${course.image}" alt="course image">
      <h4 class="course-title"><span class="course-bold">Kurstitel: </span>${course.title}</h4>
      <p>${course.description}</p>
      <p>
        <span class="course-bold">Pris: </span>${course.price} SEK inkl. moms<br>
        <span class="course-bold">Längd: </span>${course.courseLength}
      </p>
      <button type="button" class="add-to-cart-btn">
        <i class="fas fa-plus-circle"></i>
      </button>
    </div>`;
  return innerHTML;
}
