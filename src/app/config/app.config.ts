import {OpaqueToken} from '@angular/core';

import {IAppConfig} from './iapp.config';

export let APP_CONFIG = new OpaqueToken('app.config');

export const AppConfig: IAppConfig = {
  routes: {
    heroesList: 'heroes-list',
    heroById: 'heroes/'
  },
  endpoints: {
    heroes: 'https://nodejs-example-app.herokuapp.com/heroes'
  },
  votesLimit: 3,
  topHeroesLimit: 4,
  snackBarDuration: 3000
};
