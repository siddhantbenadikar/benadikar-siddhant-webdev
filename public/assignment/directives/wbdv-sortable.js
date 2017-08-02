(function () {
    angular
        .module("WebAppMaker")
        .directive('wbdvSortable', sortableDir);

    function sortableDir() {
        function linkFunc(scope, element, attributes) {
            var startIndex = -1;
            var endIndex = -1;
            element.sortable({
                axis: 'y',
                handle: '.sort-handle',
                start: function(event,ui){
                    startIndex=ui.item.index();
                },
                stop : function (event,ui) {
                    endIndex = ui.item.index();
                    if (startIndex !== endIndex){
                        scope.model.updatePosition(startIndex, endIndex);}
                }
            });
        }
        return {
            link: linkFunc
        };
    }
})();