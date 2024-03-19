/* frappe.ui.form.on("Sales Partner", {
	refresh: function (frm) {
        function redirectOnChange(selectElement) {
            var selectedValue = selectElement.value;
    
            if (selectedValue) {
                // Vous pouvez également ajouter la logique pour construire l'URL en fonction de la valeur sélectionnée
                var url = "{{ frappe.utils.get_url('/partners') }}?selected_region=" + encodeURIComponent(selectedValue);
                
                // Rediriger vers la nouvelle URL
                window.location.href = url;
            }
        }
		//frm.trigger("add_publish_button");

		//generate_google_search_preview(frm);
	}
}); */