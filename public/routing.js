console.log("routing.js works");

$(".delete-link").click(function(e) {
  e.preventDefault();
  console.log("this is the href: " + $(this).attr("href"));
  $.ajax({
    url: $(this).attr("href"),
    method: 'DELETE'
  }).done(function(data) {
    window.location.href="/articles";
  });
});