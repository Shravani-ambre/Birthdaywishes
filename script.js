/* ✏️ EDIT THIS PART TO MAKE IT YOURS */
var C = {
  name: "Shubham",
  from: "Your love",

  title: "Another year of you, and happy birthdayy to my babdii",

  letter: [
    "Happy birthday! I wanted to make something just for you, because you deserve more than a text.",
    "You make ordinary days like moments. You make me laugh when I'm tired with my problems, and you make me feel like I'm exactly where I'm supposed to be.",
    "I hope today is full of cake, your favorite people, and zero stress. Thank you for being you. i love you so much"
  ],

  reasons: [
    "You always know how to make me smile",
    "Your laugh. Obviously.",
    "The way you support me, even on my silly ideas",
    "You make every moment fill with love",
    "You're kind to everyone, even when no one is watching",
    "You're my best friend and my forever person"
  ],

  moments: [
    ["The beginning", "And somehow, you became my favorite person."],
    ["Our memories", "Every little moment with you means more than you know."],
    ["Right now", "I'm still choosing you, every single day."],
    ["Always", "Here's to all the memories we haven't made yet ❤️"]
  ],

  gifts: [
    ["One big long hug", "Valid anytime, no questions asked"],
    ["A date night, your pick", "I'm paying. You choose."],
    ["Movie night, your choice", "No complaints from me"]
  ]
};
/* ---------------------------------- */

function $(i) {
  return document.getElementById(i);
}

function esc(s) {
  var d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

/* Fill page */
$("gname").textContent = C.name;
$("hname").textContent = C.name;
$("lt").textContent = C.title;

$("lbody").innerHTML = C.letter.map(function (p) {
  return "<p>" + esc(p) + "</p>";
}).join("");

$("lsign").textContent = "Forever yours, " + C.from + " ♥";

$("reasons").innerHTML = C.reasons.map(function (r) {
  return "<li>" + esc(r) + "</li>";
}).join("");

$("tl").innerHTML = C.moments.map(function (m) {
  return "<div><b>" + esc(m[0]) + "</b>" + esc(m[1]) + "</div>";
}).join("");

$("tickets").innerHTML = C.gifts.map(function (g) {
  return '<button class="ticket">' +
    '<span>' + esc(g[0]) +
    '<small>' + esc(g[1]) + '</small></span>' +
    '<span class="tag">Redeem</span>' +
    '</button>';
}).join("");

$("fbig").textContent = "I love you, " + C.name;
$("fsmall").textContent = "i love you so muchhhhhh and I miss you a lot.this is created by ur chotu creator";


/* Confetti */
var cv = $("confetti");
var cx = cv.getContext("2d");
var bits = [];
var run = false;

function size() {
  cv.width = innerWidth;
  cv.height = innerHeight;
}

size();
addEventListener("resize", size);

function burst(n, x, y) {
  var col = [
    "#ff5d8f",
    "#ffb703",
    "#5fe3c0",
    "#fff4e0",
    "#8f7bff"
  ];

  for (var i = 0; i < n; i++) {
    bits.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 13 - 3,
      r: Math.random() * 6.3,
      vr: (Math.random() - 0.5) * 0.4,
      w: 6 + Math.random() * 7,
      h: 4 + Math.random() * 5,
      c: col[i % 5],
      life: 0
    });
  }

  if (!run) {
    run = true;
    tick();
  }
}

function tick() {
  cx.clearRect(0, 0, cv.width, cv.height);

  bits = bits.filter(function (b) {
    return b.y < cv.height + 20 && b.life < 260;
  });

  bits.forEach(function (b) {
    b.vy += 0.35;
    b.vx *= 0.99;
    b.x += b.vx;
    b.y += b.vy;
    b.r += b.vr;
    b.life++;

    cx.save();
    cx.translate(b.x, b.y);
    cx.rotate(b.r);
    cx.fillStyle = b.c;
    cx.fillRect(
      -b.w / 2,
      -b.h / 2,
      b.w,
      b.h
    );
    cx.restore();
  });

  if (bits.length) {
    requestAnimationFrame(tick);
  } else {
    run = false;
    cx.clearRect(0, 0, cv.width, cv.height);
  }
}


/* Open surprise */
$("open").onclick = function () {
  $("gate").classList.add("gone");

  burst(
    70,
    innerWidth / 2,
    innerHeight * 0.6
  );

  window.scrollTo(0, 0);
};


/* Blow candles */
$("blow").onclick = function () {
  $("cake").classList.add("out");
  $("blow").style.display = "none";

  $("hint").textContent = "Wish granted. Scroll down.";
  $("sub").textContent = "";

  burst(
    140,
    innerWidth / 2,
    innerHeight * 0.5
  );

  setTimeout(function () {
    burst(
      90,
      innerWidth * 0.2,
      innerHeight * 0.6
    );
  }, 350);

  setTimeout(function () {
    burst(
      90,
      innerWidth * 0.8,
      innerHeight * 0.6
    );
  }, 650);

  $("after").classList.add("show");

  setTimeout(function () {
    $("after").scrollIntoView({
      behavior: "smooth"
    });
  }, 900);
};


/* Gift tickets */
$("tickets").onclick = function (e) {
  var t = e.target.closest(".ticket");

  if (!t) return;

  t.classList.toggle("used");

  t.querySelector(".tag").textContent =
    t.classList.contains("used")
      ? "Redeemed ♥"
      : "Redeem";

  if (t.classList.contains("used")) {
    var r = t.getBoundingClientRect();

    burst(
      30,
      r.left + r.width / 2,
      r.top
    );
  }
};