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
const API_BASE: string = (
  (import.meta.env as unknown as { VITE_API_BASE?: string }).VITE_API_BASE ?? DEFAULT_BASE
);

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

  const data: unknown = await res.json().catch(() => null);
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
  const dataUrl: string = await new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = () => reject(new Error('Failed to read file'));
    fr.onload = () => {
      const result = fr.result;
      if (typeof result !== 'string') {
        reject(new Error('Unexpected file reader result'));
        return;
      }
      resolve(result);
    };
    fr.readAsDataURL(file);
  });
  const [prefix, b64] = dataUrl.split(',', 2);
  const mimeMatch = /^data:(.*?);base64$/i.exec(prefix);
  return { mimeType: mimeMatch ? mimeMatch[1] : file.type || 'image/jpeg', base64: b64 || '' };
}

export interface GenerateRequest {
  title: string;
  description: string;
  additionalInfo?: string;
  image?: { mimeType: string; base64: string };
  count?: number;
  variantIndex?: number;
}

export async function generateImage(
  idea: { title: string; description: string },
  originalFile: File | null,
  additionalInfo: string,
  opts?: { signal?: AbortSignal; count?: number; variantIndex?: number }
): Promise<GeneratedImage> {
  const payload: GenerateRequest = {
    title: idea.title,
    description: idea.description,
    additionalInfo,
  };
  if (opts?.count && opts.count > 0) payload.count = opts.count;
  if (typeof opts?.variantIndex === 'number') payload.variantIndex = opts.variantIndex;
  if (originalFile) {
    payload.image = await fileToBase64(originalFile);
  }

  const res = await fetch(`${API_BASE}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: opts?.signal,
  });
  const data: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    const message = (data as ApiError)?.error?.message || 'Request failed';
    throw new Error(message);
  }
  const img = (data as { images: GeneratedImage[] })?.images?.[0];
  if (!img) throw new Error('No image returned');
  return img;
}

export async function generateImages(
  idea: { title: string; description: string },
  originalFile: File | null,
  additionalInfo: string,
  count: number,
  opts?: { signal?: AbortSignal }
): Promise<GeneratedImage[]> {
  const payload: GenerateRequest = {
    title: idea.title,
    description: idea.description,
    additionalInfo,
    count,
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
  const data: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    const message = (data as ApiError)?.error?.message || 'Request failed';
    throw new Error(message);
  }
  const images = (data as { images: GeneratedImage[] })?.images || [];
  if (!images.length) throw new Error('No images returned');
  return images;
}

export interface BatchItem {
  id: string;
  title: string;
  description: string;
  count?: number;
}

export interface BatchResult {
  id: string;
  images: GeneratedImage[];
  error?: { message: string };
}

export async function generateBatch(
  items: BatchItem[],
  originalFile: File | null,
  additionalInfo: string,
  opts?: { signal?: AbortSignal; concurrency?: number }
): Promise<BatchResult[]> {
  const payload = {
    items,
    additionalInfo,
    concurrency: opts?.concurrency ?? 2,
    image: originalFile ? await fileToBase64(originalFile) : null,
  };

  const res = await fetch(`${API_BASE}/api/generate-batch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: opts?.signal,
  });

  const data: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    const message = (data as ApiError)?.error?.message || 'Request failed';
    throw new Error(message);
  }

  const results = (data as { results: BatchResult[] })?.results || [];
  return results;
}
