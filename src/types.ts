export interface Point { x: number; y: number; }

export type MaskStyle = 'block' | 'blur' | 'pixelate' | 'hatch';

export interface FieldRegion {
  id: string;
  label: string;
  polygon: Point[];
  defaultMaskStyle?: MaskStyle;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  fields: string[];
  defaults?: {
    style?: MaskStyle;
    opacity?: number;
  };
}
