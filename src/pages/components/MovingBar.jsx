import React, { useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';

const MovingBar = ({ text }) => {
    const barRef = useRef(null);

    useEffect(() => {
        const bar = barRef.current;
        let animationFrameId;
        let position = 0;

        const animate = () => {
            position += 2;
            if (position > window.innerWidth) {
                position = -bar.offsetWidth;
            }
            bar.style.transform = `translateX(${position}px)`;
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="relative w-full overflow-hidden bg-gray-900 py-2">
            <div
                ref={barRef}
                className="absolute left-0 text-white bg-yellow-400 px-4 py-2 text-lg font-semibold whitespace-nowrap"
            >
                {text}
            </div>
        </div>
    );
};

export default MovingBar;
