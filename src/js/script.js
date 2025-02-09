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

// Intro text and additional text animation
inView("header", ({ target }) => {
  animate(
    target.querySelectorAll(".intro_text, .additional_text"),
    { opacity: [0, 1], y: [100, 0] },
    {
      duration: 2,
      easing: [0.1, 0.2, 0.55, 0.75],
      delay: stagger(0.2),
    }
  );
});

// Fade out header
document.querySelectorAll("header").forEach((item) => {
  scroll(animate(item, { opacity: [1, 2, 1.2, -0.1] }, { ease: "linear" }), {
    target: item,
    offset: ["start end", "end end", "start start", "end start"],
  });
});

const items = document.querySelectorAll("li");

// Progress bar representing portfolio gallery scroll
scroll(animate(".progress", { scaleX: [0, 1] }, { ease: "linear" }), {
  target: document.querySelector("#portfolio"),
});

// text animation
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "ae/_?io!>uzmkt";
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
  "Ästhetik",
  "Strategie",
  "Charakter",
  "Methode",
  "Funktion",
  "Zweck",
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
  "Ich achte auf das Detail.",
  "Ich liebe die Vielfalt des zeitgenössischen Typedesign.",
];
const randomIndex = Math.floor(Math.random() * texts.length);
document.getElementById("random_quotes").innerText = texts[randomIndex];

// box_3 und box_4 text animation section statement
document.querySelectorAll(".box_3, .box_4").forEach((item) => {
  scroll(
    animate(
      item,
      { opacity: [0, 1, 1, 0], y: [200, 0, 0, -200] },
      { ease: "ease-in" }
    ),
    {
      target: item,
      offset: ["start end", "end end", "start start", "end start"],
    }
  );
});

// Animate portfolio gallery horizontally during vertical scroll
scroll(
  animate(
    "ul",
    {
      transform: ["none", `translateX(-${items.length - 1}00vw)`],
    },
    { ease: "linear" }
  ),
  { target: document.querySelector("#portfolio") }
);

// Image title parallax
const segmentLength = 1 / items.length;
items.forEach((item, i) => {
  const header = item.querySelectorAll(".description, .number");

  scroll(animate(header, { x: [100, -150] }, { ease: "linear" }), {
    target: document.querySelector("#portfolio"),
    offset: [
      [i * segmentLength, 1],
      [(i + 1) * segmentLength, 0],
    ],
  });
});

// Text animation
inView("footer", ({ target }) => {
  animate(
    target.querySelectorAll(".name, .adress, .contact, .baseline"),
    { opacity: [0, 1], y: [100, 0] },
    {
      duration: 1.5,
      easing: [0.1, 0.2, 0.55, 0.75],
      delay: stagger(0.4),
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
