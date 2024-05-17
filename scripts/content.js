//const homeIcon = document.querySelector("div.css-901oao.r-1awozwy.r-18jsvk2.r-6koalj.r-18u37iz.r-16y2uox.r-37j5jr.r-a023e6.r-b88u0q.r-1777fci.r-rjixqe.r-bcqeeo.r-q4m81j.r-qvutc0");
console.log("twitter-bird " + document.readyState);

waitForElm("a[aria-label=\"X\"]").then((homeIconContainer) => {
	console.log("twitter-bird element is ready");
	removeAllChildNodes(homeIconContainer);

	const birdContainer = document.createElement("div");
	birdContainer.classList.add('container-a');
	const birdIcon = document.createElement("img");

	var birdIconLink = getIconLink();

	console.log("twitter-bird " + birdIconLink);

	birdIcon.src = birdIconLink;
	birdIcon.height = 32;
	birdIcon.width = 32;
	birdIcon.classList.add('centered-element-a');;

	homeIconContainer.appendChild(birdContainer);
	birdContainer.appendChild(birdIcon);

	updateTabIcon(birdIconLink);
});

function updateTabIcon(birdIconLink) {
	if (isFirefox()) {
		updateFirefoxTabIcon(birdIconLink);
	} else {
		console.log("twitter-bird update Chrome link icon");
		var link = document.querySelector("link[rel~='icon']");
		if (!link) {
    		link = document.createElement('link');
    		link.rel = 'icon';
   			document.head.appendChild(link);
		}
		link.href = birdIconLink;
	}
}

function updateFirefoxTabIcon(birdIconLink) {
	console.log("twitter-bird update Firefox link icon");
	const tab = browser.tabs.getCurrent()
    browser.pageAction.setIcon({ tabId: tab.id, path: birdIconLink });
    browser.pageAction.show(tab.id);
}

function getIconLink() {
	if(isFirefox()) {
		return browser.runtime.getURL("images/twitter-bird.png");
	} else {
		return chrome.runtime.getURL("images/twitter-bird.png");
	}
}

function isFirefox() {
	let userAgent = navigator.userAgent;
	return userAgent.match(/firefox|fxios/i);
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}