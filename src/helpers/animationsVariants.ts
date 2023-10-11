	export const animationSideBlock = {
		hidden: {
			x: '100%',
			transition: {
				duration: 0.3,
				ease: "linear",
			},
		},
		visible: {
			x: '0',
			transition: {
				duration: 0.3,
				ease: 'linear'
			}
		}


	}

	export const animationModal ={
				hidden: {
			opacity:0,
				overflow:'hidden',
			transition: {
				duration: 0.3,
				ease: "linear",
			},
		},
		visible: {
			opacity:1,
			overflow:'visible',
			transition: {
				duration: 0.3,
				ease: 'linear'
			}
		}
	}