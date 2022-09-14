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
        icon: 'heroicons_outline:user-group',
      },
      {
        id: 'rol',
        title: 'Roles',
        type: 'basic',
        link: '/roles',
        icon: 'heroicons_outline:shield-check',
      },
      {
        id: 'areas-internas',
        title: 'Áreas internas',
        type: 'basic',
        link: '/areainternas',
        icon: 'heroicons_outline:identification',
      },
      {
        id: 'areas-internas',
        title: 'Lista de Control',
        type: 'basic',
        link: '/controles',
        icon: 'heroicons_outline:pencil-alt',
      },
      {
        id: 'localidades',
        title: 'Localidades',
        type: 'basic',
        link: '/localidades',
        icon: 'heroicons_outline:location-marker',
      },
    ],
  },
];
// #MENU #SIDENAV
export const defaultNavigation: SynveltNavigationItem[] = [
  {
    id: 'home',
    title: 'Inicio',
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
        icon: 'heroicons_outline:user-group',
      },
      {
        id: 'rol',
        title: 'Roles',
        type: 'basic',
        link: '/roles',
        icon: 'heroicons_outline:shield-check',
      },
      {
        id: 'areas-internas',
        title: 'Áreas internas',
        type: 'basic',
        link: '/areainternas',
        icon: 'heroicons_outline:identification',
      },
      {
        id: 'areas-internas',
        title: 'Listas de control',
        type: 'basic',
        link: '/modelos',
        icon: 'heroicons_outline:pencil-alt',
      },
      {
        id: 'localidades',
        title: 'Localidades',
        type: 'basic',
        link: '/localidades',
        icon: 'heroicons_outline:location-marker',
      },
    ],
  },
];
