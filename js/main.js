function generate() {
  console.log(window.company)

	var request = $.ajax({
		url: "solvency.tpl.js",
		dataType: "text"
	});
	 
	request.done(function(data) {
    var template = Handlebars.compile(data);
    var context = {title: "My New Post", body: "This is my first post!"};
    var html    = template(window.company);
    html2pdf(html, {
      margin:       1,
      filename:     'Solvency Statement.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { dpi: 192, letterRendering: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    });
	});
	 
	request.fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});

}

function openvalidate() {
  var generatebutton = document.getElementById('generate');
  if (true) {
    generatebutton.title = "Create Solvency Statement PDF"
    generatebutton.disabled = false
  } else {
    generatebutton.title = "Please add company details to create pdf"
    generatebutton.disabled = true
  }
}

$('#details_form').validator().on('submit', function (e) {
  if (e.isDefaultPrevented()) {
    // handle the invalid form...
  } else {
    e.preventDefault();
    window.company = $('#details_form').serializeObject();
    generate();
  }
})

function main() {
  window.now = moment();

	//var source   = document.getElementById("solvency-template").innerHTML;
	//var template = Handlebars.compile(source);


}
main();

function stripwhitecommas(str) {
  if (!str || 0 === str.length) {
    return str
  } else {
    return str.toString().replace(/[\s,]+/g,'').trim()
  }
}

function formatabntfn(element) {
  element.value = formatcomma(element.value);
}

function formatCapitalize(element) {
  element.value = toTitleCase(element.value.toString());
}
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
function formatcomma(element) {
  return element.toString().replace(/ /g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = "";
            }
            o[this.name] = this.value || '';
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

