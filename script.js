document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const backgroundColor = getComputedStyle(body).backgroundColor;
  const maxCircles = 5;
  const circles = [];
  const colorSet = [
    'rgba(251, 248, 204, 0.5)',
    'rgba(253, 228, 207, 0.5)',
    'rgba(255, 207, 210, 0.5)',
    'rgba(241, 192, 232, 0.5)',
    'rgba(207, 186, 240, 0.5)',
    'rgba(163, 196, 243, 0.5)',
    'rgba(144, 219, 244, 0.5)',
    'rgba(142, 236, 245, 0.5)',
    'rgba(152, 245, 225, 0.5)',
    'rgba(185, 251, 192, 0.5)',
  ];

  function createBlurryCircle() {
    const circle = document.createElement('div');
    circle.style.position = 'absolute';
    circle.style.borderRadius = '100%';
    circle.style.width = '1000px'; // Adjust the width and height as needed
    circle.style.height = '1000px';
    circle.style.zIndex = '-1'; // Set a negative z-index to place circles behind other content
    body.appendChild(circle);
    return circle;
  }

  function setRandomAttributes(circle) {
    const maxX = window.innerWidth - 100; // Adjust the maximum X position
    const maxY = window.innerHeight - 100; // Adjust the maximum Y position

    let overlap = true;
    let attempts = 0;

    while (overlap && attempts < 50) {
      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      overlap = circles.some(existingCircle => {
        const distance = Math.sqrt((randomX - existingCircle.x) ** 2 + (randomY - existingCircle.y) ** 2);
        return distance < 300; // Adjust the minimum distance between circles
      });

      if (!overlap) {
        circle.style.left = `${randomX}px`;
        circle.style.top = `${randomY}px`;
        circle.x = randomX;
        circle.y = randomY;
      }

      attempts++;
    }

    const randomColor = getRandomColor();
    circle.style.backgroundImage = `radial-gradient(circle, ${randomColor} 30%, transparent 70%)`;
    circle.style.backgroundColor = backgroundColor;
  }

  function getRandomColor() {
    return colorSet[Math.floor(Math.random() * colorSet.length)];
  }

  function animateBlurryCircle(circle) {
    let fadeIn = true;

    function animationStep() {
      const currentOpacity = parseFloat(circle.style.opacity) || 0;

      if (fadeIn) {
        circle.style.opacity = currentOpacity + 0.01;
        if (currentOpacity >= 1) fadeIn = false;
      } else {
        circle.style.opacity = currentOpacity - 0.01;
        if (currentOpacity <= 0) {
          fadeIn = true;
          setRandomAttributes(circle);
        }
      }

      requestAnimationFrame(animationStep);
    }

    animationStep();
  }

  for (let i = 0; i < maxCircles; i++) {
    const blurryCircle = createBlurryCircle();
    circles.push(blurryCircle);
    setRandomAttributes(blurryCircle);
    animateBlurryCircle(blurryCircle);
  }
});
