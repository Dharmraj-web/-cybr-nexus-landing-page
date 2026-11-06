import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// CYBR//NEXUS — Task 2: Build in 3D
const canvas = document.querySelector('#cyber-3d');
const host = canvas?.parentElement;
if (canvas && host) {
  try {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080b12, 0.055);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.2, 8.8);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setClearColor(0x080b12, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    scene.add(new THREE.AmbientLight(0x9cb8c8, 1.25));
    const key = new THREE.PointLight(0xb9ff66, 34, 18); key.position.set(3, 2, 4); scene.add(key);
    const rim = new THREE.PointLight(0x7ce7c2, 28, 18); rim.position.set(-3, -1, -3); scene.add(rim);
    const violet = new THREE.PointLight(0xb6a2ff, 16, 14); violet.position.set(0, 3, -2); scene.add(violet);

    const core = new THREE.Group(); scene.add(core);
    const metal = new THREE.MeshStandardMaterial({ color: 0x91a9a4, metalness: 0.88, roughness: 0.22, emissive: 0x10251f, emissiveIntensity: 0.65 });
    const darkMetal = new THREE.MeshStandardMaterial({ color: 0x172a34, metalness: 0.92, roughness: 0.28 });
    const neon = new THREE.MeshStandardMaterial({ color: 0xb9ff66, emissive: 0x8dff37, emissiveIntensity: 2.1, metalness: 0.55, roughness: 0.2 });
    const glass = new THREE.MeshPhysicalMaterial({ color: 0x294b55, metalness: 0.5, roughness: 0.12, transmission: 0.12, transparent: true, opacity: 0.88 });

    // Faceted synthetic core, layered armor and illuminated sensor lenses.
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.42, 2), metal); core.add(shell);
    const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(0.92, 1), darkMetal); core.add(inner);
    const nucleus = new THREE.Mesh(new THREE.OctahedronGeometry(0.57, 2), new THREE.MeshStandardMaterial({ color: 0x9aff59, emissive: 0x65ff30, emissiveIntensity: 1.65, metalness: 0.3, roughness: 0.18 })); core.add(nucleus);
    const plateGeo = new THREE.BoxGeometry(0.42, 0.12, 0.12);
    for (let i=0;i<8;i++){ const a=i*Math.PI/4; const plate=new THREE.Mesh(plateGeo, i%2?glass:darkMetal); plate.position.set(Math.cos(a)*1.18,Math.sin(a)*1.18,0); plate.rotation.z=a; core.add(plate); }
    for (let i=0;i<3;i++){ const eye=new THREE.Mesh(new THREE.SphereGeometry(0.13,24,16),neon); eye.position.set((i-1)*0.42,0.18,1.22); core.add(eye); }

    const ringGroup = new THREE.Group(); scene.add(ringGroup);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xb9ff66, transparent: true, opacity: 0.78 });
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xb6a2ff, transparent: true, opacity: 0.55 });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.012, 8, 180), ringMat); ring1.rotation.x = 1.08; ring1.rotation.y = 0.28; ringGroup.add(ring1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.009, 8, 180), ringMat2); ring2.rotation.x = 0.35; ring2.rotation.y = 1.12; ringGroup.add(ring2);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(1.78, 0.008, 8, 180), ringMat); ring3.rotation.x = 1.55; ring3.rotation.y = -0.5; ringGroup.add(ring3);

    const nodes = new THREE.Group(); scene.add(nodes);
    const nodeGeo = new THREE.SphereGeometry(0.045, 12, 12);
    for(let i=0;i<36;i++){ const a=(i/36)*Math.PI*2; const r=2.65+(i%3)*0.12; const n=new THREE.Mesh(nodeGeo,i%4===0?neon:glass); n.position.set(Math.cos(a)*r,Math.sin(a)*r*0.72,Math.sin(a*3)*0.35); nodes.add(n); }

    const starGeo = new THREE.BufferGeometry(); const starPos=[];
    for(let i=0;i<500;i++){starPos.push((Math.random()-.5)*13,(Math.random()-.5)*9,(Math.random()-.5)*8-2);}
    starGeo.setAttribute('position',new THREE.Float32BufferAttribute(starPos,3));
    const stars = new THREE.Points(starGeo,new THREE.PointsMaterial({color:0x91a8b8,size:0.018,transparent:true,opacity:0.65})); scene.add(stars);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true; controls.dampingFactor = 0.045; controls.enablePan = false;
    controls.minDistance = 6.2; controls.maxDistance = 11; controls.autoRotate = true; controls.autoRotateSpeed = 0.55;
    controls.target.set(0,0,0);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced) controls.autoRotate = false;

    function resize(){ const w=host.clientWidth,h=host.clientHeight; if(!w||!h)return; camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h,false); }
    const observer = new ResizeObserver(resize); observer.observe(host); resize();
    let frame=0;
    function animate(){ frame=requestAnimationFrame(animate); const t=performance.now()*0.001; if(!reduced){ shell.rotation.y=t*0.12; shell.rotation.x=Math.sin(t*0.22)*0.08; inner.rotation.y=-t*0.19; nucleus.rotation.x=t*0.35; nucleus.rotation.y=t*0.42; ringGroup.rotation.z=t*0.055; nodes.rotation.y=-t*0.035; } controls.update(); renderer.render(scene,camera); }
    animate();
    document.addEventListener('visibilitychange',()=>{ if(document.hidden)cancelAnimationFrame(frame); else animate(); });
  } catch (error) { console.warn('3D renderer unavailable; CSS cyborg fallback remains visible.', error); canvas.hidden = true; }
}
