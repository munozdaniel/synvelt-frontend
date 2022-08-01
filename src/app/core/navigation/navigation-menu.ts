/* tslint:disable:max-line-length */
import { SynveltNavigationItem } from '@synvelt/components/navigation';

// #MENU #SIDENAV
export const defaultNavigation: SynveltNavigationItem[] = [
  {
    id: 'home',
    title: 'Home',
    type: 'basic',
    icon: 'heroicons_outline:home',
    link: '/home',
  },
  {
    id: 'usuario',
    title: 'Usuario',
    type: 'basic',
    icon: 'heroicons_outline:users',
    link: '/usuarios',
  },
];
