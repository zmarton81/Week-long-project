console.log('Script is loaded.');

let currentPhoto = 0; //counter of photo number
let imagesData = []; //array
let thumbImages = []; //array
let folder = 'images/'; //folder path
let fileExtension = ".jpg"; //image format
let photoNumber;
let clickedButtonNumber;

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
        // $(this).find('.caption').slideDown(250);
    }, function () {
        $(this).html($('#thumbnail-' + currentPhoto).attr('src', imagesData[currentPhoto].photo));
    });

    // changing the colors of the left side arrow on button hover 
    $('.leftArrow').hover(function () {
        $('.arrowleft').css("color", "#838584");
    }, function () {
        $('.arrowleft').css("color", "#363837");
    });

    //
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
            photoNumber = 25;
            console.log(photoNumber);
            loadPhoto(currentPhoto);

        } else {
            photoNumber = currentPhoto;
            currentPhoto = currentPhoto - 1;
            console.log(photoNumber);
            loadPhoto(currentPhoto);
        }
    });

    //right button steps forward images
    $('#idArrowButtonR').click(function () {
        if (currentPhoto === 24) {
            currentPhoto = 0;
            photoNumber = 1;
            console.log(photoNumber);
            loadPhoto(currentPhoto);
        } else {
            currentPhoto = currentPhoto + 1;
            photoNumber = currentPhoto + 1;
            console.log(photoNumber);
            loadPhoto(currentPhoto);

        }
    });

    //open image in full size in new window upon clicking on mainFrame
    $('#photo').click(function () {
        var loc = $(this).attr('src');
        window.open(loc, '_blank');
    });

});

//getting all image files from folder into array
for (i = 0; i !== 25; i++) {
    photoNumber = i + 1;
    imagesData[i] = {
        photo: (folder + photoNumber + fileExtension),
        title: (photoNumber + ' Title'),
        description: (photoNumber + ' Description'),
    };
};

//loading first frame
loadPhoto();

// loading thumbnails
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

// loading images with details after clicks
function loadPhoto() {
    $('#photo').attr('src', imagesData[currentPhoto].photo);
    $('#photo-title').html(imagesData[currentPhoto].title);
    $('#photo-description').html(imagesData[currentPhoto].description);
}