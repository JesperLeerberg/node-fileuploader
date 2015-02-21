
/*
--------------------------------------------------
|	Main javascript file
--------------------------------------------------
*/

(function(){

	var obj = $("#draghandler");

	obj.on('dragenter dragleave', function(e) {
		cancelEvent(e);
		obj.toggleClass('active');
	})

	obj.on('dragover', function(e) {
		cancelEvent(e);
	});

	obj.on('drop' , function(e) {
		cancelEvent(e);
		var files = e.originalEvent.dataTransfer.files || [];
		obj.toggleClass('active');
		handleFileUpload(files);

	})

	function cancelEvent(e) {
		e.stopPropagation();
		e.preventDefault();
	}


	function handleFileUpload(files)
	{
	   for (var i = 0; i < files.length; i++) 
	   {
	 		var reader = new FileReader();
	 		reader.onload = function(e) {
	 			var dataURL = e.currentTarget.result;
	 			uploadFile(dataURL);
	 		}
	 		reader.readAsDataURL(files[i]);

	        var status = new createStatusbar(obj); //Using this we can set progress.
	        status.setFileNameSize(files[i].name,files[i].size);  	 
	   }
	}

	function uploadFile(dataURL) {
		$.ajax({
			method: 'POST',
			url: 'http://localhost:3000/api/files',
			data: {dataURL: dataURL}
		});
	}








	var rowCount=0;
	function createStatusbar(obj)
	{
	     rowCount++;
	     var row="odd";
	     if(rowCount %2 ==0) row ="even";
	     this.statusbar = $("<div class='statusbar "+row+"'></div>");
	     this.filename = $("<div class='filename'></div>").appendTo(this.statusbar);
	     this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
	     this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
	     this.abort = $("<div class='abort'>Abort</div>").appendTo(this.statusbar);
	     obj.after(this.statusbar);
	 
	    this.setFileNameSize = function(name,size)
	    {
	        var sizeStr="";
	        var sizeKB = size/1024;
	        if(parseInt(sizeKB) > 1024)
	        {
	            var sizeMB = sizeKB/1024;
	            sizeStr = sizeMB.toFixed(2)+" MB";
	        }
	        else
	        {
	            sizeStr = sizeKB.toFixed(2)+" KB";
	        }
	 
	        this.filename.html(name);
	        this.size.html(sizeStr);
	    }
	    this.setProgress = function(progress)
	    {       
	        var progressBarWidth =progress*this.progressBar.width()/ 100;  
	        this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
	        if(parseInt(progress) >= 100)
	        {
	            this.abort.hide();
	        }
	    }
	    this.setAbort = function(jqxhr)
	    {
	        var sb = this.statusbar;
	        this.abort.click(function()
	        {
	            jqxhr.abort();
	            sb.hide();
	        });
	    }
	}








})();

