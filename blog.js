$(function () {

    var mediumPromise = new Promise(function (resolve) {
        var $content = $('#jsonContent');
        var data = {
            rss: 'https://medium.com/feed/@bhardwajshashank44'
        };
        $.get('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@bhardwajshashank44', data, function (response) {
            if (response.status == 'ok') {


                var output = '';
                $.each(response.items, function (k, item) {
                    var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
                    var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
                    var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
                    var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
                    var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
                    console.log(item)
                    output += '<div class="blog-col"><div class="blog-item content-box"> ';
                    output += '<div id="post-469" class="post-469 post type-post status-publish format-standard has-post-thumbnail hentry category-design category-mobile category-music tag-design tag-html tag-mobile tag-music tag-web tag-wordpress">';
                    output += '<div class="image">';
                    output += '<a  href="'+item.link+'" class="post-thumbnail aria-hidden="true" tabindex="-1">"';

                    output += '<img src="'+item.thumbnail+'"  width = "1280" height = "720" class="lazyload attachment-cvio_1280x720 size-cvio_1280x720 wp-post-image" />';



                    output += ' <span class="info">';
                    output += ' <span class="centrize full-width">';
                    output += ' <span class="vertical-center">';
                    output += ' <span class="icon fas fa-plus"></span> </span>';
                    output += ' </span>';
                    output += ' </span>';
                    output += ' </a>';
                    output += ' </div >';
                    output += ' <div class="desc">';
                    output += '<div class="date">';
                    output += '<a  href="' + item.link + '  ">' + item.pubDate + ' </a>';
                    output += ' </div>';
                    output += '<a href="' + item.link + '"';
                    output += 'class="name" target="_blank">' + item.title + '</a>';
                    
                    output += ' </div>';
                    output += ' </div >';
                    output += '</div >';
                    output += '</div >';

                  
                    
                     
                    



                    // output += `<img src="${src}" class="card-img-top" alt="Cover image">`;
                    // output += `<div class="card-body">`;
                    // output += `<h5 class="card-title"><a href="${item.link}">${item.title}</a></h5>`;
                    var yourString = item.description.replace(/<img[^>]*>/g, ""); //replace with your string.
                    yourString = yourString.replace('h4', 'p');
                    yourString = yourString.replace('h3', 'p');
                    var maxLength = 120; // maximum number of characters to extract
                    //trim the string to the maximum length
                    var trimmedString = yourString.substr(0, maxLength);
                    //re-trim if we are in the middle of a word
                    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
                    // output += `<p class="card-text">${trimmedString}...</p>`;
                    // output += `<a href="${item.link}" class="btn btn-outline-success">Read More</a>`;
                    // output += '</div></div>';
                    return k < 10;
                });
                resolve($content.html(output));
            }
        });
    });

    mediumPromise.then(function () {
        //Pagination
        pageSize = 3;

        var pageCount = $(".card").length / pageSize;

        for (var i = 0; i < pageCount; i++) {
            $("#pagin").append(`<li class="page-item"><a class="page-link" href="#">${(i + 1)}</a></li> `);
        }
        $("#pagin li:nth-child(1)").addClass("active");
        showPage = function (page) {
            $(".card").hide();
            $(".card").each(function (n) {
                if (n >= pageSize * (page - 1) && n < pageSize * page)
                    $(this).show();
            });
        }

        showPage(1);

        $("#pagin li").click(function () {
            $("#pagin li").removeClass("active");
            $(this).addClass("active");
            showPage(parseInt($(this).text()))
        });
    });
});


