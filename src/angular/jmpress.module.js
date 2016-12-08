/* global angular:true */
/* eslint no-param-reassign: ["error", { "props": false }] */
(function iife() {
  // 'use strict';
  angular.module('jmpress', [])
    .filter('htmlTrusted', ['$sce', function htmlTrusted($sce) {
      return function filterHtml(content) {
        return $sce.trustAsHtml(content);
      };
    }]);
}());
