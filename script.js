document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       1. LOCAL STORAGE
    ========================= */

    const browserInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        screenWidth: screen.width,
        screenHeight: screen.height
    };

    localStorage.setItem("systemInfo", JSON.stringify(browserInfo));

    const savedInfo = JSON.parse(localStorage.getItem("systemInfo"));

    const footer = document.querySelector("footer");

    footer.innerHTML += `
        <h3>Browser & System Info</h3>
        <p>User Agent: ${savedInfo.userAgent}</p>
        <p>Platform: ${savedInfo.platform}</p>
        <p>Language: ${savedInfo.language}</p>
        <p>Cookies Enabled: ${savedInfo.cookieEnabled}</p>
        <p>Screen: ${savedInfo.screenWidth} x ${savedInfo.screenHeight}</p>
    `;


    /* =========================
       2. FETCH COMMENTS
    ========================= */

    fetch("https://jsonplaceholder.typicode.com/posts/1/comments") // заміни 1 на свій варіант
        .then(response => response.json())
        .then(data => {

            const commentsBlock = document.getElementById("comments");

            data.forEach(comment => {

                const div = document.createElement("div");
                div.classList.add("comment");

                div.innerHTML = `
                    <h4>${comment.name}</h4>
                    <p><strong>Email:</strong> ${comment.email}</p>
                    <p>${comment.body}</p>
                `;

                commentsBlock.appendChild(div);
            });

        })
        .catch(error => console.log(error));


    /* =========================
   MODAL AFTER 1 MINUTE
========================= */

const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeModal");

// показати через 1 хвилину
setTimeout(function () {
    modal.style.display = "block";
}, 60000);

// закрити
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});


    /* =========================
       4. DAY / NIGHT MODE
    ========================= */

    const toggleBtn = document.getElementById("themeToggle");

    function setThemeByTime() {
        const hour = new Date().getHours();

        if (hour >= 7 && hour < 21) {
            document.body.classList.remove("dark");
        } else {
            document.body.classList.add("dark");
        }
    }

    toggleBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark");
    });

    setThemeByTime();

});