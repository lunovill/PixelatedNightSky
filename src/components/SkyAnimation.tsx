import { ReactElement } from 'react'
import { useTexture } from '@react-three/drei'
import { NearestFilter, Texture } from 'three'
import { ShootingStars, Stars } from './StarsGenerator'

const star_frame1 = [
	'/animation/anim1_frame1.png',
	'/animation/anim1_frame2.png',
	'/animation/anim1_frame3.png',
	'/animation/anim1_frame4.png',
	'/animation/anim1_frame3.png',
	'/animation/anim1_frame2.png',
];
const star_frame2 = [
	'/animation/anim2_frame1.png',
	'/animation/anim2_frame2.png',
	'/animation/anim2_frame3.png',
	'/animation/anim2_frame4.png',
	'/animation/anim2_frame3.png',
	'/animation/anim2_frame2.png',
];
const star_frame3 = [
	'/animation/anim3_frame1.png',
	'/animation/anim3_frame2.png',
	'/animation/anim3_frame3.png',
	'/animation/anim3_frame4.png',
];

export default function SkyAnimation(): ReactElement {
	const star1: Texture[] = star_frame1.map(f => {
		const t = useTexture(f);
		t.minFilter = NearestFilter;
		t.magFilter = NearestFilter;
		t.needsUpdate = true;
		return t;
	});
	const star2: Texture[] = star_frame2.map(f => {
		const t = useTexture(f);
		t.minFilter = NearestFilter;
		t.magFilter = NearestFilter;
		t.needsUpdate = true;
		return t;
	});
	const star3: Texture[] = star_frame3.map(f => {
		const t = useTexture(f);
		t.minFilter = NearestFilter;
		t.magFilter = NearestFilter;
		t.needsUpdate = true;
		return t;
	});

	return (
		<>
			<Stars quantity={75} maps={star1} color="#2245e2" size={0.01} duration={0.5} />
			<Stars quantity={60} maps={star1} color="#d92fe6" size={0.02} delay={1} duration={0.375} />
			<Stars quantity={25} maps={star1} color="#ffffff" size={0.03} delay={2} duration={0.2} />
			<Stars quantity={75} maps={star2} color="#2245e2" size={0.01} duration={0.5} />
			<Stars quantity={5} maps={star2} color="#2245e2" size={0.07} duration={0.25} />
			<Stars quantity={25} maps={star2} color="#d92fe6" size={0.02} delay={1} duration={0.375} />
			<Stars quantity={60} maps={star2} color="#f0e51c" size={0.03} delay={2} duration={0.2} />
			<ShootingStars quantity={5} maps={star3} color="#1cf030" size={0.05} delay={0.5} duration={0.2} />
			<ShootingStars quantity={5} maps={star3} color="#f0e51c" size={0.12} delay={1} duration={0.2} />
			<ShootingStars quantity={3} maps={star3} color="#1cf030" size={0.09} delay={2} duration={0.2} />
			<ShootingStars quantity={5} maps={star3} color="#f0e51c" size={0.03} delay={1.5} duration={0.2} />
			<ShootingStars quantity={3} maps={star3} color="#1cf030" size={0.03} delay={0.7} duration={0.2} />
			<ShootingStars quantity={1} maps={star3} color="#f0e51c" size={0.05} delay={0.2} duration={0.2} />
			<ShootingStars quantity={5} maps={star3} color="#1cf030" size={0.09} delay={0.5} duration={0.2} />
			<ShootingStars quantity={3} maps={star3} color="#f0e51c" size={0.05} delay={3} duration={0.2} />
			<ShootingStars quantity={5} maps={star3} color="#1cf030" size={0.09} delay={1.2} duration={0.2} />
		</>
	);
}