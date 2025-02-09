
const infiniteScroll = document.querySelector(".infinite-scroll");
const infiniteScrollItems = infiniteScroll.querySelectorAll(
  ".infinite-scroll li"
);

pauseAnimation();
playAnimation();

function playAnimation() {
  infiniteScrollItems.forEach((infiniteScrollItem) => {
    infiniteScrollItem.style.animationPlayState = "running";
  });
}
infiniteScrollItems.forEach((infiniteScrollItem) => {
  infiniteScrollItem.addEventListener("mouseenter", () => {
    pauseAnimation();
  });

  infiniteScrollItem.addEventListener("mouseleave", () => {
    playAnimation();
  });
});

function pauseAnimation() {
  infiniteScrollItems.forEach((infiniteScrollItem) => {
    infiniteScrollItem.style.animationPlayState = "paused";
  });
}

const carousel = document.querySelector(".carousel_inner");
const leftButton = document.querySelector(".left");
const rightButton = document.querySelector(".right");
let cards = document.querySelectorAll(".card_carousel");


let primaryPosition = (carousel.scrollLeft += 600);

function handleLeftMove() {
  const SCROLL_AMOUNT = 300;

  // Adiciona a transição suave ao elemento
  carousel.style.scrollBehavior = "smooth";

  // Move o carrossel para a esquerda
  carousel.scrollLeft -= SCROLL_AMOUNT;

  // Remove a primeira carta do carrossel
  let oCard = cards.length - 1;
  let newCard = cards[oCard].cloneNode(true);
  carousel.insertAdjacentHTML("afterbegin", newCard.outerHTML);
  carousel.lastElementChild.remove();

  cards = document.querySelectorAll(".card_carousel");
}

function handleRightMove() {
  const SCROLL_AMOUNT = 300;

  // Adiciona a transição suave ao elemento
  carousel.style.scrollBehavior = "smooth";

  // Move o carrossel para a direita
  carousel.scrollLeft += SCROLL_AMOUNT;

  // Remove a primeira carta do carrossel
  let newCard = cards[0].cloneNode(true);
  carousel.appendChild(newCard);
  carousel.firstElementChild.remove();
  leftButton.style.opacity = 1;
  leftButton.style.cursor = "pointer";
  leftButton.style.pointerEvents = "all";

  console.log(carousel.scrollLeft);

  cards = document.querySelectorAll(".card_carousel");
}

rightButton.addEventListener("click", handleRightMove);
leftButton.addEventListener("click", handleLeftMove);

let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener("mousedown", (e) => {
  isDown = true;
  carousel.classList.add("active");
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});
carousel.addEventListener("mouseleave", (_) => {
  isDown = false;
  carousel.classList.remove("active");
});
carousel.addEventListener("mouseup", (_) => {
  isDown = false;
  carousel.classList.remove("active");
});
carousel.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const SCROLL_SPEED = 3;
  const walk = (x - startX) * SCROLL_SPEED;
  carousel.scrollLeft = scrollLeft - walk;
});

//add touch support
carousel.addEventListener("touchstart", (e) => {
  isDown = true;
  carousel.classList.add("active");
  startX = e.touches[0].pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});
carousel.addEventListener("touchend", (_) => {
  isDown = false;
  carousel.classList.remove("active");
});
carousel.addEventListener("touchmove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.touches[0].pageX - carousel.offsetLeft;
  const SCROLL_SPEED = 3;
  const walk = (x - startX) * SCROLL_SPEED;
  carousel.scrollLeft = scrollLeft - walk;
});
//add keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    handleLeftMove();
  }
  if (e.key === "ArrowRight") {
    handleRightMove();
  }
});

const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menu li");

menu.addEventListener("click", (e) => {
  menuItems.forEach((item) => {
    item.classList.remove("active");
    if (menu.style.display === "flex" && window.innerWidth < 768) {
      menu.style.display = "none";
      burgerButton.classList.remove("active");
    } else {
      return;
    }
  });
  e.target.classList.add("active");
});

//posição dos elementos da pagina

posAbout = document.getElementById("about").offsetTop;
posSkills = document.getElementById("skills").offsetTop;
posProjects = document.getElementById("projects").offsetTop;
posContact = document.getElementById("contact").offsetTop;

menuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    console.log(window.scrollY);
    e.target.classList.add("active");
  });
});

// add position classes on menu buttons

window.addEventListener("scroll", () => {
  if (window.scrollY >= posAbout && window.scrollY <= posSkills) {
    menuItems[0].classList.add("active");
  } else {
    menuItems[0].classList.remove("active");
  }
  if (window.scrollY >= posSkills && window.scrollY <= posProjects) {
    menuItems[1].classList.add("active");
  } else {
    menuItems[1].classList.remove("active");
  }
  if (window.scrollY >= posProjects) {
    menuItems[2].classList.add("active");
  } else {
    menuItems[2].classList.remove("active");
  }
});

//add absolute position to menu

window.addEventListener("scroll", () => {
  if (window.scrollY <= "0" && window.size <= 767) {
    menu.style.position = "inherit";
  } else {
    menu.style.position = "fixed";
  }
});

const burgerButton = document.querySelector(".burger-button");

//burger menu onclick

burgerButton.addEventListener("click", () => {
  burgerButton.classList.toggle("active");
  if (burgerButton.classList.contains("active")) {
    menu.style.display = "flex";
    //entrada com delay
    setTimeout(() => {
      menu.style.right = "0";
    }, 300);
  } else {
    menu.style.right = "-100%";
    setTimeout(() => {
      menu.style.display = "none";
    }), 300;
  }
});
