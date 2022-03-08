let previousButton = document.querySelector(".slider-nav__button--prev");
let nextButton = document.querySelector(".slider-nav__button--next");
let mainSlider = document.querySelector(".slider");
let allSlide = document.querySelectorAll(".slide");
let allSlideArray = [...allSlide];
var nextSlide;
let nextSlideArray;

mainSlider.setAttribute("style", `--total-slide: ${allSlideArray.length}`);


function slidePositionFinder(){
    let activeSlide = document.querySelector(".slide.active");
    let activeSlideIndex = allSlideArray.indexOf(activeSlide);
    let prevPosition;
    let nextPosition;
    if(activeSlideIndex == 0){
        prevPosition = allSlideArray[allSlideArray.length - 1];
    }else{
        prevPosition = allSlideArray[activeSlideIndex - 1];
    }

    if(activeSlideIndex == allSlideArray.length - 1){
        nextPosition = allSlideArray[0];
    }else{
        nextPosition = allSlideArray[activeSlideIndex + 1];
    }

    return[prevPosition, nextPosition];
}

function slidePositionSet(){
    let activeSlide = document.querySelector(".slide.active");
    let activeSlideIndex = allSlideArray.indexOf(activeSlide);
    allSlideArray.map((slideElement, slideIndex) =>{
        if(slideIndex == activeSlideIndex){
            slideElement.classList.remove("previous");
            slideElement.classList.remove("next");
            slideElement.classList.add("active");
            slideElement.setAttribute("style", "--i:");
        }
        else if(slideIndex > activeSlideIndex){
            slideElement.classList.remove("active");
            slideElement.classList.remove("previous");
            slideElement.classList.add("next");
            nextSlide = document.querySelectorAll(".slide.next");
            nextSlideArray = [...nextSlide];
            nextSlideArray.map((nextSlideElement, nextSlideIndex) =>{
                nextSlideElement.setAttribute("style", `--i: ${(nextSlideIndex + 1)}`)
            });
        }
        else if(slideIndex < activeSlideIndex){
            slideElement.classList.remove("active");
            slideElement.classList.remove("next");
            slideElement.classList.add("previous");
        }
    });
}
slidePositionSet();

function setZIndex (){
    allSlideArray.map((slideElement, slideIndex) =>{
        slideElement.style.zIndex = allSlideArray.length - slideIndex;
    });
}
setZIndex();

previousButton.addEventListener("click", function(){
    let activeSlide = document.querySelector(".slide.active");
    let [prevPosition, nextPosition] = slidePositionFinder();
    activeSlide.classList.remove("active");
    prevPosition.classList.add("active");
    slidePositionSet();
    setZIndex();
});

nextButton.addEventListener("click", function(){
    let activeSlide = document.querySelector(".slide.active");
    let [prevPosition, nextPosition] = slidePositionFinder();
    activeSlide.classList.remove("active");
    nextPosition.classList.add("active");
    slidePositionSet();
    setZIndex();
});