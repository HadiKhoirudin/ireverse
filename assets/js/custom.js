const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const namafile = urlParams.get('file') ? urlParams.get('file') : '';

if (namafile != '')
{
	handleFileRequest(namafile);
}


function antiInjection(data) {
   var filter = data.replace(/[<>]/g, '');
   return filter;
}

function arraySearchVal(sFileName, aResultArray) {
   for (var i = 0; i < aResultArray.length; i++) {
      var sKey = aResultArray[i];
      if (sKey.toLowerCase().includes(sFileName.toLowerCase())) {
		  var parser = new DOMParser();
		  var doc = parser.parseFromString(sKey, 'text/html');
		  var linkElement = doc.querySelector('a');
		  var hrefValue = linkElement ? linkElement.getAttribute('href') : '';
      return hrefValue;
      }
   }
   return false;
}

function getFileList(callback) {
   fetch("./../../ireverse/assets/datatool/autoloader")
      .then(response => response.text())
      .then(data => {
         var fileList = data.split("\n");
         callback(fileList);
      })
      .catch(error => {
         console.error("Error fetching file list:", error);
         callback([]);
      });
}

function handleFileRequest(namaFile) {
   var cleanedNamaFile = antiInjection(namaFile);

   getFileList(function(fileList) {
      var filenya = arraySearchVal(cleanedNamaFile, fileList);

      if (filenya) {
		window.location.href = "http://localhost/ireverse/assets/datatool/autoloader/" + filenya;
      }
   });
}

