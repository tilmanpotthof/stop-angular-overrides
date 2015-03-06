/* global window, document, expect, angular */

describe('stop-angular-overrides', function () {

  describe('test environment', function () {
    it('has a window and document object', function () {
      expect(window).toBeDefined();
      expect(document).toBeDefined();
    });

    it('loads angular', function () {
      expect(angular).toBeDefined();
      expect(typeof angular.module).toBe('function');
    });
  });

  describe('angular.bind', function () {
    it('is a function', function() {
      expect(typeof angular.bind).toBe('function');
    });
    it('creates a curried function', function() {
      var foo = {
        name: 'foo',
        getName: function () {
          return this.name;
        }
      };
      var name = angular.bind(foo, foo.getName);
      expect(name()).toBe(foo.name);
    });
  });

  describe('override protection', function () {
    var first = angular.module('A', []);
    var FooController = function () {
      this.fooVariable = 'fooVariable';
    };
    var fooFilter = function (value) {
      return value;
    };

    it('registers modules still as documented', function () {
      expect(angular.module('A')).toBe(first);
    });

    it('throws an error when overriding a module', function () {
      expect(function () {
        angular.module('A', []);
      }).toThrowError('Angular module A already exists');
    });

    it('registers controllers still as document', function () {
      angular.module('A').controller('FooController', FooController);
      var $controller = angular.injector(['ng', 'A']).get('$controller');
      expect($controller('FooController', {$scope: {}})).toEqual(new FooController());
    });

    it('throws an error when overriding a controller', function () {
      expect(function () {
        angular.module('A').controller('FooController', FooController);
      }).toThrowError('Angular controller FooController already exists');
    });

    it('registers filters still as document', function () {
      angular.module('A').filter('fooFilter', function () {
        return fooFilter;
      });
      var $filter = angular.injector(['ng', 'A']).get('$filter');
      expect($filter('fooFilter')).toBe(fooFilter);
    });

    it('throws an error when overriding a filter', function () {
      expect(function () {
        angular.module('A').filter('fooFilter', function () {
          return fooFilter;
        });
      }).toThrowError('Angular filter fooFilter already exists');
    });
  });
});
