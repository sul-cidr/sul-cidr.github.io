const RSS_URL =
  "https://events.stanford.edu/widget/view?schools=stanford&departments=stanford_university_libraries&days=90&num=50&html_descriptions=1&hide_past=1&format=rss";

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
      : string,
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  formatDate = (date) => {
    date = new Date(date);
    return `${days[date.getDay()]}, ${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

fetch(RSS_URL)
  .then((response) => response.text())
  .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
  .then((data) => {
    const items = data.querySelectorAll("item");
    let html = ``;
    Array.from(items)
      .filter((el) => el.querySelector("title").innerHTML.includes("CIDR"))
      .forEach((el) => {
        html += `
        <div class="workshop">
          <img src="${el
            .querySelector("content")
            .getAttribute("url")
            .replace(/^http:/, "https:")}" alt="">
          <div>
          <h3>
            <a href="${
              el.querySelector("link").innerHTML
            }" target="_blank" rel="noopener">
              ${el.querySelector("title").innerHTML}
            </a>
          </h3>
          <p>${formatDate(el.querySelector("pubDate").innerHTML)}</p>
          <details>
          <summary>details</summary>
          ${unescape(el.querySelector("description").innerHTML).replace(
            "\\",
            "",
          )}
          </details>
          </div>
        </div>
      `;
      });
    document.querySelector("#workshops").insertAdjacentHTML("beforeend", html);
  });
