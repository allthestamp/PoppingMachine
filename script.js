const modelCopy = {
  red: {
    title: "레드 모델 사용 순서",
    steps: [
      "프린터로 도안을 팝핑지에 선명하게 인쇄합니다.",
      "고무패드 위에 필름을 놓고, 도안(팝핑지)을 가장 위에 올립니다.",
      "세 재료의 위치를 맞춘 뒤 기계의 작업 공간에 넣습니다.",
      "감광이 끝나면 고무패드를 꺼내 도안이 고르게 표현됐는지 확인합니다.",
    ],
    note: "레드 모델은 아래에서부터 고무패드 → 필름 → 도안(팝핑지) 순서입니다.",
    video: "assets/팝핑머신 레드.mp4",
    videoLabel: "RED MODEL / VIDEO GUIDE",
    ratioLabel: "가로 영상",
    orientation: "landscape",
  },
  pro: {
    title: "프로 모델 사용 순서",
    steps: [
      "프린터로 도안을 팝핑지에 선명하게 인쇄합니다.",
      "도안(팝핑지) 위에 필름을 놓고, 고무패드를 가장 위에 올립니다.",
      "세 재료의 위치를 맞춘 뒤 기계의 작업 공간에 넣습니다.",
      "감광이 끝나면 고무패드를 꺼내 도안이 고르게 표현됐는지 확인합니다.",
    ],
    note: "프로 모델은 아래에서부터 도안(팝핑지) → 필름 → 고무패드 순서입니다.",
    video: "assets/팝핑머신 프로.mp4",
    videoLabel: "PRO MODEL / VIDEO GUIDE",
    ratioLabel: "세로 영상",
    orientation: "portrait",
  },
};

const tabs = document.querySelectorAll("[data-model]");
const title = document.querySelector("[data-model-title]");
const steps = document.querySelector("[data-model-steps]");
const note = document.querySelector("[data-model-note]");
const guideVideo = document.querySelector("[data-guide-video]");
const videoStage = document.querySelector("[data-video-stage]");
const videoLabel = document.querySelector("[data-video-label]");
const videoRatio = document.querySelector("[data-video-ratio]");

function setModel(model) {
  const copy = modelCopy[model];
  if (!copy || !title || !steps || !note) return;

  tabs.forEach((tab) => {
    const isActive = tab.dataset.model === model;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  title.textContent = copy.title;
  steps.innerHTML = copy.steps.map((step) => `<li>${step}</li>`).join("");
  note.textContent = copy.note;

  if (guideVideo) {
    guideVideo.pause();
    guideVideo.src = copy.video;
    guideVideo.controls = true;
    guideVideo.setAttribute("aria-label", `${model === "red" ? "레드" : "프로"} 모델 사용방법 영상`);
    guideVideo.load();
  }
  if (videoStage) videoStage.className = `video-stage is-${copy.orientation}`;
  if (videoLabel) videoLabel.textContent = copy.videoLabel;
  if (videoRatio) videoRatio.textContent = copy.ratioLabel;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setModel(tab.dataset.model));
});

const toTop = document.createElement("button");
toTop.className = "to-top";
toTop.type = "button";
toTop.title = "맨 위로";
toTop.setAttribute("aria-label", "맨 위로");
toTop.innerHTML = '<i data-lucide="arrow-up"></i>';
document.body.append(toTop);

function updateToTop() {
  toTop.classList.toggle("visible", window.scrollY > 360);
}

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
window.addEventListener("scroll", updateToTop, { passive: true });
updateToTop();

window.addEventListener("load", () => {
  window.lucide?.createIcons();
});
