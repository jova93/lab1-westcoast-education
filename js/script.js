function showAndHideNavLinks() {
  var links = document.getElementById("navLinks");
  if (links.style.display === "none") {
    links.style.display = "flex";
  } else {
    links.style.display = "none";
  }
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos <= currentScrollPos) {
    document.getElementById("navLinks").style.display = "none";
    document.getElementById("logoAndMenuContainer").style.display = "none";
  } else {
    document.getElementById("navLinks").style.display = "none";
    document.getElementById("logoAndMenuContainer").style.display = "flex";
  }
  prevScrollpos = currentScrollPos;
};

