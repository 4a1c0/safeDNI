let cv: any;

/**
 * Dynamically load OpenCV.js from the /opencv folder.
 */
export async function cvReady(): Promise<any> {
  if (cv) return cv;
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = '/opencv/opencv.js';
    script.async = true;
    script.onload = () => {
      // OpenCV attaches itself to the global scope
      // @ts-ignore
      cv = (window as any).cv;
      cv['onRuntimeInitialized'] = () => resolve(cv);
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
}
