export const enum AnimationsName {
  NOT_FOUND = 'NotFound',
}

export type AnimationsMappingType = {
  [key in AnimationsName]: unknown;
};
