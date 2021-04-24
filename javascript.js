document.addEventListener('DOMContentLoaded', function(){ 
    const animationSteps = 13 // pilnīgi patvaļīgi izvēlēts skaitlis. Nosaka cik soļi ir animācijās.

    const fadeInTime_Background = 0.2
    const fadeOutTime_Background = 0.2

    const fadeInTime_PopUp = 0.05
    const fadeOutTime_PopUp = 0.05

    const blurRadius = 2.5

    var TaskName = document.getElementById("TaskName")
    var TaskDescription = document.getElementById("TaskDescription")
    var DueDate = document.getElementById("TaskDueDate")
    var DueTime = document.getElementById("TaskDueTime")

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

    function ApplyShakeAnimation(element, animationKeyFramesName, time) {
        element.style.display = "absolute"
        element.style.transition = `${time}s`
    
        element.style.animation = `${animationKeyFramesName} ${time}s`
        setTimeout(() => {element.style.animation = ""}, 1000 * time)  // Noņemt animāciju pēctam kad tā ir pabeigta lai nākamreiz arī strādā
    }

    var PopUpBackground = document.getElementById("PopUpBackground")
    var PopUpFrame = document.getElementById("PopUpFrame")

    document.getElementById("CreateNewTask").addEventListener("click", (event) => {
        console.log("creating new task")
        FadeIn(PopUpBackground, fadeInTime_Background, true, blurRadius)
        FadeIn(PopUpFrame, fadeInTime_PopUp)
        PopUpFrame.style.display = "flex"
    });

    document.getElementById("PopUpCloseButton").addEventListener("click", (event) => {
        console.log("clicked close button")
        FadeOut(PopUpBackground, fadeOutTime_Background, true, blurRadius)
        FadeOut(PopUpFrame, fadeOutTime_PopUp)
        setTimeout(() => {
            TaskName.value = ""
            TaskDescription.value = ""
            DueDate.value = ""
        }, 3000 * fadeOutTime_PopUp);
    });

    window.addEventListener("click", (event) => {
        if (event.target == PopUpBackground && PopUpBackground.style.display == "block"){
            console.log("clicked out of window")
            FadeOut(PopUpBackground, fadeOutTime_Background, true, blurRadius)
            FadeOut(PopUpFrame, fadeOutTime_PopUp)
        }
    });

    document.getElementById("SubmitButton").addEventListener("click", (event) => {
        if (!TaskName.value || !TaskDescription.value || !DueDate.value || !DueTime) {
            if (!TaskName.value) {
                ApplyShakeAnimation(TaskName, "ShakeLeftRight", 0.35)
            }
            if (!TaskDescription.value) {
                ApplyShakeAnimation(TaskDescription, "ShakeLeftRight", 0.35)
            }
            if (!DueDate.value) {
                ApplyShakeAnimation(DueDate, "ShakeLeftRight", 0.35)
            }
            if (!DueTime.value) {
                ApplyShakeAnimation(DueTime, "ShakeLeftRight", 0.35)
            }
        } else {
            console.log(TaskName.value)
            console.log(TaskDescription.value)
            console.log(DueDate.value)
    
            event.preventDefault()
            console.log("clicked close button")
            FadeOut(PopUpBackground, fadeOutTime_Background, true, blurRadius)
            FadeOut(PopUpFrame, fadeOutTime_PopUp)
            setTimeout(() => {
                TaskName.value = ""
                TaskDescription.value = ""
                DueDate.value = ""
                
            }, 3000 * fadeOutTime_PopUp);
        }
    });
})