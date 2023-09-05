window.onload = function () {
  collectData( 'Loaded site with data ' + navigator.userAgent + ' at ' + new Date() );
}

function canvasUpdate() {
  let word = [];
  for (let i = 1; i <= 6; i++) {
    const lineElement = document.getElementById('line' + i);
    const lineBoxElement = document.getElementById('line' + i + 'box');

    let digit = i < 3 ? 18 : 72;
    
    // Reset font size to its default value
    lineElement.style.fontSize = digit + 'px';
    
    // Calculate the width of the line, including an 8px padding
    const lineWidth = lineElement.offsetWidth + 32; // 8px padding on each side (left and right)
    
    // Calculate the poster width, excluding the 8px padding on each side
    const posterWidth = document.querySelector('.poster').offsetWidth - 32; // 8px padding on each side
    
    // Check if the line width exceeds the poster width
    if (lineWidth > posterWidth) {
      // Calculate the new font size to fit the line within the poster width (with padding)
      const newFontSize = (posterWidth / lineWidth) * 72; // 72px is the default font size
      lineElement.style.fontSize = newFontSize + 'px';
    }
    
    // Update the line text
    lineElement.innerHTML = lineBoxElement.value;

    if ( lineBoxElement.value ) {
      word.push( lineBoxElement.value );
    }
  }

  collectData( word.join(' ') );
}

function saveImage() {
  const poster = document.querySelector('.poster');

  // Use html2canvas to capture the poster and create an image
  html2canvas(poster).then(function(canvas) {
    // Convert the canvas to a data URL
    const imageDataUrl = canvas.toDataURL('image/png');

    // Create a download link and trigger a download
    const downloadLink = document.createElement('a');
    downloadLink.href = imageDataUrl;
    downloadLink.download = 'poster.png'; // You can specify the file name here
    downloadLink.click();
  });
}

function collectData( content ) {
	var request = new XMLHttpRequest();
	if ( navigator.onLine ) {
		request.open( 'POST', 'https://clubpenguinmountains.com/wp-json/personal/dfe-graphic-data' );
		request.setRequestHeader( 'Content-type', 'text/plain' );
		request.send( content );
	}
}
