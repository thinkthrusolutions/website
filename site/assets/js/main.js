/* html5up.net | @ajlkn | License: CCA 3.0 */

(function ($) {

    let $window = $(window),
        $body = $('body'),
        $main = $('#main'),
        $panels = $main.children('.panel'),
        $nav = $('#nav'), $nav_links = $nav.children('a');

    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['361px', '736px'],
        xsmall: [null, '360px']
    });

    // Play initial animations on page load.
    $window.on('load', function () {
        window.setTimeout(function () {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Nav.
    $nav_links
        .on('click', function (event) {
            let href = $(this).attr('href');

            if (href.charAt(0) !== '#' || $panels.filter(href).length === 0) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            // Change panels.
            if (window.location.hash !== href) {
                window.location.hash = href;
            }
        });

    // Panels.

    // Initialize.
    (function () {
        let $panel, $link;

        // Get panel, link.
        if (window.location.hash) {
            $panel = $panels.filter(window.location.hash);
            $link = $nav_links.filter('[href="' + window.location.hash + '"]');
        }

        // No panel/link? Default to first.
        if (!$panel
            || $panel.length === 0) {

            $panel = $panels.first();
            $link = $nav_links.first();

        }

        // Deactivate all panels except this one.
        $panels.not($panel).addClass('inactive').hide();
        $link.addClass('active');
        $window.scrollTop(0);

    })();

    // Hashchange event.
    $window.on('hashchange', function (event) {
        let $panel, $link;

        // Get panel, link.
        if (window.location.hash) {
            $panel = $panels.filter(window.location.hash);
            $link = $nav_links.filter('[href="' + window.location.hash + '"]');

            // No target panel? Bail.
            if ($panel.length === 0) {
                return;
            }
        }

        // No panel/link? Default to first.
        else {
            $panel = $panels.first();
            $link = $nav_links.first();
        }

        $panels.addClass('inactive');
        $nav_links.removeClass('active');
        $link.addClass('active');
        $main
            .css('max-height', $main.height() + 'px')
            .css('min-height', $main.height() + 'px');

        setTimeout(function () {
            // Hide all panels.
            $panels.hide();

            // Show target panel.
            $panel.show();

            // Set new max/min height.
            $main
                .css('max-height', $panel.outerHeight() + 'px')
                .css('min-height', $panel.outerHeight() + 'px');

            $window.scrollTop(0);

            // Delay.
            window.setTimeout(function () {

                // Activate target panel.
                $panel.removeClass('inactive');

                // Clear max/min height.
                $main
                    .css('max-height', '')
                    .css('min-height', '');

                // IE: Refresh.
                $window.triggerHandler('--refresh');

                locked = false;

            }, (breakpoints.active('small') ? 0 : 500));

        }, 250);
    });

})(jQuery);