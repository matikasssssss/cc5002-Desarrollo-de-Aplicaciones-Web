document.addEventListener('DOMContentLoaded', function () {
    var table = document.getElementById('interactiveTable');

    table.addEventListener('click', function (event) {
        var target = event.target;
        while (target && target.nodeName !== "TR") {
            target = target.parentElement;
        }
        if (target && target.nodeName === "TR") {
            var url = target.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        }
    });
});
