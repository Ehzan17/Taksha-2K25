document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const carouselWrapper = document.querySelector(".carousel-wrapper");

  let currentIndex = 0;

  function updateCarousel() {
    /* if (currentIndex === 0) {
      document.getElementById("elites").classList.add("smallCarousel");
      document.getElementById("farmfed").classList.add("largeCarousel");
    } else {
      document.getElementById("farmfed").classList.remove("largeCarousel");
      document.getElementById("elites").classList.remove("smallCarousel");
    } */
    const translateValue = -currentIndex * 50 + "%";
    carouselWrapper.style.transform = "translateX(" + translateValue + ")";
  }

  function nextSlide() {
    if (currentIndex === 3) {
      currentIndex = (currentIndex + 2) % 6; // 6 is the total number of images
      updateCarousel();
      return true
    }
    currentIndex = (currentIndex + 1) % 6; // 6 is the total number of images
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + 6) % 6;
    updateCarousel();
  }

  setInterval(function () {
    nextSlide();
  }, 3000); // Adjust the interval for automatic scrolling

  // Optional: Uncomment the lines below if you want to enable manual navigation using buttons
  // const nextButton = document.getElementById("nextButton");
  // const prevButton = document.getElementById("prevButton");

  // nextButton.addEventListener("click", nextSlide);
  // prevButton.addEventListener("click", prevSlide);
});
