var categories = require("./categories");
var iterateObject = require("iterate-object");
var ui = require("./ui");

// Preloads the images
iterateObject(categories, function (cCategory, name) {
    if (name === 'titlesCumulative') { return; }
    iterateObject(cCategory.titles, function (c, index, titles) {
        if (index >= titles.length - 2) { return false; }
        var picture = document.createElement('img');
        picture.src = '/images/' + name + '/' + (index + 1) + '.jpg';
    });
});

var currentLanguage = "fr";
ui.langButton.innerHTML = "en";
function toggleLanguage() {
    var language = ui.langButton.innerHTML;
    ui.langButton.innerHTML = currentLanguage;
    currentLanguage = language;
    document.body.setAttribute("data-lang", currentLanguage);
    updatePicture($cPicture, true);
    updateNavigation();
}

for (var x = 0; x < ui.links.length; x++) {
    var $cLink = ui.links[x];
    $cLink.addEventListener("click", function () {
        var category = this.getAttribute("data-category");
        ui.container.scrollTop = document.querySelector("#image div[data-category='" + category + "']").offsetTop - 100;
    });
}

function updateNavigation() {
    for (var x = 0; x < ui.links.length; x++) {
        var $cLink = ui.links[x];
        $cLink.innerHTML = categories[$cLink.getAttribute("data-category")][currentLanguage === "en" ? "category" : "categorie"];
    }
}

updateNavigation();

// Add the language event listener
ui.langButton.addEventListener('click', toggleLanguage);

function renderImages() {
    var index = 0;
    iterateObject(categories, function (cCategory, prop) {
        function renderContentItem (cTitle, titleIndex, titles) {
            var picture = null;
            if (cTitle && titleIndex >= titles.length - 2) {
                return false;
            } else {
                if (titleIndex !== null) {
                    picture = document.createElement('img');
                    picture.src = '/images/' + prop + '/' + (titleIndex + 1) + '.jpg';
                }
            }

            var contentDiv = document.createElement('div');

            contentDiv.setAttribute('class', 'content');
            contentDiv.setAttribute('data-category', prop);

            if (cTitle) {
                contentDiv.setAttribute('data-title', cTitle);
            }

            var description = {
                en: cCategory.EN,
                fr: cCategory.FR,
            };

            if (cCategory.EN2 && titleIndex > 7) {
                description.en = cCategory.EN2;
            }

            if (cCategory.FR2 && titleIndex > 7) {
                description.fr = cCategory.FR2;
            }

            if (cTitle) {
                contentDiv.setAttribute('data-description-en', description.en);
                contentDiv.setAttribute('data-description-fr', description.fr);
            }

            if (picture) {
                contentDiv.appendChild(picture);
            } else {
                var $textEn = document.createElement("div");
                var $textFr = document.createElement("div");
                $textEn.setAttribute("data-lang", "en");
                $textFr.setAttribute("data-lang", "fr");
                $textEn.textContent = description.en;
                $textFr.textContent = description.fr;
                contentDiv.appendChild($textEn);
                contentDiv.appendChild($textFr);
            }
            ui.container.appendChild(contentDiv);
            ui.contentDivs.push(contentDiv);
        }
        if (!cCategory.titles.length) {
            renderContentItem(null, null, null);
        }
        if (prop === 'titlesCumulative') { return; }
        iterateObject(cCategory.titles, function (cTitle, titleIndex, titles) {
            renderContentItem(cTitle, titleIndex, titles);
        });
    });
}

var $cPicture = null;
function updatePicture($cImg, force) {
    if ($cPicture === $cImg && !force) { return; }
    if (!$cImg) {
        $cImg = ui.contentDivs[0];
    }
    $cPicture = $cImg;
    ui.titleContainer.textContent = $cImg.getAttribute("data-title");
    ui.descriptionContainer.textContent = $cImg.getAttribute("data-description-" + currentLanguage);
    document.querySelector(
        "#menu [data-category].selected"
    ).classList.remove("selected");
    document.querySelector("#menu [data-category='" + $cPicture.getAttribute("data-category") + "']").classList.add("selected");
}

ui.container.addEventListener("scroll", function () {
    var scrollTop = ui.container.scrollTop;
    var cHeight = 0;
    var $cImg = null;
    iterateObject(ui.contentDivs, function (cDiv) {
        cHeight += cDiv.clientHeight;
        if (cHeight > scrollTop) {
            $cImg = cDiv;
            return false;
        }
    });
    updatePicture($cImg);
});

renderImages();
updatePicture();
toggleLanguage();
