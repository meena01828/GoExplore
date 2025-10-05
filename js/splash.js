
  const splash = document.getElementById('splash');
  const splashImg = document.querySelector('.splash-image');

  splashImg.onload = () => {
    // Wait 3 seconds after image is loaded
    setTimeout(() => {
      splash.style.opacity = 0; // fade out
      setTimeout(() => {
        window.location.href = "index.html"; // go to login
      }, 900); // wait for fade transition
    }, 3000);
  };
