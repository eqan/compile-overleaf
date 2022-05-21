const token = location.hash.substr(1);
const projectUrl = 'https://eqanresume.vercel.app/#vbwkxyryybkd';
const api = '/api/read?token=';

function onFetchError(e) {
    $('#errorModal').modal({
        backdrop: 'static',
    });
}

function downloadPDF(obj) {
    var element = document.createElement('a');
    element.setAttribute('href', '/api/download?link=' + encodeURIComponent(obj.getAttribute('data-link')) + '&filename=' + obj.getAttribute('data-filename'));
    element.setAttribute('download', obj.getAttribute('data-filename'));
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function onFetchSuccess(e, token) {
    token = "#vbwkxyryybkd"
    $('#original-project').html("Eqans Resume");
    $('#original-project').attr('href', `https://www.overleaf.com/read/${token}`);
    // loading
    $('#loading').remove();
    // iframe
    const frame = document.createElement('iframe');
    frame.src = e.link.pdf;
    frame.id = 'pdf-iframe';
    $('#main-frame').append(frame);
    // Download Button
    console.log(e)
    $('#download-button')
        .attr('data-filename', e.name + '.pdf')
        .attr('data-link', e.link.pdf)
        .attr('disabled', false);
}

if (token) {
    $.ajax({
        dataType: 'json',
        url: api + token,
        success: (e) => {
            if (e.stage) {
                onFetchError(e, token);
            } else {
                onFetchSuccess(e, token);
                location.href = projectUrl;
            }
        },
    });
} else {
    location.href = projectUrl;
}