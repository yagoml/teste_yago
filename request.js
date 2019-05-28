var requestHandler = 'request_handler.php'

function httpRequest(params) {
    let request = new XMLHttpRequest()

    request.open('POST', serverUrl + requestHandler, true)
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.send(params)

    return request
}