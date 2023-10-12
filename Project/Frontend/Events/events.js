var data = {
    0: {
        title: "Helping Starving Children",
        subtitle: "Visiting local poor neighborhoods to distribute food",
        desc: "Food/drink will be provided."
    },
    1: {
        title: "Food Pantry Visit",
        subtitle: "Help us pack food baskets for the homeless!",
        desc: "Please sign up below, first 20 volunteers get a tote bag!"
    },
    2: {
        title: "Soup Kitchen Visit",
        subtitle: "Serve soup to impoverished communities",
        desc: "Bring your own set of gloves please."
    },
    3: {
        title: "Event 4",
        subtitle: "Good Event Upcoming",
        desc: "blah blah blah"
    },
    4: {
        title: "Event 5",
        subtitle: "Good Event Upcoming",
        desc: "blah blah blah"
    },
    5: {
        title: "Event 6",
        subtitle: "Good Event Upcoming",
        desc: "blah blah blah"
    },
    6: {
        title: "Event 7",
        subtitle: "Good Event Upcoming",
        desc: "blah blah blah"
    }
}

var searchBar = document.getElementById("search")

searchBar.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    for (let i = 0; i < Object.keys(data).length; i++) {
        console.log(data[i].title)
        var shouldShow = data[i].title.toLowerCase().includes(value) || data[i].subtitle.toLowerCase().includes(value) || data[i].desc.toLowerCase().includes(value)
        var card = document.getElementsByClassName("entryNum" + i)[0]
        card.classList.toggle("hide", !shouldShow)
    }
}) 

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