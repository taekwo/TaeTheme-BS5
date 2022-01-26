(function ($) {
    $.fn.flexgal = function () {
        $('body').prepend('<div id="fullimage" style="display: none"><a class="next"><i class="fa fa-angle-left"></i></a><a class="prev"><i class="fa fa-angle-right"></i></a></div>');
        $('img', this).parent().addClass('image-rate');

        $('.image-rate').click(function () {
            $('img', this).clone().prependTo('#fullimage');
            $("#fullimage").fadeIn("slow");
        });

    // Close Gallery
        $.fn.closeFlexGallery = function () {
            $('#fullimage').fadeOut("slow", function () {
                $('img', this).remove();
            });
        };
        $('#fullimage').click(function () {
            $.fn.closeFlexGallery();
        });
        $(document).bind('keydown', function (e) {
            if (e.which == 27) {
                $.fn.closeFlexGallery();
            }
        });

// Add next & previous buttons to product gallery
        var firstElement = $('.flex-gallery .image-rate:first-child').find('img').attr('src');
        var lastElement = $('.flex-gallery .image-rate:last-child').find('img').attr('src');

        $('#fullimage .prev').click(function (e) {
            var currentImgSrcInSlider = $('#fullimage img').attr('src');
            var currentImgSrcInList = $('.flex-gallery').find('img[src="' + currentImgSrcInSlider + '"]');

            var nextImgInList = currentImgSrcInList.parent().next().find('img');
            var nextImgInListSrc = nextImgInList.attr('src');
            $('#fullimage img').fadeOut('fast', function () {
                $(this).remove();
                $('#fullimage').prepend('<img style="display: none;">');
                $('#fullimage img').attr('src', nextImgInListSrc).fadeIn();

                // Back to first image if this is the last one
                if (currentImgSrcInList.parent().is(':last-child')) {
                    $('#fullimage img').attr('src', firstElement);
                }

            });
            e.stopPropagation();
        });

        $('#fullimage .next').click(function (e) {
            var currentImgSrcInSlider = $('#fullimage img').attr('src');
            var currentImgSrcInList = $('.flex-gallery').find('img[src="' + currentImgSrcInSlider + '"]');

            var nextImgInList = currentImgSrcInList.parent().prev().find('img');
            var nextImgInListSrc = nextImgInList.attr('src');

            $('#fullimage img').fadeOut('fast', function () {
                $(this).remove();
                $('#fullimage').prepend('<img style="display: none;">');
                $('#fullimage img').attr('src', nextImgInListSrc).fadeIn();

                // Go to last image if this is the first one
                if (currentImgSrcInList.parent().is(':first-child')) {
                    $('#fullimage img').attr('src', lastElement);
                }
            });
            e.stopPropagation();
        });
    };
}(jQuery));

