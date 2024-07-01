import { CropperCanvas, CropperCrosshair, CropperGrid, CropperHandle, CropperSelection } from 'cropperjs';

interface SelectionOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

class ElementBuilder<T extends HTMLElement> {
  el: T;
  constructor(element: T) {
    this.el = element;
  }

  set(name: string, value?: string | number) {
    this.el.setAttribute(name, `${value ?? ''}`);
    return this;
  }

  add(element: HTMLElement) {
    this.el.append(element);
    return this;
  }
}

const createHandle = (action: string) => {
  return new ElementBuilder(new CropperHandle()).set('action', action).el;
};

export class Extractor {
  getCanvas() {
    return document.getElementsByTagName('cropper-canvas').item(0) as CropperCanvas;
  }

  getSelections() {
    const elements: CropperSelection[] = [];
    const collection = document.getElementsByTagName('cropper-selection');
    for (let i = 0; i < collection.length; i++) {
      elements.push(collection.item(i) as CropperSelection);
    }
    return elements;
  }

  getActiveSelection() {
    return this.getSelections().find(e => e.active);
  }

  addSelection(opts?: SelectionOptions) {
    const c = this.getCanvas();

    const selection = new ElementBuilder(new CropperSelection())
      .set('outlined')
      .set('movable')
      .set('resizable')
      .set('multiple')
      .set('zoomable')
      .set('keyboard')
      .set('width', opts?.width || 200)
      .set('height', opts?.height || 200)
      .set('x', opts?.x || 0)
      .set('y', opts?.y || 0);

    const grid = new ElementBuilder(new CropperGrid()).set('role', 'grid').set('covered');
    selection.add(grid.el);

    const crosshair = new ElementBuilder(new CropperCrosshair()).set('centered');
    selection.add(crosshair.el);

    const move = new ElementBuilder(new CropperHandle()).set('action', 'move').set('theme-color', 'rgba(255, 255, 255, 0.35)');
    selection.add(move.el);

    selection.add(createHandle('n-resize'));
    selection.add(createHandle('e-resize'));
    selection.add(createHandle('s-resize'));
    selection.add(createHandle('w-resize'));
    selection.add(createHandle('ne-resize'));
    selection.add(createHandle('nw-resize'));
    selection.add(createHandle('se-resize'));
    selection.add(createHandle('sw-resize'));

    c.appendChild(selection.el);
  }

  clearSelections() {
    this.getSelections().forEach(e => {
      e.remove();
    });

    this.addSelection();
  }

  duplicateSelection(selection: CropperSelection) {
    this.addSelection({
      x: selection.x,
      y: selection.y,
      width: selection.width,
      height: selection.height
    });
  }
}