export const OPEN_DRAWER = 'OPEN_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export const CHANGE_MATERIAL = 'CHANGE_MATERIAL';
export const CHANGE_PLATFORM = 'CHANGE_PLATFORM';

export function openDrawer() {
  return {
    type: OPEN_DRAWER,
  };
}

export function closeDrawer() {
  return {
    type: CLOSE_DRAWER,
  };
}

export function changeMaterial() {
  return {
    type: CHANGE_MATERIAL,
  };
}

export function changePlatform() {
  return {
    type: CHANGE_PLATFORM,
  };
}
