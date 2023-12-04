import random from 'math-random'

export default function randomInSphere(n: number, radius: number): Float32Array {
	const points = new Float32Array(n * 3);
	for (let i = 0; i < n; i++) {
		const r = radius * Math.cbrt(random());
		const theta = random() * 2 * Math.PI;
		const phi = Math.acos(2 * random() - 1);
		const x = r * Math.sin(phi) * Math.cos(theta);
		const y = r * Math.sin(phi) * Math.sin(theta);
		const z = r * Math.cos(phi);
		points[i * 3] = x;
		points[i * 3 + 1] = y;
		points[i * 3 + 2] = z;
	}
	return points;
}