import gsap from 'gsap'
import { useState, useRef, useEffect, ReactElement } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { Material, Texture, Points as ThreePoints } from 'three'
import randomInSphere from '../utils/randomInSphere'

export type Cursor = {
    x: number,
    y: number,
};

interface StarsProps {
	color: chroma.Scale<chroma.Color>,
	axe: 'x' | 'y',
	delay?: number,
	duration: number,
	maps: Texture[],
	quantity: number,
	size: number
};

export function Stars({ color, axe, delay = 0, duration, maps, quantity, size }: StarsProps): ReactElement {
	const [sphere] = useState<Float32Array>(() => randomInSphere(quantity, 1.5));
	const [map, setMap] = useState<Texture>(maps[0]);
	const pointsRef = useRef<ThreePoints>(null);
	const textureIndex = useRef({ value: 0 });
	const [cursor, setCursor] = useState<Cursor>({ x: 0, y: 0 });

	const handleMouseMove = (event: MouseEvent): void => {
        setCursor({
            x: event.clientX / window.innerWidth,
            y: event.clientY / window.innerHeight
        })
    };

	useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

	useEffect(() => {
		const updateTexture = () => {
			setMap(maps[Math.floor(textureIndex.current.value)]);
		};
		const tl = gsap.timeline({
			repeat: -1,
			delay: delay,
		});

		for (let i = 0; i < maps.length; i++) {
			tl.to(textureIndex.current, {
				value: i,
				duration: duration,
				onUpdate: updateTexture,
				roundProps: "value"
			});
		}

		return () => {
			tl.kill();
		};
	}, [maps]);

	useFrame((_, delta) => {
		pointsRef.current && (pointsRef.current.rotation.x -= delta / 10);
		pointsRef.current && (pointsRef.current.rotation.y -= delta / 15);
	});

	return (
		<group rotation={[0, 0, Math.PI / 4]}>
			<Points ref={pointsRef} positions={sphere} stride={3} frustumCulled={false} >
				<PointMaterial transparent color={color(cursor[axe]).hex()} map={map} size={size} sizeAttenuation={true} depthWrite={false} />
			</Points>
		</group>
	);
}

export function ShootingStars({ color, axe, delay = 0, duration, maps, quantity, size }: StarsProps): ReactElement {
	const [sphere] = useState<Float32Array>(() => randomInSphere(quantity, 1.5));
	const [map, setMap] = useState<Texture>(maps[0]);
	const pointsRef = useRef<ThreePoints>(null);
	const opacityRef = useRef<{ value: number }>({ value: 0 });
	const textureIndex = useRef<{ value: number }>({ value: 0 });
	const [cursor, setCursor] = useState<Cursor>({ x: 0, y: 0 });

    const handleMouseMove = (event: MouseEvent): void => {
        setCursor({
            x: event.clientX / window.innerWidth,
            y: event.clientY / window.innerHeight
        })
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

	useEffect(() => {
		const updateTexture = () => {
			setMap(maps[Math.floor(textureIndex.current.value)]);
		};
		const tl = gsap.timeline({
			repeat: -1,
			delay: delay,

		});

		tl.to(textureIndex.current, {
			onStart: () => { opacityRef.current.value = 1 },
			onComplete: () => { opacityRef.current.value = 0 },
			value: maps.length - 1,
			duration: duration * 4,
			onUpdate: updateTexture,
			roundProps: "value",
		}, `+=${delay * 2}`);

		return () => {
			tl.kill();
		};
	}, [maps]);

	useFrame((_, delta) => {
		pointsRef.current && ((pointsRef.current.material as Material).opacity = opacityRef.current.value);
		pointsRef.current && (pointsRef.current.rotation.x -= delta / 10);
		pointsRef.current && (pointsRef.current.rotation.y -= delta / 15);
	});

	return (
		<group rotation={[0, 0, Math.PI / 4]}>
			<Points ref={pointsRef} positions={sphere} stride={3} frustumCulled={false} >
				<PointMaterial transparent color={color(cursor[axe]).hex()} map={map} size={size} sizeAttenuation={true} depthWrite={false} />
			</Points>
		</group>
	);
}