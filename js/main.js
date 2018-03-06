function generate() {
  console.log(window.company)

	var request = $.ajax({
		url: "solvency.tpl.js",
		dataType: "text"
	});
	 
	request.done(function(data) {
    var template = Handlebars.compile(data);
    var html    = template(window.company);
    html2pdf(html, {
      margin:       1,
      filename:     'Solvency Statement.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { dpi: 600, letterRendering: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
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
    window.company.date = moment().format("D MMMM YYYY") + ", 11:00am";
    generate();
  }
});

function add() {
	//Create an input type dynamically.
	var element = document.createElement("input");

	//Create Labels
	var label = document.createElement("Label");
	label.innerHTML = "Director";     

	//Assign different attributes to the element.
	element.setAttribute("type", "text");
	element.setAttribute("value", "");
	element.setAttribute("name", "Director Name");
	element.setAttribute("style", "width:200px");

	label.setAttribute("style", "font-weight:normal");

	var foo = document.getElementById("director");

	//Append the element in page (in span).
	foo.appendChild(label);
	foo.appendChild(element);
}



function main() {
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

