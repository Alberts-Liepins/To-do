document.addEventListener('DOMContentLoaded', function(){ 
    const ANIMATION_STEPS = 40 /* pilnīgi patvaļīgi izvēlēts skaitlis. Nosaka cik soļi ir animācijās. */

    function FadeIn(element, fadeTime, blurBoolean, radius) {
        element.style.display = "block";
        if (element.style.opacity >= 0) {
            element.style.opacity = 0
        }
        if (blurBoolean) {
            var blur = 0
        }
        var start = setInterval(() => {
            element.style.opacity = parseFloat(element.style.opacity) + 0.025
            if (blurBoolean) {
                blur += radius / ANIMATION_STEPS
                element.style.backdropFilter = `blur(${blur}px)`;
                console.log(blur)
            }
            if (element.style.opacity >= 1) {
                clearInterval(start);
            }
        }, fadeTime / ANIMATION_STEPS);
    }

    function FadeOut(element, fadeTime, blurBoolean, radius) {
        if (element.style.opacity <= 1) {
            element.style.opacity = 1
        }
        if (blurBoolean) {
            var blur = radius
        }
        var start = setInterval(() => {
            element.style.opacity = parseFloat(element.style.opacity) - 0.025
            if (blurBoolean) {
                blur -= radius / ANIMATION_STEPS
                element.style.backdropFilter = `blur(${blur}px)`;
                console.log(blur)
            }
            if (element.style.opacity <= 0) {
                clearInterval(start);
                element.style.display = "none";
            }
        }, fadeTime / ANIMATION_STEPS);
    }

    var PopUpBackground = document.getElementById("PopUpBackground")
    var PopUpFrame = document.getElementById("PopUpFrame")

    document.getElementById("CreateNewTask").addEventListener("click", function(event){
        event.preventDefault()
        console.log("creating new task")
        FadeIn(PopUpBackground, 0.5, true, 10)
        FadeIn(PopUpFrame, 0.1)
        PopUpFrame.style.display = "flex"
    });

    document.getElementById("PopUpCloseButton").addEventListener("click", function(event){
        event.preventDefault()
        console.log("clicked close button")
        FadeOut(PopUpBackground, 0.25, true, 10)
        FadeOut(PopUpFrame, 0.1)
        PopUpFrame.style.display = "none"
    });

    window.addEventListener("click", function(event){
        event.preventDefault()
        console.log(PopUpBackground.style.display, PopUpBackground.style.opacity)

        if (event.target == PopUpBackground && PopUpBackground.style.display == "block"){
            console.log("clicked out of window")
            FadeOut(PopUpBackground, 0.25, true, true, 10)
            FadeOut(PopUpFrame, 0.1, false)
            PopUpFrame.style.display = "none"
        }
    });
})