'use strict';

angular.module('le_taste.version', [
  'le_taste.version.interpolate-filter',
  'le_taste.version.version-directive'
])

.value('version', '0.1');
