/* =========================================================
   THE WAY I SEE YOU
   Interactions + animations
========================================================= */


/* =========================================================
   INTRO
========================================================= */

const enterButton = document.getElementById("enterButton");
const introScreen = document.getElementById("introScreen");
const mainWorld = document.getElementById("mainWorld");

enterButton.addEventListener("click", () => {

    enterButton.disabled = true;

    enterButton.innerHTML = "<span>opening...</span>";

    setTimeout(() => {
        introScreen.classList.add("exit");

        setTimeout(() => {
            introScreen.style.display = "none";
            mainWorld.classList.remove("hidden");

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

            observeSections();

        }, 900);

    }, 500);
});


/* =========================================================
   CONSTELLATION
========================================================= */

const constellationStars =
    document.querySelectorAll(".constellation-star");

const constellationMessage =
    document.getElementById("constellationMessage");

const constellationMessages = [];

constellationStars.forEach((star) => {

    star.addEventListener("click", () => {

        constellationStars.forEach((item) => {
            item.classList.remove("active");
        });

        star.classList.add("active");

        const message = star.dataset.message;

        constellationMessage.innerHTML = `
            <span style="display:none;"></span>
            ${message}
        `;

        constellationMessage.style.opacity = "0";

        setTimeout(() => {
            constellationMessage.style.opacity = "1";
        }, 50);

    });

});


/* =========================================================
   DETAIL CARDS
========================================================= */

const detailCards =
    document.querySelectorAll(".detail-card");

const detailReveal =
    document.getElementById("detailReveal");

const detailLabel =
    document.getElementById("detailLabel");

const detailTitle =
    document.getElementById("detailTitle");

const detailText =
    document.getElementById("detailText");

const closeDetail =
    document.getElementById("closeDetail");


const detailContent = {

    eyes: {
        label: "the first thing I notice",
        title: "Your Eyes",
        text: "I don't know exactly what it is about them. I just know I always end up looking twice."
    },

    smile: {
        label: "a little unfair",
        title: "Your Smile",
        text: "Your smile has this annoying little habit of making everything around it feel a little lighter."
    },

    dimple: {
        label: "completely unnecessary",
        title: "That Dimple",
        text: "That tiny dimple has absolutely no business being this distracting."
    },

    voice: {
        label: "something I remember",
        title: "Your Voice",
        text: "Some voices are just sounds. Yours is one I could recognise without even having to think."
    },

    look: {
        label: "yeah... that one",
        title: "That Look",
        text: "There is a particular way you look sometimes. I don't think you realise what it does to me."
    }

};


detailCards.forEach((card) => {

    card.addEventListener("click", () => {

        const key = card.dataset.detail;
        const data = detailContent[key];

        detailLabel.textContent = data.label;
        detailTitle.textContent = data.title;
        detailText.textContent = data.text;

        detailReveal.classList.add("open");

        document.body.style.overflow = "hidden";

    });

});


closeDetail.addEventListener("click", closeDetailModal);


detailReveal.addEventListener("click", (event) => {

    if (event.target === detailReveal) {
        closeDetailModal();
    }

});


function closeDetailModal() {

    detailReveal.classList.remove("open");

    document.body.style.overflow = "";

}


/* =========================================================
   GIFT BOX
========================================================= */

const giftBox =
    document.getElementById("giftBox");

const giftMessage =
    document.getElementById("giftMessage");

const closeGift =
    document.getElementById("closeGift");


giftBox.addEventListener("click", () => {

    giftBox.classList.add("open");

    setTimeout(() => {
        giftMessage.classList.add("open");
        document.body.style.overflow = "hidden";
    }, 650);

});


closeGift.addEventListener("click", () => {

    giftMessage.classList.remove("open");

    document.body.style.overflow = "";

    setTimeout(() => {
        giftBox.classList.remove("open");
    }, 350);

});


giftMessage.addEventListener("click", (event) => {

    if (event.target === giftMessage) {

        giftMessage.classList.remove("open");

        document.body.style.overflow = "";

        setTimeout(() => {
            giftBox.classList.remove("open");
        }, 350);

    }

});


/* =========================================================
   LETTER
========================================================= */

const letterEnvelope =
    document.getElementById("letterEnvelope");

const letterModal =
    document.getElementById("letterModal");

const closeLetter =
    document.getElementById("closeLetter");


letterEnvelope.addEventListener("click", () => {

    if (letterEnvelope.classList.contains("open")) {

        letterModal.classList.add("open");

        document.body.style.overflow = "hidden";

        return;
    }

    letterEnvelope.classList.add("open");

    setTimeout(() => {

        letterModal.classList.add("open");

        document.body.style.overflow = "hidden";

    }, 1000);

});


closeLetter.addEventListener("click", closeLetterModal);


letterModal.addEventListener("click", (event) => {

    if (event.target === letterModal) {
        closeLetterModal();
    }

});


