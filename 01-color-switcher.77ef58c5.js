const t={body:document.querySelector("body"),startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};let e=null;function n(){t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}t.startBtn.addEventListener("click",(function(){if(t.startBtn.disabled)return;t.startBtn.disabled=!0,e=setInterval((()=>{n()}),1e3)})),t.stopBtn.addEventListener("click",(function(){clearInterval(e),t.startBtn.disabled=!1}));
//# sourceMappingURL=01-color-switcher.77ef58c5.js.map