window.onload = function () {
	collectData( 'Loaded site with data ' + navigator.userAgent + ' at ' + new Date() );
};

function canvasUpdate() {
	let word = [];
	for ( let i = 1; i <= 6; i++ ) {
		const lineElement = document.getElementById( 'line' + i );
		const lineBoxElement = document.getElementById( 'line' + i + 'box' );

		let digit = i < 3 ? 18 : 72;

		lineElement.style.fontSize = digit + 'px';

		const lineWidth = lineElement.offsetWidth + 32;

		const posterWidth = document.querySelector( '.poster' ).offsetWidth - 32;

		if ( lineWidth > posterWidth ) {
			const newFontSize = ( posterWidth / lineWidth ) * 72;
			lineElement.style.fontSize = newFontSize + 'px';
		}

		lineElement.innerHTML = lineBoxElement.value;

		if ( lineBoxElement.value ) {
			word.push( lineBoxElement.value );
		}
	}

	collectData( word.join( ' ' ) );
}

function saveImage() {
	const poster = document.querySelector( '.poster' );

	html2canvas( poster ).then( function ( canvas ) {
		const imageDataUrl = canvas.toDataURL( 'image/png' );

		const downloadLink = document.createElement( 'a' );
		downloadLink.href = imageDataUrl;
		downloadLink.download = 'poster.png';
		downloadLink.click();
	} );
}

function collectData( content ) {
	var request = new XMLHttpRequest();
	if ( navigator.onLine ) {
		request.open( 'POST', 'https://clubpenguinmountains.com/wp-json/personal/dfe-graphic-data' );
		request.setRequestHeader( 'Content-type', 'text/plain' );
		request.send( content );
	}
}

function uploadImage() {
	const fileInput = document.getElementById( 'fileInput' );

	const file = fileInput.files[ 0 ];

	if ( file ) {
		const reader = new FileReader();

		reader.onload = function ( e ) {
			document.getElementById( 'image' ).src = e.target.result;
		};

		reader.readAsDataURL( file );
	}
}
