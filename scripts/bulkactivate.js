const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
    "forceUpdate": true,
    "paths": [
        "/book.json",
        "/calculator.json",
        "/configs.json",
        "/configs-bak.json",
        "/languages.json",
        "/metadata.json",
        "/placeholders.json",
        "/query-index.json",
        "/redirects.json",
        "/en/about-us",
        "/en/footer",
        "/en/",
        "/en/nav",
        "/en/search",
        "/en/news-releases/2024/23-06-2024",
        "/en/investors/investors",
        "/en/investors/annual-report",
        "/en/investors/financial-highlights",
        "/en/investors/",
        "/zh-cn/about-us",
        "/zh-cn/footer",
        "/zh-cn/",
        "/zh-cn/nav",
        "/zh-cn/search",
        "/zh-cn/news-releases/2024/23-06-2024",
        "/zh-cn/investors/investors",
        "/zh-cn/investors/annual-report",
        "/zh-cn/investors/financial-highlights",
        "/zh-cn/investors/",
        "/experiments/experiment-prudential-home/home-v1",
        "/experiments/experiment-prudential-home/home-v2",
        "/fragments/investor/business-presentation",
        "/fragments/investor/calculator",
        "/fragments/investor/results-business-updates",
        "/tools/sidekick/library.json",
        "/fragments/finance-calculator",
        "/forms",
        "/forms/finance.json"
    ],
    "delete": false
});

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
};

export function activateAll(operation,projectName) {
    const repo = window.origin.split("--")[1];
    const owner = window.origin.split("--")[2].split('.')[0];
    fetch("https://admin.hlx.page/"+operation+"/"+owner+"/"+repo+"/main/*", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}