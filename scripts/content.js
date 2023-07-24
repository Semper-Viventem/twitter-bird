//const homeIcon = document.querySelector("div.css-901oao.r-1awozwy.r-18jsvk2.r-6koalj.r-18u37iz.r-16y2uox.r-37j5jr.r-a023e6.r-b88u0q.r-1777fci.r-rjixqe.r-bcqeeo.r-q4m81j.r-qvutc0");
console.log("twitter-bird " + document.readyState);

waitForElm("a[aria-label='Twitter']").then((homeIconContainer) => {
	console.log("twitter-bird element is ready");
	removeAllChildNodes(homeIconContainer);

	const birdContainer = document.createElement("div");
	birdContainer.classList.add('container-a');
	const birdIcon = document.createElement("img");
	const birdIconLink = "chrome-extension://" + chrome.runtime.id + "/images/twitter-bird.png";
	birdIcon.src = birdIconLink;
	birdIcon.height = 50;
	birdIcon.width = 50;
	birdIcon.classList.add('centered-element-a');;

	homeIconContainer.appendChild(birdContainer);
	birdContainer.appendChild(birdIcon);

	var link = document.querySelector("link[rel~='icon']");
	if (!link) {
    	link = document.createElement('link');
    	link.rel = 'icon';
    	document.head.appendChild(link);
	}
	link.href = birdIconLink;
});

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