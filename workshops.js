const RSS_URL = "sul-events-feed.rss.xml";

const reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
  reHasEscapedHtml = RegExp(reEscapedHtml.source),
  htmlUnescapes = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&#96;": "`",
  },
  unescape = (string) =>
    string && reHasEscapedHtml.test(string)
      ? string.replace(reEscapedHtml, (x) => htmlUnescapes[x])
      : string;

fetch(RSS_URL)
  .then((response) => response.text())
  .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
  .then((data) => {
    const items = data.querySelectorAll("item");
    let html = ``;
    Array.from(items)
      .filter((el) =>
        el
          .querySelector("title")
          .innerHTML.includes("Digital Tools and Methods"),
      )
      .forEach((el) => {
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
          ${unescape(el.querySelector("description").innerHTML).replace(
            "\\",
            "",
          )}
        </div>
      `;
      });
    document.querySelector("#workshops").insertAdjacentHTML("beforeend", html);
  });
