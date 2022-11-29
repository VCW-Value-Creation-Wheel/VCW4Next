import { Snackbars } from '@core/models/snackbar';
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

const snackbars: Snackbars = {
  success: {
    bgColor: 'bg-gradient-to-r from-green-400 to-green-500',
    textColor: 'text-white',
    icon: faCheckCircle,
  },
  info: {
    bgColor: 'bg-gradient-to-r from-secondary-500 to-secondary-600',
    textColor: 'text-white',
    icon: faInfoCircle,
  },
  warning: {
    bgColor: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
    textColor: 'text-white',
    icon: faExclamationCircle,
  },
  danger: {
    bgColor: 'bg-gradient-to-r from-red-400 to-red-500',
    textColor: 'text-white',
    icon: faExclamationTriangle,
  },
};

export { snackbars };
