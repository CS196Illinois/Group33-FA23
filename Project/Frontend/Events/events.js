var data = {
    0: {
        title: "Garbage Pickup",
        subtitle: "Picking up garbage in Champaign",
        desc: "Garbage bags and gloves will be provided.",
        tags: ["Community Service", "Environmental"]
    },
    1: {
        title: "Food Pantry Visit",
        subtitle: "Help us pack food baskets for the homeless!",
        desc: "Please sign up below, first 20 volunteers get a tote bag!",
        tags: ["Community Service", "Food"]
    },
    2: {
        title: "Soup Kitchen Visit",
        subtitle: "Serve soup to impoverished communities",
        desc: "Bring your own set of gloves please.",
        tags: ["Community Service", "Food"]
    },
    3: {
        title: "Teaching Children",
        subtitle: "Read a book to communities of impoverished children",
        desc: "Books will be provided, please show up to the library 30 minutes before your assigned time.",
        tags: ["Community Service", "Educational"]
    },
    4: {
        title: "Save the Birds",
        subtitle: "Feed endangered birds in our community",
        desc: "Enjoy birdwatching and nature? This will be perfect for you! Bird food will be provided.",
        tags: ["Environmental", "Food"]
    },
    5: {
        title: "Serve as a Mentor",
        subtitle: "Spend a day with children coming from neglected households",
        desc: "We encourage you to keep in contact with your assigned child after the program is over.",
        tags: ["Community Service", "Educational"]
    },
    6: {
        title: "Spread Your Recipes",
        subtitle: "Prepare food for poor communities",
        desc: "Please prepare enough to feed about 10 families. Share your recipes with other particpants!",
        tags: ["Educational", "Food"]
    }
}

var searchBar = document.getElementById("search")
var checks = document.getElementsByClassName("filterBox")
var shownCards = []

searchBar.addEventListener("input", updateSearch)

function updateSearch(e) {
    var value = 0
    try {
        value = e.target.value.toLowerCase()
    } catch {
        console.log("caught")
        value = e.value.toLowerCase()
    }
    for (let i = 0; i < Object.keys(data).length; i++) {
        var shouldShow = data[i].title.toLowerCase().includes(value) || data[i].subtitle.toLowerCase().includes(value) || data[i].desc.toLowerCase().includes(value)
        console.log(shouldShow)
        var card = document.getElementsByClassName("entryNum" + i)[0]
        card.classList.toggle("hide", !shouldShow)
        console.log(shownCards)
        if (!(shownCards.includes(card)) && shownCards.length != 0) {
            card.classList.toggle("hide", true)
        }
    }
}

function newCheck() {
    var allChecked = []
    shownCards = []
    console.log(checks.length)

    for (i = 0; i < checks.length; i++) {
        console.log(i)
        if (checks[i].checked) {
            allChecked.push(checks[i].value)
            console.log("marked")
            console.log(checks[i].value)
        }
    }
    console.log(allChecked)
    for (i = 0; i < Object.keys(data).length; i++) {
        console.log(i)
        var check = document.getElementsByClassName("entryNum" + i)[0]
        var shouldShow = true
        console.log(allChecked.length)
        checkLength = allChecked.length
        if (checkLength.length == 0) {checkLength = 1}
        for (j = 0; j < allChecked.length; j++) {
            console.log("hi")
            if (!(data[i]["tags"].includes(allChecked[j]))) {
                shouldShow = false
            }
        }
        check.classList.toggle("hide", !shouldShow)
        if (shouldShow) {shownCards.push(check)}
    }
    console.log("--------------")
    console.log(searchBar.value)
    updateSearch(searchBar)
}

function init() {
    var height = screen.height
    var list = document.getElementsByClassName("scrollit")[0]
    console.log(list)
    list.style.height = height / 2

    for (let i = 0; i < 7; i++) {
        var entry = data[i]
        if (i == 0) {
            list.innerHTML += `
        <div class="card eventCard entryNum${i}" id = "firstEvent">
            <div class="card-header">
                ${entry.title}
            </div>
            <div class="card-body">
                <img class="float-left img-thumbnail mr-3" style="width: 16cqw; height: 9cqw;" src="./sample1.jpg">
                <h5 class="card-title">${entry.subtitle}</h5>
                <p class="card-text">${entry.desc}</p>
                <a href="../Apply/apply.html" class="btn btn-primary">Sign up!</a>
            </div>
        </div>
        `
            continue
        }
        list.innerHTML += `
        <div class="card eventCard entryNum${i}">
            <div class="card-header">
                ${entry.title}
            </div>
            <div class="card-body">
            <img class="float-left img-thumbnail mr-3" style="width: 16cqw; height: 9cqw;" src="./sample1.jpg">
                <h5 class="card-title">${entry.subtitle}</h5>
                <p class="card-text">${entry.desc}</p>
                <a href="../Apply/apply.html" class="btn btn-primary">Sign up!</a>
            </div>
        </div>
        `
    }
}

window.onload = init