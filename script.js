const hamburgerButton = document.querySelector('#js-buttonHamburger');
const mainArea = document.getElementById('js-main');
const footerArea = document.querySelector('#js-footer');
const navigation = document.querySelector('#js-nav');
const root = document.documentElement;

const imageclipBox = document.querySelector('#js-checkboxImageclip');
const removeNotMain = document.querySelector('#js-checkboxRemove');
const removeTimestamp = document.querySelector('#js-timestampRemove');



const scrollprevent = (e) => {
  e.preventDefault();
};

hamburgerButton.addEventListener('click', (e) => {
  const isExpanded = e.currentTarget.getAttribute("aria-expanded") !== "false";
  e.currentTarget.setAttribute("aria-expanded", !isExpanded);
  const isHidden = e.currentTarget.getAttribute("aria-hidden") !== "true";
  e.currentTarget.setAttribute("aria-hidden", !isHidden);


  mainArea.inert = !mainArea.inert;
  footerArea.inert = !footerArea.inert;
  navigation.inert = !navigation.inert;
  root.classList.toggle("is-drawerActive");

})


imageclipBox.addEventListener('change', (e) => {
  document.querySelector('#charactor-list').classList.toggle("is-imageclip");
})

removeNotMain.addEventListener('change', (e) => {
  mainArea.classList.toggle("is-disable");
})

removeTimestamp.addEventListener('change', (e) => {
  mainArea.classList.toggle("is-disable-timestamp");
})


// escapeキーでハンバーガーメニューを閉じる
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (root.classList.contains("is-drawerActive")){
      root.classList.remove("is-drawerActive");
    }
  }
})


