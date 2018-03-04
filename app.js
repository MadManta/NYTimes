// JAVASCRIPT FILE
/*var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "59af1b55f3ab40039dd12c053d310f03",
  'q': "utah"*/
$(".submit").click(function(event){
  event.preventDefault();
  var today = new Date();
  var searchTerm = $("#search").val();
  var numRecords = $("#numRecords").val();
  var startYear = $("#startYear").val();
  console.log(startYear, typeof(startYear));
  if (startYear === ""){startYear = "20150101"};
  var endYear = $("#endYear").val();
  if (endYear === ""){endYear = "" + today.getFullYear() + ("0" + (today.getMonth()+1)).slice(-2) + "0" + today.getDate()};
  var url = "http://api.nytimes.com/svc/search/v2/articlesearch.json";
  url += '?' + $.param( {
    'api-key': "59af1b55f3ab40039dd12c053d310f03",
    'q': searchTerm,
    'page': numRecords,
    'begin_date': startYear,
    'end_date': endYear
  });

  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(result) {
    console.log(result);
    for (var i = 0; i < result.response.docs.length; i++) {
    //headline: result.docs[i].headline.print_headline
    var headline = result.response.docs[i].headline.print_headline;
    //author: result.docs[i].byline.original
    var author = result.response.docs[i].byline.original;
    //articlestub: results.docs[i].snippet
    var snippet = result.response.docs[i].snippet;
    $("#topResults").append("<div><h1>" + headline + "</h1><hr><p>" + author + "</p><hr><p>" + snippet + "</p><hr></div>");
    };
  }).fail(function(err) {
    throw err;
  });
})

$(".clearBtn").click(function(event){
  event.preventDefault();
  $("#topResults").empty();
  $("#search").val("");
  $("#endYear").val("");
  $("#startYear").val("");
  $("#numRecords").val("");
});

/* first value = API parametre, second value = our ID names
q = search
begin_date = startYear
end_date = endYear
page = numRecords
*/
