let Age = document.querySelector("#age");
let Weight = document.querySelector("#weight");
let Height = document.querySelector("#height");
let submitBtn = document.querySelector(".submit button");

let genderList = document.querySelectorAll("#gender button");
addClass(genderList);

let activityList = document.querySelectorAll("#activity button");
addClass(activityList);

function addClass(list) {
    list.forEach((btn) => {
        btn.addEventListener("click", () => {
            list.forEach((b) => {
                b.classList.remove("active");
            })
            btn.classList.add("active");

        })
    })
}

submitBtn.addEventListener("click", () => {
    let errorEl = document.querySelector("#errorMessage");
    let gender = checkClass(genderList);;
    let activity = checkClass(activityList);;

    function checkClass(List) {
        let selected = "";
        List.forEach((btn) => {
            if (btn.classList.contains("active")) {
                selected = btn.innerText;
            }
        })
        return selected;
    }

    if (Age.value === "" || Weight.value === "" || Height.value === "" || gender === "" || activity === "") {
        errorEl.innerText = "Please fill all details first";
        errorEl.style.visibility = "visible";
    } else {
        errorEl.style.visibility = "hidden";
        if (gender === "Male") {
            let BMR = (10 * Weight.value) + (6.25 * Height.value) - (5 * Age.value) + 5;
            calculateTDEE(activity, BMR);
        } else {
            let BMR = (10 * Weight.value) + (6.25 * Height.value) - (5 * Age.value) + 161;
            calculateTDEE(activity, BMR);
        }
    }
})

function calculateTDEE(activity, BMR) {
    switch (activity) {
        case "Less Active":
            displayMsg(BMR * 1.2);
            break;
        case "Active":
            displayMsg(BMR * 1.375);
            break;
        case "Moderately Active":
            displayMsg(BMR * 1.55);
            break;
        default:
            displayMsg(BMR * 1.725);

    }
}

function displayMsg(TDEE) {
    document.querySelector("#message").style.visibility = "visible";
    document.querySelector("#maintain").innerText = `You need ${TDEE} calorie to maintain weight`;
    document.querySelector("#loss").innerText = `You need ${TDEE - 400} calorie to loss weight`;
    document.querySelector("#gain").innerText = `You need ${TDEE + 400} calorie to gain weight`;
}