'use client';

import { Suspense, lazy, useRef, useState, useEffect } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: '100px', // Pre-load or preserve layout slightly outside viewport
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

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
    >
      <div style={{ display: isVisible ? 'block' : 'none', width: '100%', height: '100%' }}>
        <Suspense
        fallback={
          <div className={`w-full h-full flex items-center justify-center bg-gray-900/10 text-white ${className}`}>
            <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
          console.log("Spline onLoad fired.");
          try {
            const sceneObj = splineApp._scene;
            if (sceneObj && sceneObj.children) {
              const listNames = (children: any[]) => {
                let names: string[] = [];
                children.forEach((c: any) => {
                  names.push(c.name);
                  if (c.children) {
                    names = names.concat(listNames(c.children));
                  }
                });
                return names;
              };
              console.log("ALL SCENE OBJECTS:", listNames(sceneObj.children));

              // Recursively hide background/floor/stage elements
              const hideGround = (children: any[]) => {
                children.forEach((c: any) => {
                  const lower = c.name.toLowerCase();
                  // Check for floor, plane, ground, backdrop, stage, rectangle, but NOT the robot/cube itself if named similarly
                  if (
                    lower.includes("floor") || 
                    lower.includes("plane") || 
                    lower.includes("ground") || 
                    lower.includes("backdrop") || 
                    lower.includes("stage") || 
                    lower.includes("rectangle")
                  ) {
                    console.log("HIDING SCENE OBJECT:", c.name);
                    c.visible = false;
                  }
                  if (c.children) {
                    hideGround(c.children);
                  }
                });
              };
              hideGround(sceneObj.children);

              // Recursively apply matte black to all elements except lights, cameras, and eyes
              const applyMatteBlack = (obj: any) => {
                if (!obj) return;
                
                const nameLower = obj.name.toLowerCase();
                const isExempt = 
                  nameLower.includes("camera") || 
                  nameLower.includes("light") || 
                  nameLower.includes("ojo") || 
                  nameLower.includes("sphere") || 
                  nameLower.includes("eye") || 
                  nameLower.includes("invisible") ||
                  nameLower.includes("default");
                
                if (!isExempt) {
                  try {
                    if (obj.material) {
                      if (Array.isArray(obj.material)) {
                        obj.material.forEach((mat: any) => {
                          if (mat.color && typeof mat.color.set === 'function') {
                            mat.color.set('#0b0b0b'); // Rich matte black
                          } else {
                            mat.color = '#0b0b0b';
                          }
                          if ('roughness' in mat) mat.roughness = 0.95;
                          if ('metalness' in mat) mat.metalness = 0.05;
                        });
                      } else {
                        if (obj.material.color && typeof obj.material.color.set === 'function') {
                          obj.material.color.set('#0b0b0b');
                        } else {
                          obj.material.color = '#0b0b0b';
                        }
                        if ('roughness' in obj.material) obj.material.roughness = 0.95;
                        if ('metalness' in obj.material) obj.material.metalness = 0.05;
                      }
                    }
                  } catch (e) {
                    console.warn("Failed to set material color for mesh:", obj.name, e);
                  }

                  try {
                    obj.color = '#0b0b0b';
                  } catch (e) {}
                }

                if (obj.children) {
                  obj.children.forEach(applyMatteBlack);
                }
              };

              // Apply color logic to the entire scene
              applyMatteBlack(sceneObj);
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
