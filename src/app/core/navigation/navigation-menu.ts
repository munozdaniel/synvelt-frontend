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
    id: 'administrador.datos-auxiliares',
    title: 'Datos auxiliares',
    // subtitle: 'Configurar datos del sistema',
    type: 'collapsable',
    // icon: 'heroicons_outline:cog',
    children: [
      {
        id: 'vehiculos',
        title: 'Vehiculos',
        type: 'basic',
        link: '/vehiculos',
        icon: 'heroicons_outline:truck',
      },
      {
        id: 'tipo-vehiculos',
        title: 'Tipo de vehiculos',
        type: 'basic',
        link: '/tipo-vehiculo',
        icon: 'heroicons_outline:tag',
      },
      {
        id: 'tipo-archivo-adjunto',
        title: 'Tipo de archivo adjunto',
        type: 'basic',
        link: '/tipo-archivo',
        icon: 'heroicons_outline:paper-clip',
      },
      {
        id: 'tipo-solicitud',
        title: 'Tipo de solicitud',
        type: 'basic',
        link: '/tipo-solicitud',
        icon: 'heroicons_outline:clipboard-list',
      },
      {
        id: 'localidades',
        title: 'Localidades',
        type: 'basic',
        link: '/localidades',
        icon: 'heroicons_outline:location-marker',
      },
      {
        id: 'preguntas',
        title: 'Preguntas frecuentes',
        type: 'basic',
        link: '/preguntas',
        icon: 'heroicons_outline:question-mark-circle',
      },
    ],
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
    id: 'administrador.datos-auxiliares',
    title: 'Datos auxiliares',
    // subtitle: 'Configurar datos del sistema',
    type: 'collapsable',
    // icon: 'heroicons_outline:cog',
    children: [
      {
        id: 'vehiculos',
        title: 'Vehiculos',
        type: 'basic',
        link: '/vehiculos',
        icon: 'heroicons_outline:truck',
      },
      {
        id: 'tipo-vehiculos',
        title: 'Tipo de vehiculos',
        type: 'basic',
        link: '/tipo-vehiculo',
        icon: 'heroicons_outline:tag',
      },
      {
        id: 'tipo-archivo-adjunto',
        title: 'Tipo de archivo adjunto',
        type: 'basic',
        link: '/tipo-archivo',
        icon: 'heroicons_outline:paper-clip',
      },
      {
        id: 'tipo-solicitud',
        title: 'Tipo de solicitud',
        type: 'basic',
        link: '/tipo-solicitud',
        icon: 'heroicons_outline:clipboard-list',
      },
      {
        id: 'localidades',
        title: 'Localidades',
        type: 'basic',
        link: '/localidades',
        icon: 'heroicons_outline:location-marker',
      },
      {
        id: 'preguntas',
        title: 'Preguntas frecuentes',
        type: 'basic',
        link: '/preguntas',
        icon: 'heroicons_outline:question-mark-circle',
      },
    ],
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
        id: 'lista-control',
        title: 'Listas de control',
        type: 'basic',
        link: '/modelos',
        icon: 'heroicons_outline:pencil-alt',
      },
    ],
  },
];
