import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
  // Redirect empty path to '/inicio'
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },

  // Redirect signed in user to the '/inicio'
  //
  // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'inicio' },

  //   // Auth routes for guests
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'confirmation-required',
        loadChildren: () =>
          import(
            'app/modules/auth/confirmation-required/confirmation-required.module'
          ).then(m => m.AuthConfirmationRequiredModule),
      },
      {
        path: 'forgot-password',
        loadChildren: () =>
          import(
            'app/modules/auth/forgot-password/forgot-password.module'
          ).then(m => m.AuthForgotPasswordModule),
      },
      {
        path: 'reset-password',
        loadChildren: () =>
          import('app/modules/auth/reset-password/reset-password.module').then(
            m => m.AuthResetPasswordModule
          ),
      },
      {
        path: 'sign-in',
        loadChildren: () =>
          import('app/modules/auth/sign-in/sign-in.module').then(
            m => m.AuthSignInModule
          ),
      },
      {
        path: 'sign-up',
        loadChildren: () =>
          import('app/modules/auth/sign-up/sign-up.module').then(
            m => m.AuthSignUpModule
          ),
      },
    ],
  },

  // Auth routes for authenticated users
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'sign-out',
        loadChildren: () =>
          import('app/modules/auth/sign-out/sign-out.module').then(
            m => m.AuthSignOutModule
          ),
      },
      {
        path: 'unlock-session',
        loadChildren: () =>
          import('app/modules/auth/unlock-session/unlock-session.module').then(
            m => m.AuthUnlockSessionModule
          ),
      },
    ],
  },

  // Landing routes
  //   {
  //     path: '',
  //     component: LayoutComponent,
  //     data: {
  //       layout: 'empty',
  //     },
  //     children: [
  //       {
  //         path: 'home',
  //         loadChildren: () =>
  //           import('app/modules/landing/home/home.module').then(
  //             m => m.LandingHomeModule
  //           ),
  //       },
  //     ],
  //   },

  // Admin routes
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      {
        path: 'inicio',
        loadChildren: () =>
          import('app/modules/admin/example/example.module').then(
            m => m.ExampleModule
          ),
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver, // para enviar datos al iniciar la ruta (en este caso el menu)
    },
    children: [
      {
        // canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ADMIN'],
            redirectTo: '/',
          },
        },
        path: 'usuarios',
        loadChildren: () =>
          import('app/modules/usuarios/usuario.module').then(
            m => m.UsuarioModule
          ),
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver, // para enviar datos al iniciar la ruta (en este caso el menu)
    },
    children: [
      {
        // canActivate: [NgxPermissionsGuard],
        // data: {
        //   permissions: {
        //     only: ['ADMIN'],
        //     redirectTo: '/',
        //   },
        // },
        path: 'roles',
        loadChildren: () =>
          import('app/modules/roles/rol.module').then(m => m.RolModule),
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver, // para enviar datos al iniciar la ruta (en este caso el menu)
    },
    children: [
      {
        // canActivate: [NgxPermissionsGuard],
        // data: {
        //   permissions: {
        //     only: ['ADMIN'],
        //     redirectTo: '/',
        //   },
        // },
        path: 'areainternas',
        loadChildren: () =>
          import('app/modules/area-interna/area-interna.module').then(
            m => m.AreaInternaModule
          ),
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver, // para enviar datos al iniciar la ruta (en este caso el menu)
    },
    children: [
      {
        // canActivate: [NgxPermissionsGuard],
        // data: {
        //   permissions: {
        //     only: ['ADMIN'],
        //     redirectTo: '/',
        //   },
        // },
        path: 'modelos',
        loadChildren: () =>
          import('app/modules/modelo/modelo.module').then(m => m.ModeloModule),
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver, // para enviar datos al iniciar la ruta (en este caso el menu)
    },
    children: [
      {
        // canActivate: [NgxPermissionsGuard],
        // data: {
        //   permissions: {
        //     only: ['ADMIN'],
        //     redirectTo: '/',
        //   },
        // },
        path: 'perfil',
        loadChildren: () =>
          import('app/modules/perfil/perfil.module').then(m => m.PerfilModule),
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver, // para enviar datos al iniciar la ruta (en este caso el menu)
    },
    children: [
      {
        // canActivate: [NgxPermissionsGuard],
        // data: {
        //   permissions: {
        //     only: ['ADMIN'],
        //     redirectTo: '/',
        //   },
        // },
        path: 'localidades',
        loadChildren: () =>
          import('app/modules/localidad/localidad.module').then(m => m.LocalidadModule),
      },
    ],
  },
];
