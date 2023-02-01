(function($){
	
	// posts

	$('table.posts #the-list, table.pages #the-list').sortable({
		'items': 'tr',
		'axis': 'y',
		'helper': fixHelper,
		'update' : function(e, ui) {
			$.post( hicpo.url, {
				action: 'update-menu-order',
				order: $('#the-list').sortable('serialize'),
				security: hicpo.nonce,
                },
                function (response) {
                    if (response.error) {
                        console.error(response.data);
                        alert('Order update failed. Please reload the page and try again.');
                    } else if (!response.success) {
                        console.error('Unable to update order.', response.data);
                    }
                });
		}
	});
	//$("#the-list").disableSelection();
	
	// tags
	
	$('table.tags #the-list').sortable({
		'items': 'tr',
		'axis': 'y',
		'helper': fixHelper,
		'update' : function(e, ui) {
			$.post( hicpo.url, {
				action: 'update-menu-order-tags',
				order: $('#the-list').sortable('serialize'),
				security: hicpo.nonce,
			},
			function (response) {
				if (response.error) {
					console.error(response.data);
					alert('Order update failed. Please reload the page and try again.');
				} else if (!response.success) {
					console.error('Unable to update order.', response.data);
				}
			});
		}
	});
	//$("#the-list").disableSelection();
	
	// sites
	
	// add number
	var site_table_tr = $('table.sites #the-list tr');
	site_table_tr.each( function() {
		var ret=null;
		var url = $(this).find('td.blogname a').attr('href');
		parameters = url.split('?');
		if( parameters.length > 1 ) {
			var params = parameters[1].split('&');
			var paramsArray = [];
			for( var i=0; i<params.length; i++) {
				var neet = params[i].split('=');
				paramsArray.push(neet[0]);
				paramsArray[neet[0]] = neet[1];
			}
			ret = paramsArray['id'];
		}
		$(this).attr('id','site-'+ret);
	} );
	
	$('table.sites #the-list').sortable({
		'items': 'tr',
		'axis': 'y',
		'helper': fixHelper,
		'update' : function(e, ui) {
			$.post( hicpo.url, {
				action: 'update-menu-order-sites',
				order: $('#the-list').sortable('serialize'),
				security: hicpo.nonce,
			},
			function (response) {
				if (response.error) {
					console.error(response.data);
					alert('Order update failed. Please reload the page and try again.');
				} else if (!response.success) {
					console.error('Unable to update order.', response.data);
				}
			});
		}
	});
	
	var fixHelper = function(e, ui) {
		ui.children().children().each(function() {
			$(this).width($(this).width());
		});
		return ui;
	};
	
})(jQuery)
