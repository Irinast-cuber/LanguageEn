const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");


// -----------------------------
// PAGE NAVIGATION
// -----------------------------

function openPage(pageId) {

    pages.forEach(page => {
        page.classList.remove("active-page");
    });

    navItems.forEach(item => {
        item.classList.remove("active");
    });

    const targetPage = document.getElementById(pageId);

    if (targetPage) {
        targetPage.classList.add("active-page");
    }

    const targetNav = document.querySelector(
        `.nav-item[data-page="${pageId}"]`
    );

    if (targetNav) {
        targetNav.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


navItems.forEach(item => {

    item.addEventListener("click", () => {

        const page = item.dataset.page;

        openPage(page);

    });

});


document
    .getElementById("openRoadmap")
    .addEventListener("click", () => {

        openPage("roadmap");

    });


// -----------------------------
// USER DATA
// -----------------------------

let userData = JSON.parse(
    localStorage.getItem("fluentPathData")
);


// First launch

if (!userData) {

    userData = {

        level: "A0",

        xp: 0,

        wordsLearned: 0,

        streak: 1,

        goalProgress: 4,

        completedTasks: [],

        lastStudyDate: null

    };

}


// -----------------------------
// SAVE DATA
// -----------------------------

function saveData() {

    localStorage.setItem(
        "fluentPathData",
        JSON.stringify(userData)
    );

}


// -----------------------------
// DISPLAY DATA
// -----------------------------

function updateDashboard() {

    document.getElementById(
        "currentLevel"
    ).textContent = userData.level;


    document.getElementById(
        "wordsLearned"
    ).textContent = userData.wordsLearned;


    document.getElementById(
        "streakNumber"
    ).textContent =
        userData.streak +
        (userData.streak === 1 ? " day" : " days");


    document.getElementById(
        "goalPercent"
    ).textContent =
        userData.goalProgress + "%";


    document.getElementById(
        "mainProgress"
    ).style.width =
        userData.goalProgress + "%";


    // Restore completed tasks

    document.querySelectorAll(".task")
        .forEach(task => {

            const taskName = task.dataset.task;

            if (
                userData.completedTasks.includes(taskName)
            ) {

                task.classList.add("completed");

            }

        });

}


// -----------------------------
// DAILY TASKS
// -----------------------------

document.querySelectorAll(".task")
    .forEach(task => {

        task.addEventListener("click", () => {

            const taskName = task.dataset.task;

            const taskIndex =
                userData.completedTasks.indexOf(taskName);


            // ЕСЛИ ЗАДАНИЕ УЖЕ ВЫПОЛНЕНО
            // снимаем отметку

            if (taskIndex !== -1) {

                userData.completedTasks.splice(
                    taskIndex,
                    1
                );

                task.classList.remove("completed");

                // Возвращаем XP
                userData.xp = Math.max(
                    0,
                    userData.xp - 10
                );

                // Возвращаем прогресс
                userData.goalProgress = Math.max(
                    0,
                    userData.goalProgress - 1
                );

            }


            // ЕСЛИ ЗАДАНИЕ НЕ ВЫПОЛНЕНО
            // ставим отметку

            else {

                userData.completedTasks.push(
                    taskName
                );

                task.classList.add("completed");

                userData.xp += 10;

                userData.goalProgress = Math.min(
                    100,
                    userData.goalProgress + 1
                );

            }


            saveData();

            updateDashboard();

        });

    });




// -----------------------------
// VOCABULARY BUTTON
// -----------------------------

document
    .getElementById("reviewWords")
    .addEventListener("click", () => {

        openPage("vocabulary");

    });


// -----------------------------
// WEAK PRACTICE
// -----------------------------

document
    .getElementById("weakPractice")
    .addEventListener("click", () => {

        openPage("practice");

    });


// -----------------------------
// START APP
// -----------------------------

updateDashboard();
