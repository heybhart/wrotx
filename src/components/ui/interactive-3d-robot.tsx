'use client';

import { Suspense, lazy, useRef, useState, useEffect } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

const getInitialScale = () => {
  if (typeof window === 'undefined') return 1;
  const width = window.innerWidth;
  if (width >= 1200) return 1;
  if (width <= 360) return 0.5;
  return 0.5 + ((width - 360) / (1200 - 360)) * 0.5;
};

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [scale, setScale] = useState(getInitialScale);

  useEffect(() => {
    let frameId: number;
    const handleResize = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const width = window.innerWidth;
        let newScale = 1;
        if (width >= 1200) newScale = 1;
        else if (width <= 360) newScale = 0.5;
        else newScale = 0.5 + ((width - 360) / (1200 - 360)) * 0.5;

        setScale((prev) => (Math.abs(prev - newScale) > 0.01 ? newScale : prev));
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: '200px', // Pre-load smoothly
        threshold: 0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Comprehensive DOM, Shadow DOM, and link scrubber for Spline watermark
  useEffect(() => {
    const purgeSplineBadge = () => {
      const selectors = [
        '#spline-logo',
        'a[href*="spline.design"]',
        'a[href*="spline"]',
        'a[aria-label*="Spline"]',
        'a[aria-label*="spline"]',
        '.spline-watermark',
        '[class*="spline-logo"]'
      ];

      // Clean Light DOM
      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => el.remove());
      });

      // Clean any anchor tag containing spline in text or href
      document.querySelectorAll('a').forEach((a) => {
        const text = (a.textContent || '').toLowerCase();
        const href = (a.href || '').toLowerCase();
        if (text.includes('spline') || text.includes('built with') || href.includes('spline')) {
          a.remove();
        }
      });

      // Clean Shadow DOMs across container and document
      const allHosts = containerRef.current
        ? containerRef.current.querySelectorAll('*')
        : document.querySelectorAll('*');

      allHosts.forEach((host) => {
        if (host.shadowRoot) {
          if (!host.shadowRoot.querySelector('#purge-spline-styles')) {
            const style = document.createElement('style');
            style.id = 'purge-spline-styles';
            style.textContent = `
              #spline-logo, a[href*="spline"], a[aria-label*="Spline"], .spline-watermark, a {
                display: none !important;
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
              }
            `;
            host.shadowRoot.appendChild(style);
          }
          selectors.forEach((sel) => {
            host.shadowRoot?.querySelectorAll(sel).forEach((el) => el.remove());
          });
          host.shadowRoot?.querySelectorAll('a').forEach((a) => {
            const text = (a.textContent || '').toLowerCase();
            const href = (a.href || '').toLowerCase();
            if (text.includes('spline') || text.includes('built with') || href.includes('spline')) {
              a.remove();
            }
          });
        }
      });
    };

    purgeSplineBadge();
    const t1 = setTimeout(purgeSplineBadge, 200);
    const t2 = setTimeout(purgeSplineBadge, 600);
    const t3 = setTimeout(purgeSplineBadge, 1500);
    const t4 = setTimeout(purgeSplineBadge, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full animate-none transform-gpu contain-paint"
    >
      <div 
        style={{ 
          display: isVisible ? 'block' : 'none', 
          width: '100%', 
          height: '100%',
          transform: `scale(${scale})`,
          transformOrigin: 'right center',
          willChange: 'transform',
        }}
        className="transform-gpu"
      >
        <Suspense
          fallback={
            <div className={`w-full h-full flex items-center justify-center bg-gray-900/10 text-white ${className}`}>
              <svg className="animate-spin h-5 w-5 text-white/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
              </svg>
            </div>
          }
        >
          <Spline
            scene={scene}
            className={className} 
            onLoad={(splineApp: any) => {
              try {
                // DOM & Shadow DOM Scrape on Load
                const selectors = ['#spline-logo', 'a[href*="spline.design"]', 'a[href*="spline"]'];
                selectors.forEach(sel => {
                  document.querySelectorAll(sel).forEach(el => el.remove());
                });

                const sceneObj = splineApp._scene;
                if (sceneObj) {
                  // Traverse entire 3D Scene Graph (Three.js object tree)
                  const processNode = (obj: any) => {
                    if (!obj) return;
                    const nameLower = (obj.name || '').toLowerCase();

                    // 1. Hide any 3D scene objects related to Spline logo / watermark / badge / credit / text
                    if (
                      nameLower.includes("spline") ||
                      nameLower.includes("logo") ||
                      nameLower.includes("watermark") ||
                      nameLower.includes("badge") ||
                      nameLower.includes("built") ||
                      nameLower.includes("credit") ||
                      nameLower.includes("brand") ||
                      nameLower.includes("tag")
                    ) {
                      obj.visible = false;
                      if (obj.scale && typeof obj.scale.set === 'function') obj.scale.set(0, 0, 0);
                      if (obj.position && typeof obj.position.set === 'function') obj.position.set(-9999, -9999, -9999);
                    }

                    // 2. Hide floor/ground/plane objects
                    if (
                      nameLower.includes("floor") || 
                      nameLower.includes("plane") || 
                      nameLower.includes("ground") || 
                      nameLower.includes("backdrop") || 
                      nameLower.includes("stage") || 
                      nameLower.includes("rectangle")
                    ) {
                      obj.visible = false;
                    }

                    // 3. Apply matte black to body parts except eyes/lights/cameras
                    const isExempt = 
                      nameLower.includes("camera") || 
                      nameLower.includes("light") || 
                      nameLower.includes("ojo") || 
                      nameLower.includes("sphere") || 
                      nameLower.includes("eye") || 
                      nameLower.includes("invisible") ||
                      nameLower.includes("default");

                    if (!isExempt && obj.material) {
                      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
                      mats.forEach((mat: any) => {
                        if (mat) {
                          if (mat.color && typeof mat.color.set === 'function') {
                            mat.color.set('#0b0b0b');
                          } else if (mat.color) {
                            mat.color = '#0b0b0b';
                          }
                          if ('roughness' in mat) mat.roughness = 0.95;
                          if ('metalness' in mat) mat.metalness = 0.05;
                        }
                      });
                    }
                  };

                  if (typeof sceneObj.traverse === 'function') {
                    sceneObj.traverse(processNode);
                  } else if (sceneObj.children) {
                    const walk = (nodes: any[]) => {
                      nodes.forEach((node) => {
                        processNode(node);
                        if (node.children) walk(node.children);
                      });
                    };
                    walk(sceneObj.children);
                  }
                }
              } catch (err) {
                console.error("Error in Spline onLoad:", err);
              }
            }}
          />
        </Suspense>
      </div>
    </div>
  );
}

