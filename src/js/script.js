import {
  animate,
  scroll,
} from "https://cdn.jsdelivr.net/npm/framer-motion@11.11.11/dom/+esm";

const items = document.querySelectorAll("li");

// Animate gallery horizontally during vertical scroll
scroll(
  animate(
    "ul",
    {
      transform: ["none", `translateX(-${items.length - 1}00vw)`],
    },
    { ease: "linear" }
  ),
  { target: document.querySelector("section") }
);

// Progress bar representing gallery scroll
scroll(animate(".progress", { scaleX: [0, 1] }, { ease: "linear" }), {
  target: document.querySelector("section"),
});

// Image title parallax
const segmentLength = 1 / items.length;
items.forEach((item, i) => {
  const header = item.querySelectorAll("h4, .description");

  scroll(animate(header, { x: [300, -100] }, { ease: "linear" }), {
    target: document.querySelector("section"),
    offset: [
      [i * segmentLength, 1],
      [(i + 1) * segmentLength, 0],
    ],
  });
});

// Text animation
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

// phrases
const phrases = ["Prägnanz", "Schönheit", "Einfachheit", "Charakter"];

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
