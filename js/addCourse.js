// Get the modal
var modal = document.getElementById("addNewCourseModal");

// Get the button that opens the modal
var btn = document.getElementById("openModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// ---------------------------------------------------------------------------

const actualCourses = document.querySelector(".actual-courses");
const saveBtn = document.querySelector(".save-btn");
const courseNumberInput = document.querySelector("#courseNumberInput");
const titleInput = document.querySelector("#titleInput");
const descriptionInput = document.querySelector("#descriptionInput");
const courseLengthInput = document.querySelector("#courseLengthInput");
const coursePrice = document.querySelector("#coursePrice");

let newId = 7;

//GENERATE GENERIC COURSE HTML
function generateNewCourseHTML(course) {
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

//ADD COURSE
function addCourse(course) {
  let innerHTML = generateNewCourseHTML(course);
  document.getElementById("actualCourses").innerHTML += innerHTML;
}

const addNewCourse = () => {
  const newCourse = {
    id: newId,
    courseNumber: courseNumberInput.value,
    title: titleInput.value,
    description: descriptionInput.value,
    courseLength: courseLengthInput.value,
    price: Number(coursePrice.value),
    image: "images/generic-image-course.jpg",
  };
  addCourse(newCourse);
};

//SAVE BUTTON
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //ADD COURSE
  addNewCourse();

  //ADD 1 TO NEWID TO CHANGE ID ON NEW OBJECT
  newId += 1;

  //RESET FORM
  document.getElementById("addCourse").reset();
});
