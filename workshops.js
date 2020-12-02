const RSS_URL = "https://events.stanford.edu/xml/byOrganization/411/rss.xml";

fetch("https://cors-anywhere.herokuapp.com/" + RSS_URL)
  .then((response) => response.text())
  .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
  .then((data) => {
    const items = data.querySelectorAll("item");
    let html = ``;
    items.forEach((el) => {
      html += `
        <div class="workshop">
          <img src="${el
            .querySelector("enclosure")
            .getAttribute("url")
            .replace(/^http:/, "https:")}" alt="">
          <h3>
            <a href="${
              el.querySelector("link").innerHTML
            }" target="_blank" rel="noopener">
              ${el.querySelector("title").innerHTML}
            </a>
          </h3>
          ${_.unescape(el.querySelector("description").innerHTML).replace(
            "\\",
            "",
          )}
        </div>
      `;
    });
    document.querySelector("#workshops").insertAdjacentHTML("beforeend", html);
  });
