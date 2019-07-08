(function(library) {
    library.validation = library.validation || (function() {
            return {
                isString: function(value){
                    return value && typeof value === 'string';
                }
            }
        })();
})(window.library || {});