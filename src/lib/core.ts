interface SlideChangedEvent {
	currentSlide: HTMLElement;
}

export function checkSlideDimensions(rawEvent: Event) {
	const event = rawEvent as unknown as SlideChangedEvent;
	const presentationHeight = event.currentSlide.parentElement?.offsetHeight ?? 0;
	const slideHeight = event.currentSlide.scrollHeight;
	const presentationWidth = event.currentSlide.parentElement?.offsetWidth ?? 0;
	const slideWidth = event.currentSlide.scrollWidth;
	let badDims = false;

	console.log(`current slide dimensions: ${slideWidth}x${slideHeight} (Presentation: ${presentationWidth}x${presentationHeight})`);

	if (slideHeight > presentationHeight) {
		console.log(`Slide is too tall for the presentation (${slideHeight} vs ${presentationHeight})`);
		badDims = true;
	}
	if (slideWidth > presentationWidth) {
		console.log(`Slide is too wide for the presentation (${slideWidth} vs ${presentationWidth})`);
		badDims = true;
	}

	const deckElement = document.getElementsByClassName('reveal')[0] as HTMLElement;
	if (badDims)
		deckElement.style.background = 'red';
	else deckElement.style.background = '';
}