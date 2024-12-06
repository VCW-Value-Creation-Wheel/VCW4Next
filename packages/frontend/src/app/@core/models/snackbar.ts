import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface Snackbars {
  [key: string]: {
    bgColor: string;
    icon: IconDefinition;
    textColor: string;
  };
}
