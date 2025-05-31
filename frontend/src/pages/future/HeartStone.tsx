import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './HeartStone.css'; // External CSS for styles
import { useNavigate } from 'react-router-dom';

const HeartStone: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [accessDenied, setAccessDenied] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const [input, setInput] = useState('');
      const navigate = useNavigate();

    useEffect(() => {
        let scene: THREE.Scene;
        let camera: THREE.PerspectiveCamera;
        let renderer: THREE.WebGLRenderer;
        let heartStone: THREE.Mesh;
        let animationFrameId: number;
        let isDragging = false;
        let previousMouseX = 0, previousMouseY = 0;
        let rotationSpeedX = 0, rotationSpeedY = 0;
        const damping = 0.95;
        let pulseIntensity = 0;
        let pulseDirection = 1;

        const init = () => {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x1a1a2e);
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 5;

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            mountRef.current!.appendChild(renderer.domElement);

            const geometry = new THREE.IcosahedronGeometry(1.5, 1);
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    pulseIntensity: { value: 0 },
                    baseColor: { value: new THREE.Color(0x8B0000) },
                    glowColor: { value: new THREE.Color(0xFF69B4) },
                },
                vertexShader: `
                    varying vec3 vNormal;
                    varying vec3 vPosition;
                    void main() {
                        vNormal = normal;
                        vPosition = position;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform float time;
                    uniform float pulseIntensity;
                    uniform vec3 baseColor;
                    uniform vec3 glowColor;
                    varying vec3 vNormal;
                    varying vec3 vPosition;

                    void main() {
                        vec3 lightDirection = normalize(vec3(0.5, 1.0, 0.5));
                        float diffuse = max(dot(vNormal, lightDirection), 0.0);
                        float colorMix = (sin(time * 2.0) + 1.0) / 2.0;
                        vec3 mixedColor = mix(baseColor, glowColor, colorMix);
                        vec3 finalColor = mixedColor * (1.0 + pulseIntensity * 0.5);
                        float noise = sin(vPosition.x * 5.0 + time) * 0.1 + sin(vPosition.y * 5.0 + time) * 0.1;
                        finalColor += noise * 0.1;
                        gl_FragColor = vec4(finalColor * diffuse, 1.0);
                    }
                `,
                blending: THREE.AdditiveBlending,
            });

            heartStone = new THREE.Mesh(geometry, material);
            scene.add(heartStone);

            const ambient = new THREE.AmbientLight(0x404040, 0.5);
            const point = new THREE.PointLight(0xffffff, 1, 100);
            point.position.set(5, 5, 5);
            scene.add(ambient, point);

            const animate = () => {
                animationFrameId = requestAnimationFrame(animate);
                heartStone.rotation.y += rotationSpeedY;
                heartStone.rotation.x += rotationSpeedX;
                rotationSpeedX *= damping;
                rotationSpeedY *= damping;
                material.uniforms.time.value += 0.01;
                pulseIntensity += pulseDirection * 0.01;
                if (pulseIntensity > 1.0 || pulseIntensity < 0.0) pulseDirection *= -1;
                material.uniforms.pulseIntensity.value = Math.abs(Math.sin(pulseIntensity * Math.PI));
                renderer.render(scene, camera);
            };

            animate();

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });

            const onDrag = (e: MouseEvent | TouchEvent) => {
                const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
                const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

                const deltaX = clientX - previousMouseX;
                const deltaY = clientY - previousMouseY;

                rotationSpeedY += deltaX * 0.005;
                rotationSpeedX += deltaY * 0.005;

                previousMouseX = clientX;
                previousMouseY = clientY;
            };

            const onStart = (e: MouseEvent | TouchEvent) => {
                isDragging = true;
                const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
                const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
                previousMouseX = clientX;
                previousMouseY = clientY;
                rotationSpeedX = 0;
                rotationSpeedY = 0;
            };

            const onEnd = () => { isDragging = false; };

            renderer.domElement.addEventListener('mousedown', onStart);
            renderer.domElement.addEventListener('mousemove', e => isDragging && onDrag(e));
            renderer.domElement.addEventListener('mouseup', onEnd);
            renderer.domElement.addEventListener('touchstart', onStart);
            renderer.domElement.addEventListener('touchmove', e => isDragging && onDrag(e));
            renderer.domElement.addEventListener('touchend', onEnd);
        };

        init();
}, []);
return (
    <div ref={mountRef} className="heartstone-container">
        
           <h2 className="text-center text-[#fffff] text-5xl font-amarante mb-4">The Heart Stone</h2>

            
        {!showPrompt && (
            <button className="access-button" onClick={() => setShowPrompt(true)}>
                ACCESS HERE
            </button>
        )}
{showPrompt && (
    <div className="soothing-message-box">
        <div className="soothing-text">
            <p className="italic text-purple-100 mb-8 leading-relaxed">
            "Where time dissolves and boundaries fray,<br />
            I linger, neither gone nor on the way.<br />
            Not behind, nor yet ahead —<br />
            A breath unclaimed, a word unsaid.<br />
            I’m never held, yet always near.<br />
            What am I, who waits right here?"
          </p>
        </div>

        <div className="flex justify-center items-center">
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Enter the key to unlock"
    className="w-56 px-4 py-2 border border-[#cf4aae] text-white placeholder-[#eab1e9] bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-[#cf4aae] font-amarante text-sm tracking-wide shadow"
  />
</div>

        <button 
        onClick={() => {
            if (input.trim().toLowerCase() === 'present') {
      navigate('/journey/future/final', { state: { enableFinalPortal: true } })}
    }
            
          
        }
        className="mt-10 px-8 py-4 bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded-full shadow-lg transition"
      >
        Proceed Now
      </button>

        {accessDenied && (
            <p className="access-denied-text"> The stone remains still. That is not the echo.</p>
        )}
    </div>
)}

    </div>
);


};

export default HeartStone;
