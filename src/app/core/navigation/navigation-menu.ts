/* tslint:disable:max-line-length */
import { SynveltNavigationItem } from '@synvelt/components/navigation';

// #MENU #SIDENAV
export const horizontalNavigation: SynveltNavigationItem[] = [
  {
    id: 'home',
    title: 'Inicio',
    type: 'basic',
    link: '/inicio',
  },
  {
    id: 'extra',
    title: 'Opción 1',
    type: 'basic',
    link: '/inicio',
  },
  {
    id: 'extra',
    title: 'Opción 2',
    type: 'basic',
    link: '/inicio',
  },
  {
    id: 'extra',
    title: 'Opción 3',
    type: 'basic',
    link: '/inicio',
  },
  {
    id: 'administrador.parametros',
    title: 'Configuración',
    // subtitle: 'Configurar datos del sistema',
    type: 'collapsable',
    // icon: 'heroicons_outline:cog',
    children: [
      {
        id: 'usuario',
        title: 'Usuario',
        type: 'basic',
        link: '/usuarios',
        icon: 'heroicons_outline:cog',
      },
      {
        id: 'rol',
        title: 'Roles',
        type: 'basic',
        link: '/roles',
        icon: 'heroicons_outline:cog',
      },
      {
        id: 'areas-internas',
        title: 'Áreas internas',
        type: 'basic',
        link: '/areainternas',
        icon: 'heroicons_outline:cog',
      },
    ],
  },
];
