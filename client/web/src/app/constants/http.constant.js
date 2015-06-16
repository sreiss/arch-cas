'use strict'
angular.module('archCas').constant('httpConstant',
{
  /* PROD */
  apiUrl: 'http://acrobatt-vm12.psi.ad.unistra.fr:3020',
  clientName: 'ARCH-CAS',
  clientRedirectUri : 'http://acrobatt-vm12.psi.ad.unistra.fr:3020'

  /* DEV
  apiUrl: 'http://localhost:3020',
  clientName: 'ARCH-CAS',
  clientRedirectUri : 'http://localhost:3010' */
});
