document.addEventListener('DOMContentLoaded', function(){ 
    const animationSteps = 13; // pilnīgi patvaļīgi izvēlēts skaitlis. Nosaka cik soļi ir animācijās.

    const fadeInTime_Background = 0.2;
    const fadeOutTime_Background = 0.2;

    const fadeInTime_PopUp = 0.05;
    const fadeOutTime_PopUp = 0.05;

    const blurRadius = 2.5;

    let TaskName = document.getElementById("TaskName");
    let TaskDescription = document.getElementById("TaskDescription");
    let DueDate = document.getElementById("TaskDueDate");
    let DueTime = document.getElementById("TaskDueTime");

    let PopUpBackground = document.getElementById("PopUpBackground");
    let PopUpFrame = document.getElementById("PopUpFrame");

    let ToDoList = [];

    // FUNCTIONS //

    function FadeIn(element, fadeTime, blurBoolean, radius) {
        element.style.display = "block";

        if (element.style.opacity >= 0) {
            element.style.opacity = "0";
        };
        if (blurBoolean) {
            var blur = 0;
        };
        
        let opacityIterationStep = 1 / animationSteps;

        let start = setInterval(() => {
            element.style.opacity = parseFloat(element.style.opacity) + opacityIterationStep;
            if (blurBoolean) {
                blur += radius / animationSteps;
                element.style.backdropFilter = `blur(${blur}px)`;;
            };
            if (element.style.opacity >= 1) {
                clearInterval(start);
            };
        }, 1000 * (fadeTime / animationSteps));    // jareizina ar 1000 jo ievada sekundes bet setInterval() laiku pieņem milisekundēs
    };

    function FadeOut(element, fadeTime, blurBoolean, radius) {
        if (element.style.opacity <= 1) {
            element.style.opacity = "1";
        };
        if (blurBoolean) {
            var blur = radius;
        };

        let opacityIterationStep = 1 / animationSteps;

        let start = setInterval(() => {
            element.style.opacity = parseFloat(element.style.opacity) - opacityIterationStep;
            if (blurBoolean) {
                blur -= radius / animationSteps;
                element.style.backdropFilter = `blur(${blur}px)`;
            };
            if (element.style.opacity <= 0) {
                clearInterval(start);
                element.style.display = "none";
            };
        }, 1000 * (fadeTime / animationSteps));    // jareizina ar 1000 jo ievada sekundes bet setInterval() laiku pieņem milisekundēs
    };

    function ApplyShakeAnimation(element, animationKeyFramesName, time) {
        element.style.display = "absolute";
        element.style.transition = `${time}s`;
    
        element.style.animation = `${animationKeyFramesName} ${time}s`
        setTimeout(() => {element.style.animation = ""}, 1000 * time);  // Noņemt animāciju pēctam kad tā ir pabeigta lai nākamreiz arī strādā
    };

    function AddOnclickRemove() {
        let CardTasks = CardTasksFrame.getElementsByClassName("CardTask");

        for (let i = 0; i < CardTasks.length; i++) {
            CardTasks[i].getElementsByTagName(`input`)[0].onclick = function() {
                ToDoList.splice(i, 1);
                RenderCard();
            };
        };
    };

    function RenderCard() {
        let CardTasksFrame = document.getElementById("CardTasksFrame");
        CardTasksFrame.innerHTML = "";

        for (let i = 0; i < ToDoList.length; i++) {
            let card = `
            <div class="CardTask">
                <div id="CardTaskPreset">
                    <p id="CardTaskHeader" class="TextNormal TextShadowBig" >${ToDoList[i].Nosaukums}</p>
                    <div id="CardTaskDescription">
                        <div id="CardFadeinDescription"></div>
                        <p id="CardTaskDescriptionText" class="TextNormal TextShadowBig">${ToDoList[i].Apraksts}</p>
                        <div id="CardFadeOutDescription"></div>
                    </div>
                    <div>
                        <div id="CardDueText" class="TextNormal TextShadowSmall">Pabeigt līdz:</div>
                        <div id="CardDueDate" class="TextBold">${ToDoList[i].TermiņaDiena}</div>
                        <div id="CardDueTime" class="TextBold">${ToDoList[i].TermiņaLaiks}</div>
                    </div>
                    <input id="CompletedButton" class="TextNormal NoOutline TextShadowBig ${i}" type="button" value="Pabeigts!">
                </div>
            </div>`

            CardTasksFrame.innerHTML += card;
            AddOnclickRemove();
        };
        localStorage.setItem("ActiveCards", JSON.stringify(ToDoList));
    };

    // EVENT LISTENERS //

    window.addEventListener("load", () => {
        ToDoList = JSON.parse(localStorage.getItem("ActiveCards") || "[]");
        RenderCard();
    });

    document.getElementById("CreateNewTask").addEventListener("click", (event) => {
        FadeIn(PopUpBackground, fadeInTime_Background, true, blurRadius);
        FadeIn(PopUpFrame, fadeInTime_PopUp);
        PopUpFrame.style.display = "flex";
    });

    document.getElementById("PopUpCloseButton").addEventListener("click", (event) => {
        FadeOut(PopUpBackground, fadeOutTime_Background, true, blurRadius);
        FadeOut(PopUpFrame, fadeOutTime_PopUp);
        setTimeout(() => {
            TaskName.value = "";
            TaskDescription.value = "";
            DueDate.value = "";
            DueTime.value = "";
        }, 3000 * fadeOutTime_PopUp);
    });

    PopUpBackground.addEventListener("click", (event) => {
        if (PopUpBackground.style.display == "block"){
            FadeOut(PopUpBackground, fadeOutTime_Background, true, blurRadius);
            FadeOut(PopUpFrame, fadeOutTime_PopUp);
        };
    });

    document.getElementById("SubmitButton").addEventListener("click", (event) => {
        if (!TaskName.value || !TaskDescription.value || !DueDate.value || !DueTime) {
            if (!TaskName.value) {
                ApplyShakeAnimation(TaskName, "ShakeLeftRight", 0.35);
            };
            if (!TaskDescription.value) {
                ApplyShakeAnimation(TaskDescription, "ShakeLeftRight", 0.35);
            };
            if (!DueDate.value) {
                ApplyShakeAnimation(DueDate, "ShakeLeftRight", 0.35);
            };
            if (!DueTime.value) {
                ApplyShakeAnimation(DueTime, "ShakeLeftRight", 0.35);
            };
        } else { 
            let ToDoCard = {Nosaukums: TaskName.value, Apraksts: TaskDescription.value, TermiņaDiena: DueDate.value, TermiņaLaiks: DueTime.value};

            ToDoList.push(ToDoCard);

            FadeOut(PopUpBackground, fadeOutTime_Background, true, blurRadius);
            FadeOut(PopUpFrame, fadeOutTime_PopUp);
            setTimeout(() => {
                TaskName.value = "";
                TaskDescription.value = "";
                DueDate.value = "";
                DueTime.value = "";
            }, 3000 * fadeOutTime_PopUp);
            RenderCard();
        };
    });
});