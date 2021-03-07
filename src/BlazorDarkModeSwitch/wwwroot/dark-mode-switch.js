(function() {
  var darkSwitch = document.getElementById("darkSwitch");
  if (darkSwitch) {
    initTheme();
    darkSwitch.addEventListener("change", function(event) {
      resetTheme();
    });
    function initTheme() {
      var darkThemeSelected =
        localStorage.getItem("darkSwitch") !== null &&
        localStorage.getItem("darkSwitch") === "dark";
      darkSwitch.checked = darkThemeSelected;
      darkThemeSelected
        ? document.body.setAttribute("data-theme", "dark")
        : document.body.removeAttribute("data-theme");
    }
    function resetTheme() {
      if (darkSwitch.checked) {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("darkSwitch", "dark");
      } else {
        document.body.removeAttribute("data-theme");
        localStorage.removeItem("darkSwitch");
      }
    }
  }
})();


export function resetTheme(darkSwitch){
  if(darkSwitch){
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("darkSwitch", "dark");
  }
  else{
    document.body.removeAttribute("data-theme");
    localStorage.removeItem("darkSwitch");
  }
}

export function initTheme(){
  let darkThemeSelected = 
      localStorage.getItem("darkSwitch") !== null &&
      localStorage.getItem("darkSwitch") === "dark";
  
  if(darkThemeSelected){
    document.body.setAttribute("data-theme", "dark")
  }
  else{
    document.body.removeAttribute("data-theme")
  }
}

export function showPrompt(message) {
  return prompt(message, 'Type anything here');
}