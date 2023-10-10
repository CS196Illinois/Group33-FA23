var data = {
    0: {
        title: "Event 1",
        subtitle: "Good Event Upcoming",
        desc: "blah blah blah"
    },
    1: {
        title: "Event 2",
        subtitle: "Good Event Upcoming",
        desc: "blah blah blah"
    },
    2: {
        title: "Event 2",
        subtitle: "Good Event Upcoming",
        desc: "blah blah blah"
    },
    3: {
        title: "Event 3",
        subtitle: "Good Event Upcoming",
        desc: "blah blah blah"
    },
    4: {
        title: "Event 4",
        subtitle: "Good Event Upcoming",
        desc: "blah blah blah"
    },
    5: {
        title: "Event 5",
        subtitle: "Good Event Upcoming",
        desc: "blah blah blah"
    },
    6: {
        title: "Event 6",
        subtitle: "Good Event Upcoming",
        desc: "blah blah blah"
    }
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
        <div class="card eventCard" id = "firstEvent">
            <div class="card-header">
                ${entry.title}
            </div>
            <div class="card-body">
                <h5 class="card-title">${entry.subtitle}</h5>
                <p class="card-text">${entry.desc}</p>
                <a href="../Apply/apply.html" class="btn btn-primary">Sign up!</a>
            </div>
        </div>
        `
            continue
        }
        list.innerHTML += `
        <div class="card eventCard">
            <div class="card-header">
                ${entry.title}
            </div>
            <div class="card-body">
                <h5 class="card-title">${entry.subtitle}</h5>
                <p class="card-text">${entry.desc}</p>
                <a href="../Apply/apply.html" class="btn btn-primary">Sign up!</a>
            </div>
        </div>
        `
    }
}

window.onload = init