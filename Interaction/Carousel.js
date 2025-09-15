document.addEventListener("DOMContentLoaded", function () {
  const carouselWrapper = document.querySelector(".carousel-wrapper");
  const items = document.querySelectorAll(".carousel-item");

  let currentStep = 0;
  const totalSteps = 6;  // Now we have 6 total steps (0 to 5)

  let cumulativeWidths = [];

  function calculateWidths() {
    cumulativeWidths = [0];

    for (let i = 0; i < items.length; i++) {
      cumulativeWidths.push(cumulativeWidths[i] + items[i].getBoundingClientRect().width);
    }
  }

  function updateCarousel() {
    let translateX = 0;
    if (currentStep === 0 && 1) {
      // Step 5: Show Image 7 (Bromat) full width alone
      translateX = cumulativeWidths[6];
    }
    if (currentStep >=2 ) {
      // Steps 0 to 3: Two small images side by side
      translateX = currentStep * items[0].getBoundingClientRect().width;
    } else if (currentStep <= 1) {
      // Step 4: Show Image 5 + Image 6 (Arabian3)
      translateX = cumulativeWidths[4];  // Index of first of these two images
    }    // Index of the Bromat image
    

    carouselWrapper.style.transform = `translateX(-${translateX}px)`;
  }

  function nextSlide() {
    currentStep = (currentStep + 1) >= totalSteps ? 0 : currentStep + 1;
    updateCarousel();
  }

  window.addEventListener('load', () => {
    calculateWidths();
    updateCarousel();
    setInterval(nextSlide, 3000);
  });

  window.addEventListener('resize', () => {
    calculateWidths();
    updateCarousel();
  });
});
