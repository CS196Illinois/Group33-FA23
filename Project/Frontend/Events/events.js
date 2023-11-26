// event card data

var data = {}; // Declaring the global variable

document.addEventListener('DOMContentLoaded', function() {
    fetchEvents();
});

function fetchEvents() {
    fetch('http://localhost:3000/events')
        .then(response => response.json())
        .then(eventsFromDB => {
            if (eventsFromDB.length === 0) {
                console.log("Your data is empty");
            } else {
                data = formatData(eventsFromDB);
                console.log(data)
                init(); // Call the initialization function here
            }
        })
        .catch(error => console.error('Error:', error));
}


function formatData(eventsFromDB) {
    let formattedData = {};
    eventsFromDB.forEach((event, index) => {
        formattedData[index] = {
            title: event.title,
            subtitle: event.subtitle,
            desc: event.description,
            tags: event.tags.split(',').map(tag => tag.trim()) // Splitting the tags and trimming any extra spaces
        };
    });
    return formattedData;
}


// colors for badges
var colors = {
    "Community Service": "primary",
    "Environmental": "success",
    "Educational": "warning",
    "Food": "danger"
}

var searchBar = document.getElementById("search")
var checks = document.getElementsByClassName("filterBox")
var shownCards = []

searchBar.addEventListener("input", updateSearch)

// this function updates the cards that show when the input within the search box changes
function updateSearch(e) {
    var value = 0
    // if this function is run outside of the event handler, it won't pass an Event object
    try {
        value = e.target.value.toLowerCase()
    } catch {
        console.log("caught")
        value = e.value.toLowerCase()
    }
    // checks if event cards contain search terms
    for (let i = 0; i < Object.keys(data).length; i++) {
        var shouldShow = data[i].title.toLowerCase().includes(value) || data[i].subtitle.toLowerCase().includes(value) || data[i].desc.toLowerCase().includes(value)
        console.log(shouldShow)
        var card = document.getElementsByClassName("entryNum" + i)[0]
        card.classList.toggle("hide", !shouldShow)
        console.log(shownCards)
        // if the filter indicates that certain cards should NOT be shown, don't show them
        if (!(shownCards.includes(card)) && shownCards.length != 0) {
            card.classList.toggle("hide", true)
        }
    }
}

// this function updates the cards that show when a checkbox is pressed
function newCheck() {
    var allChecked = []
    shownCards = []
    console.log(checks.length)

    // checks which boxes are marked
    for (i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
            allChecked.push(checks[i].value)
        }
    }

    // displays/hides cards depending on filter
    for (i = 0; i < Object.keys(data).length; i++) {
        var check = document.getElementsByClassName("entryNum" + i)[0]
        var shouldShow = true
        for (j = 0; j < allChecked.length; j++) {
            if (!(data[i]["tags"].includes(allChecked[j]))) {
                shouldShow = false
            }
        }
        check.classList.toggle("hide", !shouldShow)
        if (shouldShow) {shownCards.push(check)}
    }
    updateSearch(searchBar)
}

function init() {
    var height = screen.height
    var list = document.getElementsByClassName("scrollit")[0]
    var content = ``
    list.style.height = height / 2

    for (let i = 0; i < 7; i++) {
        var entry = data[i]

        // first card must have special ID for proper CSS
        if (i == 0) {
            content += `<div class="card eventCard entryNum${i}" id = "firstEvent">`
        } else {
            content += `<div class="card eventCard entryNum${i}">`
        }

        // dynamically creates cards
        content += `
            <div class="card-header">
                ${entry.title}
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-4">
                        <img class="float-left img-thumbnail mr-3" style="width: 16cqw; height: 9cqw;" src="./sample1.jpg">
                    </div>
                    <div class="col-6">
                        <h5 class="card-title">${entry.subtitle}</h5>
                        <p class="card-text">${entry.desc}</p>
            `
        
        // dynamically creates filter badges
        for (let i = 0; i < entry["tags"].length; i++) {
            content += `<span class="badge bg-${colors[entry.tags[i]]} text-white mb-3 mr-2">${entry.tags[i]}</span>`
        }

        // finishes event cards
        content += `
        <br>
        <a href="../Apply/apply.html" class="btn btn-primary">Sign up!</a>
        </div>    
        </div>
        </div>
        </div>
        `
    }
    list.innerHTML += content
}

window.onload = init