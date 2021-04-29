import {NotifierOptions} from 'angular-notifier';
import {TestInterface} from '../interfaces/test-interface';

export const CUSTOM_NOTIFIER_OPTIONS: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

export const TEST_LAGECY: TestInterface = {
  prefix: 'legacy root',
  log(msg: string): void {
    console.log(`${this.prefix}(legacy): ${msg}`);
  }
};

export enum userRole {
  User = 'user',
  Admin = 'admin'
}

export function getIndexBy(array: Array<{}>, { name, value }): number {
  for (let i = 0; i < array.length; i++) {
    if (array[i][name] === value) {
      return i;
    }
  }
  return -1;
}
export function DeepCopyObject(object: any): any {
  return JSON.stringify(object);
}

export function DeepCopyArray(object: any): any {
  return JSON.parse(JSON.stringify(object));
}

