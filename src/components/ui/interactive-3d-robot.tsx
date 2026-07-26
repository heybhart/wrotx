'use client';

import { Suspense, lazy, useRef, useState, useEffect, useCallback } from 'react';
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
  const splineWrapperRef = useRef<HTMLDivElement>(null);
  const badgeRemovedRef = useRef<boolean>(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scale, setScale] = useState(getInitialScale);

  // Core Removal Logic: Removes badge from DOM/Shadow DOM & sets display: none
  const hideOrRemoveBadge = useCallback(() => {
    const selectors = [
      'a[href*="spline.design"]',
      'a[href*="spline"]',
      '#spline-logo',
      'a[aria-label*="Spline"]',
      'a[aria-label*="spline"]',
      '.spline-watermark',
      '[class*="spline-logo"]',
      '[class*="spline-badge"]'
    ];

    let foundAny = false;

    const processElement = (el: HTMLElement) => {
      foundAny = true;
      badgeRemovedRef.current = true;
      el.style.setProperty('display', 'none', 'important');
      el.style.setProperty('opacity', '0', 'important');
      el.style.setProperty('visibility', 'hidden', 'important');
      el.style.setProperty('pointer-events', 'none', 'important');
      try {
        el.remove();
      } catch (e) {}
    };

    const targetContainers = [splineWrapperRef.current, containerRef.current, document.body].filter(Boolean) as HTMLElement[];

    targetContainers.forEach((root) => {
      // 1. Selector match
      selectors.forEach((selector) => {
        root.querySelectorAll<HTMLElement>(selector).forEach(processElement);
      });

      // 2. Check all anchors for spline text/href
      root.querySelectorAll<HTMLAnchorElement>('a').forEach((a) => {
        const text = (a.textContent || '').toLowerCase();
        const href = (a.href || '').toLowerCase();
        if (text.includes('spline') || text.includes('built with') || href.includes('spline.design')) {
          processElement(a);
        }
      });

      // 3. Check for absolute/fixed positioned elements at bottom-right containing logo/badge
      root.querySelectorAll<HTMLElement>('div, a, span').forEach((el) => {
        const className = (el.className || '').toString().toLowerCase();
        const id = (el.id || '').toLowerCase();
        if (className.includes('logo') || className.includes('badge') || id.includes('logo') || id.includes('badge')) {
          if (el.tagName.toLowerCase() === 'a' || el.querySelector('a[href*="spline"]')) {
            processElement(el);
          }
        }
      });

      // 4. Shadow DOM check
      root.querySelectorAll('*').forEach((host) => {
        if (host.shadowRoot) {
          selectors.forEach((sel) => {
            host.shadowRoot?.querySelectorAll<HTMLElement>(sel).forEach(processElement);
          });
          host.shadowRoot?.querySelectorAll<HTMLAnchorElement>('a').forEach((a) => {
            const text = (a.textContent || '').toLowerCase();
            const href = (a.href || '').toLowerCase();
            if (text.includes('spline') || text.includes('built with') || href.includes('spline.design')) {
              processElement(a);
            }
          });
        }
      });
    });

    return foundAny;
  }, []);

  // Handle window resize with animation frame throttle
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

  // IntersectionObserver for viewability optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: '200px',
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

  // MutationObserver & Debounced Resize Listener for Badge Removal + Dev Warning
  useEffect(() => {
    // Immediate removal attempt
    hideOrRemoveBadge();

    // 1. MutationObserver on relative overflow-hidden container
    const observer = new MutationObserver(() => {
      hideOrRemoveBadge();
    });

    const targetDiv = splineWrapperRef.current || containerRef.current;
    if (targetDiv) {
      observer.observe(targetDiv, {
        childList: true,
        subtree: true,
      });
    }

    // 2. Debounced window.resize listener fallback
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleDebouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        hideOrRemoveBadge();
      }, 150);
    };

    window.addEventListener('resize', handleDebouncedResize, { passive: true });

    // 3. Dev-only console warning after 3 seconds if badge was not detected
    const warningTimer = setTimeout(() => {
      const devMode = typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production';
      if (devMode && !badgeRemovedRef.current) {
        console.warn(
          '[Spline Badge Removal]: Watermark badge selector was not found in DOM after 3 seconds. Spline DOM structure may have changed.'
        );
      }
    }, 3000);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleDebouncedResize);
      clearTimeout(resizeTimer);
      clearTimeout(warningTimer);
    };
  }, [hideOrRemoveBadge]);

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
        {/* Outer window container with position: relative and overflow: hidden */}
        <div
          ref={splineWrapperRef}
          className="relative overflow-hidden w-full h-full transform-gpu"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {/* Inner enlarged canvas viewport (112% width & height) to visually crop out the bottom-right WebGL pixel badge */}
          <div
            className="absolute top-0 left-0 w-[112%] h-[112%] max-w-none max-h-none transform-gpu"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '112%',
              height: '112%',
              transform: 'translate(-1.5%, -1.5%)',
              pointerEvents: 'auto',
            }}
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
                className="w-full h-full"
                onLoad={(splineApp: any) => {
                  try {
                    // Run badge removal attempt on scene load
                    hideOrRemoveBadge();

                    const sceneObj = splineApp._scene;
                    if (sceneObj) {
                      // Traverse Three.js 3D Scene Graph
                      const processNode = (obj: any) => {
                        if (!obj) return;
                        const nameLower = (obj.name || '').toLowerCase();

                        // 1. Hide 3D objects related to Spline logo / watermark / badge / credit / text
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

                        // 2. Hide floor/ground/stage elements
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

                        // 3. Apply matte black material styling
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
      </div>
    </div>
  );
}


