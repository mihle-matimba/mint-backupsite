import React, { useEffect, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Configuration
const SUPABASE_URL = "https://aazofjsssobejhkyyiqv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhem9manNzc29iZWpoa3l5aXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMTI1NDUsImV4cCI6MjA3MzY4ODU0NX0.guYlxaV5RwTlTVFoUhpER0KWEIGPay8svLsxMwyRUyM";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const Sphere = ({ images, size = 600 }) => {
    const containerRef = useRef(null);
    const rotationRef = useRef({ x: 15, y: 0 });
    const velocityRef = useRef({ x: 0, y: 0.1 }); 
    const draggingRef = useRef(false);
    const lastPosRef = useRef({ x: 0, y: 0 });
    
    const [points, setPoints] = useState([]);
    const radius = size * 0.42;
    const baseSize = size * 0.14; 

    useEffect(() => {
        if (!images.length) return;
        const pts = images.map((img, i) => {
            const phi = Math.PI * (3 - Math.sqrt(5));
            const y = 1 - (i / (images.length - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const theta = phi * i;
            return {
                x: Math.cos(theta) * r * radius,
                y: y * radius,
                z: Math.sin(theta) * r * radius,
                ...img
            };
        });
        setPoints(pts);
    }, [images, radius]);

    useEffect(() => {
        let frameId;
        const update = () => {
            if (!draggingRef.current) {
                velocityRef.current.x *= 0.95;
                velocityRef.current.y *= 0.95;
                rotationRef.current.x += velocityRef.current.x;
                rotationRef.current.y += velocityRef.current.y + 0.08;
            }

            const nodes = containerRef.current?.children;
            if (nodes) {
                points.forEach((p, i) => {
                    const node = nodes[i];
                    if (!node) return;

                    const rx = (rotationRef.current.x * Math.PI) / 180;
                    const ry = (rotationRef.current.y * Math.PI) / 180;

                    let z1 = p.z * Math.cos(ry) - p.x * Math.sin(ry);
                    let x1 = p.z * Math.sin(ry) + p.x * Math.cos(ry);
                    let y1 = p.y * Math.cos(rx) - z1 * Math.sin(rx);
                    let z2 = p.y * Math.sin(rx) + z1 * Math.cos(rx);

                    const perspective = (z2 + radius * 2) / (radius * 3);
                    const scale = Math.max(0.4, perspective);
                    
                    // Center the nodes relative to their calculated 3D positions
                    node.style.transform = `translate3d(${x1}px, ${y1}px, ${z2}px) scale(${scale})`;
                    node.style.opacity = Math.max(0.3, perspective);
                    node.style.zIndex = Math.round(z2 + radius);
                });
            }
            frameId = requestAnimationFrame(update);
        };
        update();
        return () => cancelAnimationFrame(frameId);
    }, [points, radius]);

    const handleStart = (clientX, clientY) => {
        draggingRef.current = true;
        lastPosRef.current = { x: clientX, y: clientY };
    };

    const handleMove = (clientX, clientY) => {
        if (!draggingRef.current) return;
        const dx = clientX - lastPosRef.current.x;
        const dy = clientY - lastPosRef.current.y;
        velocityRef.current = { x: -dy * 0.15, y: dx * 0.15 };
        rotationRef.current.x -= dy * 0.25;
        rotationRef.current.y += dx * 0.25;
        lastPosRef.current = { x: clientX, y: clientY };
    };

    const handleImgError = (e) => {
        const parent = e.target.closest('.sphere-point');
        if (parent) parent.style.display = 'none';
    };

    return (
        <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center touch-none select-none cursor-grab active:cursor-grabbing"
            style={{ width: size, height: size, perspective: '1200px' }}
            onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
            onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
            onMouseUp={() => draggingRef.current = false}
            onMouseLeave={() => draggingRef.current = false}
            onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchEnd={() => draggingRef.current = false}
        >
            <div ref={containerRef} className="relative w-0 h-0 preserve-3d">
                {points.map((p) => (
                    <div key={p.id} className="sphere-point absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div 
                            className="rounded-full overflow-hidden shadow-2xl bg-white border border-slate-200 flex items-center justify-center"
                            style={{ width: baseSize, height: baseSize }}
                        >
                            <img 
                                src={p.src} 
                                alt={p.id} 
                                className="w-full h-full object-cover" 
                                onError={handleImgError}
                                draggable={false}
                                loading="lazy"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SphereWrapper = () => {
    // Dynamic size calculation to ensure it fits mobile screens perfectly
    const [size, setSize] = useState(window.innerWidth >= 768 ? 600 : Math.min(window.innerWidth - 40, 380));
    const [images, setImages] = useState([]);

    useEffect(() => {
        const handleResize = () => setSize(window.innerWidth >= 768 ? 600 : Math.min(window.innerWidth - 40, 380));
        window.addEventListener('resize', handleResize);

        const fetchLogos = async () => {
            const { data } = await supabase
                .from('trading_universe')
                .select('id, symbol, logo')
                .not('logo', 'is', null)
                .neq('logo', '')
                .limit(80);
            
            if (data?.length) {
                const formatted = data.map(d => ({ id: `${d.symbol}-${d.id}`, src: d.logo }));
                setImages(formatted);
            }
        };

        fetchLogos();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative w-full overflow-visible py-20 flex justify-center" style={{ minHeight: size }}>
            {images.length > 0 ? (
                <Sphere images={images} size={size} />
            ) : (
                <div className="animate-pulse rounded-full bg-white/5 border border-white/10 mx-auto" style={{ width: size, height: size }} />
            )}
        </div>
    );
};

export default SphereWrapper;