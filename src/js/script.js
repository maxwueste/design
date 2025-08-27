// loading animation

import {
  animate,
  stagger,
  scroll,
  inView,
} from "https://cdn.jsdelivr.net/npm/framer-motion@11.11.11/dom/+esm";

// Progress bar representing entire website scroll
scroll(animate(".progress_bar", { scaleX: [0, 1] }, { ease: "linear" }), {
  target: document.querySelector("wrapper"),
});

// glitch text animation
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "ae/_?iou!";
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 60);
      const end = start + Math.floor(Math.random() * 60);
      this.queue.push({
        from,
        to,
        start,
        end,
      });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const phrases = [
  "Prägnanz",
  "Emotion",
  "Klarheit",
  "Ästhetik",
  "Strategie",
  "Methode",
  "Funktion",
  "Zweck",
  "Format",
  "Medium",
];

const el = document.querySelector(".glitchtext");
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 3500);
  });
  counter = (counter + 1) % phrases.length;
};

next();

// Intro text and additional text animation
inView("header", ({ target }) => {
  animate(
    target.querySelectorAll(".intro_text, .additional_text"),
    { opacity: [0, 1], y: [150, 0] },
    {
      duration: 1,
      easing: [0.1, 0.2, 0.55, 0.75],
      delay: stagger(0.5),
    }
  );
});

// Fade out intro_text and additional_text
document.querySelectorAll(".intro_text, .additional_text").forEach((item) => {
  scroll(
    animate(
      item,
      {
        opacity: [1, 0],
      },
      { ease: "easeOut" }
    ),
    {
      target: item,
      offset: ["start start", "end start"],
    }
  );
});

// box_1 photo animation section statement
document.querySelectorAll("img.portrait").forEach((item) => {
  scroll(
    animate(
      item,
      {
        opacity: [0.6, 1, 1, 0],
        scale: [2.3, 1.1, 1.1, 1.1],
      },
      { ease: "linear" }
    ),
    {
      target: item,
      offset: ["start end", "end end", "start start", "end start"],
    }
  );
});

// box_2 text set random quotes
const texts = [
  "Ich achte stets auf Details und arbeite mit Sorgfalt.",
  "Ich liebe die Vielfalt des zeitgenössischen Typedesign.",
  "Meine Arbeiten überzeugen mit nachhaltiger Wirkung.",
  "Auch in der Kreation von Text und Bild liegen meine Stärken.",
  "Ich biete Lösungen an, die Verbindungen schaffen.",
  "Du bestimmst das Budget – ich finde das passgenaue Konzept.",
  "Typografische Prinzipien wende ich grundsätzlich an.",
  "Ich setze oft auf einen Gestaltungsmix aus analog und digital.",
  "Konzeption, Kreation und Postproduktion – alles aus einer Hand.",
  " Ich aktiviere deine Kommunikation erfolgreich.",
];
const randomIndex = Math.floor(Math.random() * texts.length);
document.getElementById("random_quotes").innerText = texts[randomIndex];

// box_3 and box_4 text animation section statement
document.querySelectorAll(".box_3, .box_4").forEach((item) => {
  scroll(
    animate(
      item,
      { opacity: [0, 1, 1, 1], y: [150, 0, 0, 0] },
      { ease: "linear" }
    ),
    {
      target: item,
      offset: ["start end", "end end", "start start", "end start"],
    }
  );
});

// circle animation
document.querySelectorAll(".circle_white").forEach((item) => {
  scroll(
    animate(
      item,
      {
        scale: [-100, 100],
      },
      { ease: "linear" }
    ),
    {
      target: item,
      offset: ["start end", "end start"],
    }
  );
});

// Fade in circle_text
document
  .querySelectorAll(".circle_appetizer, .circle_heading, .circle_text")
  .forEach((item) => {
    scroll(
      animate(item, {
        opacity: [0, 1, 1, 1],
        ease: "easeIn",
      }),
      {
        target: item,
        offset: ["start end", "end end", "start start", "end start"],
      }
    );
  });

// Animation Box Number and Description
document
  .querySelectorAll(
    ".box_portfolio_img, .box_portfolio_number, .box_portfolio_description"
  )
  .forEach((item) => {
    scroll(
      animate(item, {
        opacity: [0, 1],
        ease: "linear",
      }),
      {
        target: item,
        offset: ["start end", "end end"],
      }
    );
  });

// Text animation
document;
inView("footer", ({ target }) => {
  animate(
    target.querySelectorAll(".name, .adress, .contact, .baseline"),
    { opacity: [0, 1], y: [150, 0] },
    {
      duration: 1,
      easing: [0.1, 0.2, 0.55, 0.75],
      delay: stagger(0.5),
    }
  );
});

// random accent color
document.body.style.setProperty(
  "--accent",
  `var(--hue-${Math.ceil(Math.random() * 6) - 1})`
);

// get current date in the basline
const d = new Date().toLocaleDateString("de-DE", {
  year: "numeric",
  month: "long",
});
document.getElementById("date").innerHTML = d;
