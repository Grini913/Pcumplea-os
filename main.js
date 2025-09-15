onload = () =>{
    document.body.classList.remove("container");
};

audio.play().catch(() => {
  document.body.addEventListener("click", () => audio.play(), { once: true });
});