function closeLetterModal() {

    letterModal.classList.remove("open");

    document.body.style.overflow = "";

}


/* =========================================================
   SECRET MESSAGE
========================================================= */

const secretStar =
    document.getElementById("secretStar");

const secretMessage =
    document.getElementById("secretMessage");

const closeSecret =
    document.getElementById("closeSecret");


secretStar.addEventListener("click", () => {

    secretMessage.classList.add("open");

    document.body.style.overflow = "hidden";

});


closeSecret.addEventListener("click", () => {

    secretMessage.classList.remove("open");

    document.body.style.overflow = "";

});


secretMessage.addEventListener("click", (event) => {

    if (event.target === secretMessage) {

        secretMessage.classList.remove("open");

        document.body.style.overflow = "";

    }

});


/* =========================================================
   RESTART
========================================================= */

const restartButton =
    document.getElementById("restartButton");


restartButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

let observer;


function observeSections() {

    if (observer) {
        observer.disconnect();
    }

    const revealElements =
        document.querySelectorAll(
            ".section-heading, .memory-card, .detail-card, .meaning-final, .gift-area, .letter-area"
        );

    observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                }

            });

        },

        {
            threshold: 0.12
        }

    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });

}


/* =========================================================
   CURSOR SPARKLES
========================================================= */

const sparkleLayer =
    document.getElementById("sparkleLayer");

let sparkleTimer = null;


document.addEventListener("mousemove", (event) => {

    if (mainWorld.classList.contains("hidden")) {
        return;
    }

    if (sparkleTimer) {
        return;
    }

    sparkleTimer = setTimeout(() => {

        createSparkle(
            event.clientX,
            event.clientY
        );

        sparkleTimer = null;

    }, 70);

});


function createSparkle(x, y) {

    const sparkle =
        document.createElement("span");

    sparkle.className = "cursor-sparkle";

    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    sparkleLayer.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 900);

}


/* =========================================================
   DYNAMIC SPARKLE STYLE
========================================================= */

const sparkleStyle =
    document.createElement("style");

sparkleStyle.textContent = `

    .cursor-sparkle {
        position: fixed;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: rgba(255,247,238,0.8);
        pointer-events: none;
        z-index: 100;
        animation: cursorSparkle 0.9s ease-out forwards;
    }

    .cursor-sparkle::before,
    .cursor-sparkle::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        background: rgba(255,247,238,0.8);
        transform: translate(-50%, -50%);
    }

    .cursor-sparkle::before {
        width: 15px;
        height: 1px;
    }

    .cursor-sparkle::after {
        width: 1px;
        height: 15px;
    }

    @keyframes cursorSparkle {

        0% {
            opacity: 0;
            transform: scale(0.3) rotate(0deg);
        }

        25% {
            opacity: 1;
            transform: scale(1) rotate(45deg);
        }

        100% {
            opacity: 0;
            transform:
                translate(
                    ${(Math.random() - 0.5) * 30}px,
                    ${(Math.random() - 0.5) * 30}px
                )
                scale(0)
                rotate(90deg);
        }

    }

`;

document.head.appendChild(sparkleStyle);


/* =========================================================
   CLICK SPARKLE BURST
========================================================= */

document.addEventListener("click", (event) => {

    if (
        event.target.closest("button") &&
        !event.target.closest(".close-detail") &&
        !event.target.closest(".close-gift") &&
        !event.target.closest(".close-letter")
    ) {

        createSparkleBurst(
            event.clientX,
            event.clientY
        );

    }

});


function createSparkleBurst(x, y) {

    for (let i = 0; i < 7; i++) {

        const particle =
            document.createElement("span");

        particle.className = "click-particle";

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        const angle =
            (Math.PI * 2 / 7) * i;

        const distance =
            25 + Math.random() * 25;

        particle.style.setProperty(
            "--x",
            `${Math.cos(angle) * distance}px`
        );

        particle.style.setProperty(
            "--y",
            `${Math.sin(angle) * distance}px`
        );

        sparkleLayer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 700);

    }

}


/* =========================================================
   CLICK PARTICLE STYLE
========================================================= */

const particleStyle =
    document.createElement("style");

particleStyle.textContent = `

    .click-particle {
        position: fixed;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #e5bdca;
        pointer-events: none;
        z-index: 101;
        animation: clickParticle 0.7s ease-out forwards;
    }

    @keyframes clickParticle {

        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }

        100% {
            opacity: 0;
            transform:
                translate(
                    calc(-50% + var(--x)),
                    calc(-50% + var(--y))
                )
                scale(0);
        }

    }

`;

document.head.appendChild(particleStyle);


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
        return;
    }

    closeDetailModal();

    giftMessage.classList.remove("open");
    letterModal.classList.remove("open");
    secretMessage.classList.remove("open");

    document.body.style.overflow = "";

});


/* =========================================================
   INITIAL STATE
========================================================= */

window.addEventListener("load", () => {

    window.scrollTo(0, 0);

});
