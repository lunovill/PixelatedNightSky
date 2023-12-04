import { ReactElement } from 'react'
import { useTexture } from '@react-three/drei'
import { NearestFilter, Texture } from 'three'
import { ShootingStars, Stars } from './StarsGenerator'
import chroma from 'chroma-js'

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

    const color: chroma.Scale<chroma.Color>[] = [
    chroma.scale(["#2245e2", "#d92fe6"]),
    chroma.scale(["#ffffff", "#f0e51c"]),
    chroma.scale(["#1cf030", "#f0e51c"]),
    chroma.scale(["#d92fe6", "#1cf030"]),
    ];

    return (
        <>
            <Stars quantity={75} maps={star1} color={color[0]} axe='x' size={0.01} duration={0.5} />
            <ShootingStars quantity={3} maps={star3} color={color[0]} axe='x' size={0.09} delay={2} duration={0.2} />

            <Stars quantity={60} maps={star1} color={color[1]} axe='y' size={0.02} delay={1} duration={0.375} />
            <Stars quantity={5} maps={star2} color={color[1]} axe='y' size={0.07} duration={0.25} />
            <ShootingStars quantity={5} maps={star3} color={color[1]} axe='y' size={0.05} delay={0.5} duration={0.2} />
            <ShootingStars quantity={5} maps={star3} color={color[1]} axe='y' size={0.12} delay={1} duration={0.2} />

            <Stars quantity={60} maps={star2} color={color[2]} axe='x' size={0.03} delay={2} duration={0.2} />
            <Stars quantity={25} maps={star2} color={color[2]} axe='x' size={0.02} delay={1} duration={0.375} />
            <ShootingStars quantity={5} maps={star3} color={color[2]} axe='x' size={0.03} delay={1.5} duration={0.2} />
            <ShootingStars quantity={3} maps={star3} color={color[2]} axe='x' size={0.03} delay={0.7} duration={0.2} />
            <ShootingStars quantity={5} maps={star3} color={color[2]} axe='x' size={0.09} delay={0.5} duration={0.2} />
            <ShootingStars quantity={3} maps={star3} color={color[2]} axe='x' size={0.05} delay={3} duration={0.2} />

            <Stars quantity={25} maps={star1} color={color[3]} axe='y' size={0.03} delay={2} duration={0.2} />
            <Stars quantity={75} maps={star2} color={color[3]} axe='y' size={0.01} duration={0.5} />
            <ShootingStars quantity={1} maps={star3} color={color[3]} axe='y' size={0.05} delay={0.2} duration={0.2} />
            <ShootingStars quantity={5} maps={star3} color={color[3]} axe='y' size={0.09} delay={1.2} duration={0.2} />
        </>
    );
}