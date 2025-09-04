export interface Idea {
  id: string;
  title: string;
  description: string;
}

export interface ApiError {
  error: { code: string; message: string };
}

// Default to the local server port; override via VITE_API_BASE when deploying.
const DEFAULT_BASE = '';
const API_BASE: string = (import.meta as any)?.env?.VITE_API_BASE || DEFAULT_BASE;

export async function analyzeImage(
  file: File,
  additionalInfo: string,
  opts?: { signal?: AbortSignal }
): Promise<Idea[]> {
  const form = new FormData();
  form.append('image', file);
  if (additionalInfo) form.append('additionalInfo', additionalInfo);

  const res = await fetch(`${API_BASE}/api/analyze`, {
    method: 'POST',
    body: form,
    signal: opts?.signal,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = (data as ApiError)?.error?.message || 'Request failed';
    throw new Error(message);
  }
  const ideas = (data as { ideas: Idea[] })?.ideas || [];
  return ideas;
}

export interface GeneratedImage {
  id: string;
  url: string; // data URL
  alt: string;
}

async function fileToBase64(file: File): Promise<{ mimeType: string; base64: string }> {
  const dataUrl: string = await new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = () => reject(new Error('Failed to read file'));
    fr.onload = () => resolve(String(fr.result));
    fr.readAsDataURL(file);
  });
  const [prefix, b64] = dataUrl.split(',', 2);
  const mimeMatch = prefix.match(/^data:(.*?);base64$/i);
  return { mimeType: mimeMatch ? mimeMatch[1] : file.type || 'image/jpeg', base64: b64 || '' };
}

export interface GenerateRequest {
  title: string;
  description: string;
  additionalInfo?: string;
  image?: { mimeType: string; base64: string };
}

export async function generateImage(
  idea: { title: string; description: string },
  originalFile: File | null,
  additionalInfo: string,
  opts?: { signal?: AbortSignal }
): Promise<GeneratedImage> {
  const payload: GenerateRequest = {
    title: idea.title,
    description: idea.description,
    additionalInfo,
  };
  if (originalFile) {
    payload.image = await fileToBase64(originalFile);
  }

  const res = await fetch(`${API_BASE}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: opts?.signal,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = (data as ApiError)?.error?.message || 'Request failed';
    throw new Error(message);
  }
  const img = (data as { images: GeneratedImage[] })?.images?.[0];
  if (!img) throw new Error('No image returned');
  return img;
}
