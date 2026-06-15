const patterns = {
  bunny: {
    title: "미피 파우치",
    meta: "코바늘 3mm · 흰색 코튼실 · 총 28단",
    pattern: `
      머리 — 매직링 6코<br>
      1~8단: 짧은뜨기 늘림<br>
      9~18단: 짧은뜨기 유지<br>
      귀 — 2개를 따로 떠서 연결<br>
      마무리: 눈과 입을 자수로 표현
    `
  },
  tassel: {
    title: "해파리 키링",
    meta: "코바늘 4mm · 믹스얀 · 장식끈",
    pattern: `
      상단 고리 — 사슬뜨기 20코<br>
      몸통 — 긴뜨기 6단<br>
      태슬 — 실을 길게 잘라 묶기<br>
      장식: 리본 또는 비즈 추가
    `
  },
  pouch: {
    title: "튤립 에어팟 파우치",
    meta: "코바늘 3.5mm · 면사 · 지퍼",
    pattern: `
      바닥 — 사슬뜨기 24코<br>
      1~12단: 짧은뜨기 원형 진행<br>
      꽃무늬 — 배색실로 포인트<br>
      마무리: 지퍼를 안쪽에 손바느질
    `
  },
  tomato: {
    title: "토마토 키링",
    meta: "코바늘 3mm · 빨강/초록실",
    pattern: `
      토마토 몸체 — 매직링 6코<br>
      1~10단: 둥글게 늘리고 줄이기<br>
      꼭지 — 초록실로 별 모양 뜨기<br>
      키링 고리 연결 후 실 정리
    `
  },
  house: {
    title: "집 모양 티코스터",
    meta: "코바늘 4mm · 보송한 실 · 자수실",
    pattern: `
      파우치 몸체 — 둥근 사각형으로 진행<br>
      1~16단: 짧은뜨기 반복<br>
      딸기 — 빨간 실로 입체 장식<br>
      작은 집 자수로 포인트 넣기
    `
  },
  vest: {
    title: "레이스 패턴 니트 조끼",
    meta: "대바늘 5mm · 아란울 · 총 52단",
    pattern: `
      밑단 — 2코 고무뜨기 12단<br>
      몸판 — 케이블 패턴 반복<br>
      암홀 — 양쪽 줄임 진행<br>
      어깨 연결 후 목둘레 마감
    `
  },
  blackbag: {
    title: "플라워 크로스백",
    meta: "코바늘 5mm · 블랙 실 · 체인끈",
    pattern: `
      바닥 — 사슬뜨기 18코<br>
      1~8단: 짧은뜨기 타원형 진행<br>
      몸통 — 팝콘뜨기 패턴 반복<br>
      손잡이 또는 체인끈 연결
    `
  },
  mushroom: {
    title: "버섯 책갈피",
    meta: "코바늘 2.5mm · 레드/베이지실",
    pattern: `
      버섯 갓 — 빨간 실로 반원 형태<br>
      점무늬 — 흰색 실로 자수<br>
      줄기 — 베이지실로 짧은뜨기<br>
      책갈피 끈 — 사슬뜨기 길게 연결
    `
  }
};

const revealItems = document.querySelectorAll(".reveal");
const modal = document.getElementById("patternModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalPattern = document.getElementById("modalPattern");

const rowCount = document.getElementById("rowCount");
const minusCount = document.getElementById("minusCount");
const plusCount = document.getElementById("plusCount");
const resetCount = document.getElementById("resetCount");

const openList = document.getElementById("openList");
const closeList = document.getElementById("closeList");
const listView = document.getElementById("listView");
const listGrid = document.querySelector(".list-grid");

let currentCount = 1;

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  {
    threshold: 0.25
  }
);

revealItems.forEach(item => observer.observe(item));

document.querySelectorAll(".knit-item").forEach(item => {
  item.addEventListener("click", () => {
    const id = item.dataset.id;
    openPattern(id);
  });
});

function openPattern(id) {
  const data = patterns[id];

  if (!data) return;

  modalTitle.textContent = data.title;
  modalMeta.textContent = data.meta;
  modalPattern.innerHTML = data.pattern;

  currentCount = 1;
  updateCounter();

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closePattern() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

function updateCounter() {
  rowCount.classList.remove("count-up");

  void rowCount.offsetWidth;

  rowCount.textContent = `${currentCount}단 완료`;
  rowCount.classList.add("count-up");
}


minusCount.addEventListener("click", () => {
  currentCount = Math.max(1, currentCount - 1);
  updateCounter();
  animateCounterButton(minusCount);
});

plusCount.addEventListener("click", () => {
  currentCount += 1;
  updateCounter();
  animateCounterButton(plusCount);
});

function animateCounterButton(button) {
  button.classList.add("is-clicked");

  setTimeout(() => {
    button.classList.remove("is-clicked");
  }, 180);
}

resetCount.addEventListener("click", () => {
  currentCount = 1;
  updateCounter();
});


closeModal.addEventListener("click", closePattern);

modal.addEventListener("click", event => {
  if (event.target.classList.contains("modal-dim")) {
    closePattern();
  }
});

openList.addEventListener("click", () => {
  listView.classList.add("is-open");
  listView.setAttribute("aria-hidden", "false");
});

closeList.addEventListener("click", () => {
  listView.classList.remove("is-open");
  listView.setAttribute("aria-hidden", "true");
});

listView.addEventListener("click", event => {
  if (event.target === listView || event.target.classList.contains("list-view")) {
    listView.classList.remove("is-open");
    listView.setAttribute("aria-hidden", "true");
  }
});

function createListView() {
  const items = document.querySelectorAll(".knit-item");

  items.forEach(item => {
    const id = item.dataset.id;
    const img = item.querySelector("img");
    const name = item.querySelector("span").textContent;

    const card = document.createElement("button");
    card.type = "button";
    card.className = "list-card";
    card.dataset.id = id;

    card.innerHTML = `
      <img src="${img.getAttribute("src")}" alt="${name}">
      <span>${name}</span>
    `;

    card.addEventListener("click", () => {
      listView.classList.remove("is-open");
      listView.setAttribute("aria-hidden", "true");
      openPattern(id);
    });

    listGrid.appendChild(card);
  });
}

createListView();

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closePattern();
    listView.classList.remove("is-open");
    listView.setAttribute("aria-hidden", "true");
  }
});

function updateButtonsPosition() {
  const container = document.querySelector('.archive');
  const buttons = document.querySelector('.fixed-buttons');
  const rect = container.getBoundingClientRect();
  const rightEdge = window.innerWidth - rect.right;
  buttons.style.right = Math.max(16, rightEdge + 16) + 'px';
}

updateButtonsPosition();
window.addEventListener('resize', updateButtonsPosition);

const cursorYarn = document.querySelector(".cursor-yarn");

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

window.addEventListener("mousemove", event => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.38;
  cursorY += (mouseY - cursorY) * 0.38;

  cursorYarn.style.left = `${cursorX}px`;
  cursorYarn.style.top = `${cursorY}px`;

  requestAnimationFrame(animateCursor);
}

animateCursor();

document.querySelectorAll("a, button").forEach(element => {
  element.addEventListener("mouseenter", () => {
    cursorYarn.classList.add("is-hovering");
  });

  element.addEventListener("mouseleave", () => {
    cursorYarn.classList.remove("is-hovering");
  });
});