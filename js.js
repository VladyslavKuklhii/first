(function(){
	let firstCanvas = document.getElementById('sliderOne'),
		secondCanvas = document.getElementById('sliderSecond');

	let slider = function(el){
		let self = this;
		self.currentIndex = 0;
		self.SCREEN_SIZE = 768;
		self.sliderDots = el.querySelectorAll(".dots-block__dot");
		self.sliderCanvas = el.querySelector(".slider__canvas");
		self.sliderOn = false;

		self.sliderChange = function(){
			let x = -self.currentIndex*100;
			self.sliderCanvas.style ="transform: translateX("+x+"%)";/*also can't be put a style with context*/
			self.hightLightDot(self.currentIndex);
		}

		self.dotIndex = function(){
			[].forEach.call(self.sliderDots,function(dot, i){
				dot.addEventListener('click',function(){
					self.currentIndex = i;
						self.sliderChange();
						self.stopSlider();
						self.auto();
						console.log("2");
				});
			});
		}
		self.dotIndex();
		self.stopSlider = function(){
			clearInterval(self.startSlide);
		}
		self.auto = function(){
			self.startSlide = setInterval(function(){
					if(self.currentIndex < 2){
						++self.currentIndex;
					}else{self.currentIndex = 0}
				self.sliderChange(self.currentIndex);
			},3000);
		}
		self.hightLightDot = function(){
			for(let i = 0; i < self.sliderDots.length; i++){

				if(i === self.currentIndex){
					self.sliderDots[i].classList.add("dots-block__dot--active");
				}else{
					self.sliderDots[i].classList.remove("dots-block__dot--active");
				}
			}
		}
		self.checkSize = function(){
			if(screen.width < self.SCREEN_SIZE && !self.sliderOn){
				self.auto();/* {doesn't work correct at same time with other prototype}*/
				self.sliderOn = true;
			}
			if(screen.width > self.SCREEN_SIZE && self.sliderOn){
				console.log(self.sliderOn)
				self.currentIndex = 0;	
				self.sliderChange();			
				self.stopSlider();
				self.sliderOn = false;
			}
		}
		self.checkSize();
		window.addEventListener('resize',self.checkSize);
	}	
	let firstSlider = new slider(firstCanvas);
	let secondSlider = new slider(secondCanvas);

	

	
})();
