import chroma from 'chroma-js'
import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import SkyAnimation from './SkyAnimation'
import '../styles/App.css'

export default function App() {
	useEffect(() => {
		let startColor = document.body.style.backgroundColor || 'white';
		const endColor = '#353540';
		let t = 0;
		const increment = 0.01;
		const scale = chroma.scale([startColor, endColor]);

		const animateBackgroundColor = () => {
			if (t <= 1) {
				document.body.style.backgroundColor = scale(t).hex();
				t += increment;
				requestAnimationFrame(animateBackgroundColor);
			}
		};
		animateBackgroundColor();

		return () => { document.body.style.backgroundColor = startColor; };
	}, []);

	return (
		<Canvas
			camera={{ position: [0, 0, 1] }}
			className="canvas"
			style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
		>
			<SkyAnimation />
		</Canvas>
	);
}
