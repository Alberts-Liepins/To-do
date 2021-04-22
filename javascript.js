document.addEventListener('DOMContentLoaded', function(){ 
    var animationSteps = 40  // pilnīgi patvaļīgi izvēlēts skaitlis. Nosaka cik soļi ir animācijās.

    var fadeInTime_Background = 0.2
    var fadeOutTime_Background = 0.2

    var fadeInTime_PopUp = 0.05
    var fadeOutTime_PopUp = 0.05

    var blurRadius = 2.5

    function FadeIn(element, fadeTime, blurBoolean, radius) {
        element.style.display = "block";

        if (element.style.opacity >= 0) {
            element.style.opacity = "0"
        }
        if (blurBoolean) {
            var blur = 0
        }
        
        var opacityIterationStep = 1 / animationSteps

        console.log(fadeTime / animationSteps)

        var start = setInterval(() => {
            element.style.opacity = parseFloat(element.style.opacity) + opacityIterationStep
            if (blurBoolean) {
                blur += radius / animationSteps
                element.style.backdropFilter = `blur(${blur}px)`;
            }
            if (element.style.opacity >= 1) {
                clearInterval(start);
            }
        }, 1000 * (fadeTime / animationSteps));    // jareizina ar 1000 jo ievada sekundes bet setInterval() laiku pieņem milisekundēs
    }

    function FadeOut(element, fadeTime, blurBoolean, radius) {
        if (element.style.opacity <= 1) {
            element.style.opacity = "1"
        }
        if (blurBoolean) {
            var blur = radius
        }

        var opacityIterationStep = 1 / animationSteps

        var start = setInterval(() => {
            element.style.opacity = parseFloat(element.style.opacity) - opacityIterationStep
            if (blurBoolean) {
                blur -= radius / animationSteps
                element.style.backdropFilter = `blur(${blur}px)`;
            }
            if (element.style.opacity <= 0) {
                clearInterval(start);
                element.style.display = "none";
            }
        }, 1000 * (fadeTime / animationSteps));    // jareizina ar 1000 jo ievada sekundes bet setInterval() laiku pieņem milisekundēs
    }

    var PopUpBackground = document.getElementById("PopUpBackground")
    var PopUpFrame = document.getElementById("PopUpFrame")

    document.getElementById("CreateNewTask").addEventListener("click", function(event){
        event.preventDefault()
        console.log("creating new task")
        FadeIn(PopUpBackground, fadeInTime_Background, true, blurRadius)
        FadeIn(PopUpFrame, fadeInTime_PopUp)
        PopUpFrame.style.display = "flex"
    });

    document.getElementById("PopUpCloseButton").addEventListener("click", function(event){
        event.preventDefault()
        console.log("clicked close button")
        FadeOut(PopUpBackground, fadeOutTime_Background, true, blurRadius)
        FadeOut(PopUpFrame, fadeOutTime_PopUp)
    });

    window.addEventListener("click", function(event){
        event.preventDefault()
        console.log(PopUpBackground.style.display, PopUpBackground.style.opacity)

        if (event.target == PopUpBackground && PopUpBackground.style.display == "block"){
            console.log("clicked out of window")
            FadeOut(PopUpBackground, fadeOutTime_Background, true, blurRadius)
            FadeOut(PopUpFrame, fadeOutTime_PopUp)
        }
    });
})