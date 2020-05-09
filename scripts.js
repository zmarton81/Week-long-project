console.log('Script is loaded.');

let folder = 'images/'; //folder path
let fileExtension = ".jpg"; //image format
let currentPhoto = 0; //counter of photo number
let imagesData = []; //array

$(document).ready(function () {
    $("#idSubFrame").hover(function () {
        // subfolder pops up and back when mouse moves over it
        $('#idSubFrame').css({ 'opacity': '0.6', 'color': 'white' });
    }, function () {
        $(this).css("opacity", "0");
    });

    //show image title when hover on thumbnails
    $("button").hover(function () {
        var index = $(this).attr("id");
        currentPhoto = parseInt(index);
        $(this).prepend(imagesData[currentPhoto].title);
        $(this).css({ 'color': 'white', 'font-weight': '800', 'font-style': 'italic' })
    }, function () {
        $(this).html($('#thumbnail-' + currentPhoto).attr('src', imagesData[currentPhoto].photo));
    });

    // changing the colors of the left side arrow on button hover 
    $('.leftArrow').hover(function () {
        $('.arrowleft').css("color", "#838584");
    }, function () {
        $('.arrowleft').css("color", "#363837");
    });

    $('.arrowleft').hover(function () {
        $('.arrowleft').css("color", "#838584");
    }, function () { }
    );

    // changing the colors of the right side arrow on button hover 
    $('.rightArrow').hover(function () {
        $('.arrowright').css("color", "#838584");
    }, function () {
        $('.arrowright').css("color", "#363837");
    });

    $('.arrowright').hover(function () {
        $('.arrowright').css("color", "#838584");
    }, function () { }
    );

    //left button steps backwards images
    $('#idArrowButtonL').click(function () {
        if (currentPhoto === 0) {
            currentPhoto = 24;
            loadPhoto(currentPhoto);
        } else {
            currentPhoto = currentPhoto - 1;
            loadPhoto(currentPhoto);
        }
    });

    //right button steps forward images
    $('#idArrowButtonR').click(function () {
        if (currentPhoto === 24) {
            currentPhoto = 0;
            loadPhoto(currentPhoto);
        } else {
            currentPhoto = currentPhoto + 1;
            loadPhoto(currentPhoto);
        }
    });

    //open full size image in new window when mainFrame is clicked
    $('#photo').click(function () {
        var loc = $(this).attr('src');
        window.open(loc, '_blank');
    });

});

//load all image files (path, title, description) from folder into array
for (i = 0; i !== 25; i++) {
    let photoNumber = i + 1;
    imagesData[i] = {
        photo: (folder + photoNumber + fileExtension),
        title: (photoNumber + ' Title'),
        description: (photoNumber + ' Description'),
    };
};

//load first frame
loadPhoto();

// load thumbnails
for (i = 0; i !== 25; i++) {
    $('ul').append('<li><button class="thumbButtons" id="' + i + 'idThumbButtons"><img class="thumbImage" id="thumbnail-' + i + '"></button></li>');
    $('#thumbnail-' + i).attr('src', imagesData[i].photo);
};

//load thumbnail image into mainFrame on click
$('ul li').delegate('button', 'click', function () {
    currentPhoto = $(this).parent('li').index();
    console.log(currentPhoto);
    loadPhoto();
});

// load image with details
function loadPhoto() {
    $('#photo').attr('src', imagesData[currentPhoto].photo);
    $('#photo-title').html(imagesData[currentPhoto].title);
    $('#photo-description').html(imagesData[currentPhoto].description);
}