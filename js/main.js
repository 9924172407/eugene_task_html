const wiperTrack = document.querySelector(".wiper-track");
const wipes = Array.from(wiperTrack.children);
const wipePrevBtn = document.querySelector(".wiper-button__right");
const wipeNextBtn = document.querySelector(".wiper-button__left");
const wipeWidth = wipes[0].getBoundingClientRect().width;
const numVisibleSlides = 5; // Number of slides visible at a time
const slideMargin = 24; // Margin between slides
let currentIndex = 0;
let intervalId;
let isDragging = false;
let isHovering = false;
let startPosition = null;
let scrollPosition = null;

const arrowsBehaviour = (index) => {
  if (index === 0) {
    wipePrevBtn.classList.add("is-hidden");
    wipeNextBtn.classList.remove("is-hidden");
  } else if (index === wipes.length - numVisibleSlides) {
    wipePrevBtn.classList.remove("is-hidden");
    wipeNextBtn.classList.add("is-hidden");
  } else {
    wipePrevBtn.classList.remove("is-hidden");
    wipeNextBtn.classList.remove("is-hidden");
  }
};

const wipeSlide = (targetIndex) => {
  const activeSlide = wiperTrack.querySelector(".active-swipe");
  const nextSlide = wipes[targetIndex];
  wiperTrack.style.transform =
    "translateX(-" + (wipeWidth + slideMargin) * targetIndex + "px)";
  activeSlide.classList.remove("active-swipe");
  activeSlide.style.transform = "scale(1)";
  nextSlide.classList.add("active-swipe");
  nextSlide.style.transform = "scale(1.1)";
  arrowsBehaviour(targetIndex);
  currentIndex = targetIndex;
};

const startAutoSlide = () => {
  intervalId = setInterval(
    () => {
      const nextIndex = (currentIndex + 1) % (wipes.length - numVisibleSlides + 1);
      wipeSlide(nextIndex);
    },
    isHovering || isDragging ? 6000 : 3000
  ); // Change the time interval as needed (in milliseconds)
};

const stopAutoSlide = () => {
  clearInterval(intervalId);
};

startAutoSlide();

const handleDragStart = (e) => {
  isDragging = true;
  startPosition = e.clientX;
  scrollPosition = wiperTrack.scrollLeft;
  stopAutoSlide();
};

const handleDragMove = (e) => {
  if (!isDragging) return;
  const delta = e.clientX - startPosition;
  wiperTrack.scrollLeft = scrollPosition - delta;
};

const handleDragEnd = () => {
  isDragging = false;
  startPosition = null;
  scrollPosition = null;
  startAutoSlide();
};

wiperTrack.addEventListener("mousedown", handleDragStart);
wiperTrack.addEventListener("mousemove", handleDragMove);
wiperTrack.addEventListener("mouseup", handleDragEnd);
wiperTrack.addEventListener("mouseleave", handleDragEnd);

wiperTrack.addEventListener("mouseenter", () => {
  isHovering = true;
  startAutoSlide();
});

wiperTrack.addEventListener("mouseleave", () => {
  isHovering = false;
  startAutoSlide();
});

wipeNextBtn.addEventListener("click", () => {
  stopAutoSlide();
  const nextIndex = currentIndex + numVisibleSlides;
  wipeSlide(nextIndex);
  startAutoSlide();
});

wipePrevBtn.addEventListener("click", () => {
  stopAutoSlide();
  const prevIndex = currentIndex - numVisibleSlides;
  wipeSlide(prevIndex);
  startAutoSlide();
});
